import { useEffect, useState } from 'react';
import { getRiskAnalysis } from '../api';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, AlertOctagon, Info } from 'lucide-react';
import { clsx } from 'clsx';

export default function RiskPrediction() {
    const [risks, setRisks] = useState<any[]>([]);

    useEffect(() => {
        getRiskAnalysis().then(setRisks).catch(console.error);
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-soft border border-slate-100">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Retention Risk AI</h1>
                    <p className="text-slate-500">Predictive analysis identifying staff likely to leave.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition font-medium">
                        Filter
                    </button>
                    <button className="bg-primary hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition-all shadow-lg shadow-indigo-200 font-medium">
                        Export Report
                    </button>
                </div>
            </div>

            <div className="glass-card overflow-hidden p-0 border border-slate-100 shadow-soft">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-100">
                                <th className="p-5 font-semibold text-slate-500 text-sm">Staff Member</th>
                                <th className="p-5 font-semibold text-slate-500 text-sm">Department</th>
                                <th className="p-5 font-semibold text-slate-500 text-sm">Role</th>
                                <th className="p-5 font-semibold text-slate-500 text-sm">Attrition Probability</th>
                                <th className="p-5 font-semibold text-slate-500 text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {risks.map((item, idx) => (
                                <motion.tr
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="hover:bg-slate-50/80 transition-colors group"
                                >
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs border border-slate-200">
                                                {item.name.split('-')[1]}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800">{item.name}</p>
                                                <p className="text-xs text-slate-400">ID: {item.employeeid}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-slate-600 font-medium text-sm">
                                        <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600">{item.department}</span>
                                    </td>
                                    <td className="p-5 text-slate-600 text-sm">{item.jobrole}</td>
                                    <td className="p-5">
                                        <div className="w-48">
                                            <div className="flex justify-between mb-1.5">
                                                <span className="text-xs font-bold text-slate-700">{item.risk_score}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={clsx("h-full rounded-full transition-all duration-500", {
                                                        'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]': item.risk_level === 'Critical',
                                                        'bg-orange-500': item.risk_level === 'High',
                                                        'bg-amber-400': item.risk_level === 'Moderate',
                                                        'bg-emerald-400': item.risk_level === 'Low',
                                                    })}
                                                    style={{ width: `${item.risk_score}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span
                                            className={clsx("px-3 py-1.5 rounded-full text-xs font-bold flex w-fit items-center gap-1.5 border", {
                                                'bg-red-50 text-red-600 border-red-100': item.risk_level === 'Critical',
                                                'bg-orange-50 text-orange-600 border-orange-100': item.risk_level === 'High',
                                                'bg-amber-50 text-amber-600 border-amber-100': item.risk_level === 'Moderate',
                                                'bg-emerald-50 text-emerald-600 border-emerald-100': item.risk_level === 'Low',
                                            })}
                                        >
                                            {item.risk_level === 'Critical' && <AlertOctagon className="w-3.5 h-3.5" />}
                                            {item.risk_level === 'High' && <AlertCircle className="w-3.5 h-3.5" />}
                                            {item.risk_level === 'Moderate' && <Info className="w-3.5 h-3.5" />}
                                            {item.risk_level === 'Low' && <CheckCircle className="w-3.5 h-3.5" />}
                                            {item.risk_level}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
