
# Deployment Guide

## 1. Deploying the Backend (Render)
1. Login to [Render](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect this repository.
4. **Settings**:
   - **Name**: `healthcare-dashboard-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **Create Web Service**.
6. **Copy the URL** (e.g., `https://healthcare-dashboard-backend.onrender.com`).

## 2. Deploying the Frontend (Vercel)
1. Login to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import this repository.
4. **IMPORTANT: Project Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click `Edit` and select `frontend`. **(Crucial Step)**
5. **Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com/api` (The URL from Step 1 + /api)
6. Click **Deploy**.

## Troubleshooting 404 on Vercel
If you see a "404: NOT_FOUND" error:
1. Go to your Vercel Project Dashboard.
2. Click **Settings** (top tab).
3. Under **General** -> **Root Directory**, assume it is empty.
4. Change specific setting:
   - Click **Edit**.
   - Type `frontend` in the text box.
   - Click **Save**.
5. Go to **Deployments** tab.
6. Click the three dots (...) next to the latest deployment -> **Redeploy**.
