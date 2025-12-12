import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const getKPIs = async () => (await api.get('/kpi')).data;
export const getRiskAnalysis = async () => (await api.get('/risk')).data;
export const getDepartments = async () => (await api.get('/departments')).data;
export const getData = async () => (await api.get('/data')).data;

export default api;
