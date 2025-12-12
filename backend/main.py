import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import os
import uvicorn
import random

# Realistic Name Generator
FIRST_NAMES = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"]
LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore"]

def get_realistic_name(id, job_role):
    random.seed(id)
    name = f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"
    if "Manager" in job_role or "Director" in job_role:
        return f"Dr. {name}"
    return name

def get_attendance(id):
    random.seed(id)
    return f"{random.randint(85, 100)}%"


app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "healthcare_cleaned.csv")

class DataManager:
    def __init__(self):
        self.df = None
        self.model = None
        self.encoders = {}
        self.load_data()
        self.train_model()

    def load_data(self):
        if os.path.exists(DATA_PATH):
            self.df = pd.read_csv(DATA_PATH)
            self.df.columns = [c.lower().strip() for c in self.df.columns]
            print(f"Loaded data: {len(self.df)} rows")
        else:
            print(f"File not found: {DATA_PATH}")
            self.df = pd.DataFrame()

    def get_data(self):
        return self.df.replace({np.nan: None}).to_dict(orient="records")

    def get_kpis(self):
        if self.df.empty:
            return {}
        total = len(self.df)
        attrition = self.df[self.df['attrition'] == 'Yes'].shape[0] if 'attrition' in self.df else 0
        rate = (attrition / total) * 100 if total > 0 else 0
        sat = self.df['jobsatisfaction'].mean() if 'jobsatisfaction' in self.df else 0
        inc = self.df['monthlyincome'].mean() if 'monthlyincome' in self.df else 0
        return {
            "total_employees": total,
            "attrition_rate": round(rate, 2),
            "avg_satisfaction": round(sat, 2),
            "avg_income": round(inc, 2)
        }

    def train_model(self):
        if self.df.empty: return
        print("Training model...")
        data = self.df.copy()
        for col in ['businesstravel', 'department', 'educationfield', 'gender', 'jobrole', 'maritalstatus', 'overtime']:
            if col in data.columns:
                le = LabelEncoder()
                data[col] = le.fit_transform(data[col].astype(str))
                self.encoders[col] = le
        if 'attrition' in data.columns:
            data['attrition'] = data['attrition'].apply(lambda x: 1 if x == 'Yes' else 0)
            X = data.select_dtypes(include=[np.number]).drop(columns=['attrition', 'employeeid'], errors='ignore')
            y = data['attrition']
            self.feature_names = X.columns.tolist()
            self.model = RandomForestClassifier(n_estimators=50).fit(X.fillna(0), y)

    def get_risk_analysis(self):
        if not self.model or self.df.empty: return []
        data = self.df.copy()
        for col, le in self.encoders.items():
            if col in data.columns:
                data[col] = data[col].apply(lambda x: le.transform([str(x)])[0] if str(x) in le.classes_ else 0)
        X = data[self.feature_names].fillna(0)
        probs = self.model.predict_proba(X)[:, 1]
        res = []
        for i, row in self.df.iterrows():
            res.append({
                "employeeid": row.get('employeeid', i),
                "name": get_realistic_name(row.get('employeeid', i), row.get('jobrole', '')),
                "department": row.get('department'),
                "jobrole": row.get('jobrole'),
                "risk_score": round(probs[i] * 100, 1),
                "risk_level": "Critical" if probs[i] > 0.7 else "High" if probs[i] > 0.5 else "Moderate" if probs[i] > 0.3 else "Low",
                "attendance": get_attendance(row.get('employeeid', i))
            })
        return sorted(res, key=lambda x: x['risk_score'], reverse=True)[:100]

    def get_department_stats(self):
        if self.df.empty: return []
        stats = self.df.groupby('department').agg({'monthlyincome': 'mean', 'jobsatisfaction': 'mean', 'employeeid': 'count'}).reset_index()
        return stats.rename(columns={'employeeid': 'count'}).round(2).to_dict(orient="records")

dm = DataManager()

@app.get("/api/kpi")
def kpi(): return dm.get_kpis()
@app.get("/api/risk")
def risk(): return dm.get_risk_analysis()
@app.get("/api/departments")
def dept(): return dm.get_department_stats()
@app.get("/api/data")
def data(): return dm.get_data()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
