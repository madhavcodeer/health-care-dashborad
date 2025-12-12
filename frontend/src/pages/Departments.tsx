import { useEffect, useState } from 'react';
import { getDepartments } from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Departments() {
    const [deptData, setDeptData] = useState<any[]>([]);

    useEffect(() => {
        getDepartments().then(setDeptData).catch(console.error);
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Department Overview</h1>
                    <p className="text-slate-500">Compare metrics across organizational units.</p>
                </div>
            </div>

            <div className="glass-card p-8 h-[500px]">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 bg-primary rounded-full"></span>
                    Headcount vs. Satisfaction
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={deptData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barSize={40}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="department" stroke="#64748b" axisLine={false} tickLine={false} dy={10} />
                        <YAxis yAxisId="left" stroke="#64748b" axisLine={false} tickLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="#64748b" axisLine={false} tickLine={false} />
                        <Tooltip
                            cursor={{ fill: '#f1f5f9' }}
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: 'none',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar yAxisId="left" dataKey="count" name="Staff Count" fill="#6366f1" radius={[8, 8, 0, 0]} />
                        <Bar yAxisId="right" dataKey="jobsatisfaction" name="Avg Satisfaction" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deptData.map((d, i) => (
                    <div key={i} className="glass-card p-6 border border-slate-100 hover:border-primary/20 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-lg text-slate-800">{d.department}</h3>
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="font-bold text-sm">#</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                <span className="text-sm text-slate-500">Headcount</span>
                                <span className="font-bold text-slate-800">{d.count}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                <span className="text-sm text-slate-500">Avg Income</span>
                                <span className="font-bold text-slate-800">${d.monthlyincome}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                <span className="text-sm text-slate-500">Satisfaction</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-16 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: `${(d.jobsatisfaction / 4) * 100}%` }}></div>
                                    </div>
                                    <span className="font-bold text-emerald-600 text-sm">{d.jobsatisfaction}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
