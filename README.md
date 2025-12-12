# MedAnalytics - Healthcare Staff Dashboard

## Overview
A futuristic, premium healthcare analytics dashboard powered by AI.
Built with React, Vite, TailwindCSS, Framer Motion, and Python (FastAPI).

## Features
- **Staff Overview**: Real-time KPIs on workforce stability.
- **Department Analysis**: Compare performance across departments (Cardiology, Maternity, etc).
- **AI Risk Prediction**: Random Forest model predicts staff attrition risk based on 30+ factors.
- **Interactive Charts**: Rich visualizations using Recharts.

## Setup

### Prerequisites
- Node.js
- Python 3.9+

### Backend
1. Navigate to `backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install fastapi uvicorn pandas scikit-learn numpy python-multipart
   ```
3. Run server:
   ```bash
   python main.py
   ```
   API runs on http://localhost:8000. Docs at http://localhost:8000/docs.

### Frontend
1. Navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
   App runs on http://localhost:5173.

## Data
The dataset `healthcare_cleaned.csv` is located in `data/`.
The backend automatically loads and processes this file.
