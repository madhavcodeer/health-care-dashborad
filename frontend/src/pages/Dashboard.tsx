
import { useEffect, useState } from 'react';
import { getKPIs, getRiskAnalysis } from '../api';
import {
    Heart,
    Droplet,
    Activity,
    MoreHorizontal,
    Plus,
    Zap,
    Leaf,
    Pill,
    CalendarCheck,
    TrendingUp,
    Users,
    Calendar
} from 'lucide-react';
import {
    BarChart, Bar, ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';

// Mini card logic
const MetricCard = ({ title, value, unit, icon: Icon, color, trendData }: any) => (
    <div className="med-card flex flex-col justify-between h-40 relative overflow-hidden group">
        <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-med-primary">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-med-muted text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-med-text leading-none">{value}<span className="text-sm text-med-muted ml-1 font-normal">{unit}</span></h3>
                </div>
            </div>
        </div>

        <div className="h-16 mt-2 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData}>
                    <Bar dataKey="v" radius={[2, 2, 0, 0]}>
                        {trendData.map((_: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={index === trendData.length - 1 ? color : '#E0E5F2'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

// Large list item
const ListItem = ({ icon: Icon, title, subtitle, colorClass }: any) => (
    <div className="flex items-center p-3 hover:bg-med-bg rounded-2xl transition-colors cursor-pointer group">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass} mr-4 group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-med-text">{title}</h4>
            <p className="text-xs text-med-muted">{subtitle}</p>
        </div>
        <MoreHorizontal className="text-med-muted w-5 h-5" />
    </div>
);

export default function Dashboard() {
    const [kpis, setKpis] = useState<any>(null);
    const [staff, setStaff] = useState<any[]>([]);

    useEffect(() => {
        getKPIs().then(setKpis).catch(console.error);
        getRiskAnalysis().then(data => setStaff(data.slice(0, 5))).catch(console.error);
    }, []);

    if (!kpis) return <div className="p-10 text-center animate-pulse">Loading Dashboard...</div>;

    return (
        <div className="grid grid-cols-12 gap-8 h-full">

            {/* LEFT COL: 3D ANATOMY (Takes 5 cols) */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                <div className="med-card relative flex-1 min-h-[500px] flex items-center justify-center bg-gradient-to-br from-white to-[#F4F7FE] overflow-visible">

                    {/* 3D Heart Image */}
                    <div className="relative z-10 w-[120%] h-[120%] flex items-center justify-center -ml-16">
                        <img src="/heart_3d.png" alt="3D Heart" className="max-w-none w-[500px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" />
                    </div>

                    {/* Floating Widgets around Heart */}
                    <div className="absolute top-8 right-8 z-20 bg-white/60 backdrop-blur-md border border-white p-4 rounded-3xl shadow-lg w-48">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                    <Activity className="w-3 h-3" />
                                </div>
                                <span className="text-xs font-bold text-med-text">Attrition Risk</span>
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-med-muted" />
                        </div>
                        <h4 className="text-2xl font-bold text-med-text mb-1">{kpis.attrition_rate} <span className="text-xs font-normal text-med-muted">%</span></h4>
                        <div className="h-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={[{ v: 10 }, { v: 20 }, { v: 15 }, { v: kpis.attrition_rate * 2 }, { v: 18 }, { v: 30 }, { v: 25 }]}>
                                    <Area type="monotone" dataKey="v" stroke="#4318FF" fill="#4318FF" fillOpacity={0.1} strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-8 flex gap-4 z-20">
                        <div className="w-16 h-16 rounded-2xl bg-white border border-med-bg shadow-lg flex items-center justify-center cursor-pointer hover:border-med-primary transition-colors">
                            <img src="/heart_3d.png" className="w-10 h-10 opacity-50 grayscale hover:grayscale-0 transition-all" />
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-white border border-med-bg shadow-lg flex items-center justify-center cursor-pointer hover:border-med-primary transition-colors">
                            <Activity className="w-6 h-6 text-med-muted" />
                        </div>
                    </div>

                    <div className="absolute top-1/2 left-4 w-10 flex flex-col gap-2 bg-white rounded-full py-3 shadow-lg items-center">
                        <Plus className="w-5 h-5 text-med-muted hover:text-med-primary cursor-pointer" />
                        <div className="w-4 h-[1px] bg-med-bg"></div>
                        <MoreHorizontal className="w-5 h-5 text-med-muted hover:text-med-primary cursor-pointer" />
                    </div>

                </div>
            </div>

            {/* RIGHT COL: METRICS & LISTS (Takes 7 cols) */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">

                {/* Row 1: Key Metrics */}
                <div className="space-y-4">
                    <h3 className="flex items-center gap-2 font-bold text-med-text">
                        <BarChart className="w-5 h-5 text-med-primary" />
                        Workforce Health Analysis
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <MetricCard
                            title="Total Staff"
                            value={kpis.total_employees}
                            unit="active"
                            icon={Users}
                            color="#4318FF"
                            trendData={[{ v: 40 }, { v: 60 }, { v: 50 }, { v: 70 }, { v: 65 }, { v: 80 }, { v: 90 }]}
                        />
                        <MetricCard
                            title="Satisfaction"
                            value={kpis.avg_satisfaction}
                            unit="/ 4.0"
                            icon={Heart}
                            color="#05CD99"
                            trendData={[{ v: 3.5 }, { v: 3.6 }, { v: 3.2 }, { v: 3.8 }, { v: 3.9 }, { v: 3.7 }, { v: 4.0 }]}
                        />
                        <MetricCard
                            title="Avg Income"
                            value={"$" + Math.round(kpis.avg_income / 1000) + "k"}
                            unit="/mo"
                            icon={TrendingUp}
                            color="#FFB547"
                            trendData={[{ v: 10 }, { v: 12 }, { v: 11 }, { v: 15 }, { v: 13 }, { v: 14 }, { v: 12 }]}
                        />
                    </div>
                </div>

                {/* Row 2: Medication (Department) List & Schedule */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">

                    {/* List 1 */}
                    <div className="med-card">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-med-text flex items-center gap-2">
                                <Pill className="w-5 h-5 text-blue-500" />
                                Department Alerts
                            </h3>
                            <MoreHorizontal className="text-med-muted cursor-pointer" />
                        </div>
                        <div className="space-y-2">
                            <ListItem icon={Droplet} title="Cardiology Upskilling" subtitle="Training Required" colorClass="bg-yellow-100 text-yellow-600" />
                            <ListItem icon={Heart} title="Maternity Hiring" subtitle="Staff Shortage" colorClass="bg-red-100 text-red-600" />
                            <div className="flex items-center p-3 bg-med-primary text-white rounded-2xl shadow-lg shadow-med-primary/30 cursor-pointer">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 mr-4">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold">Neurology Performance</h4>
                                    <p className="text-xs opacity-80">Top Performing Dept</p>
                                </div>
                            </div>
                            <ListItem icon={Leaf} title="General Audit" subtitle="Compliance Check" colorClass="bg-yellow-100 text-yellow-600" />
                        </div>
                    </div>

                    {/* List 2: Schedule/Doctors */}
                    <div className="med-card">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-med-text flex items-center gap-2">
                                <CalendarCheck className="w-5 h-5 text-med-primary" />
                                Interview Schedule
                            </h3>
                            <div className="flex gap-2 text-med-muted">
                                <Calendar className="w-5 h-5 hover:text-med-text cursor-pointer" />
                                <MoreHorizontal className="w-5 h-5 hover:text-med-text cursor-pointer" />
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6 px-2">
                            <div className="text-center opacity-50"><p className="text-xs">13</p></div>
                            <div className="text-center opacity-50"><p className="text-xs">14</p></div>
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-med-primary text-white flex items-center justify-center text-xs font-bold mb-1 shadow-lg shadow-med-primary/40">15</div>
                            </div>
                            <div className="text-center opacity-50"><p className="text-xs">16</p></div>
                            <div className="text-center opacity-50"><p className="text-xs">17</p></div>
                        </div>

                        <div className="space-y-4">
                            {staff.map((doc, i) => (
                                <div key={i} className="flex items-center justify-between p-2 hover:bg-med-bg rounded-xl transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                            {doc.name.split(' ').map((n: any) => n[0]).join('').slice(0, 2)}
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-sm text-med-text">{doc.name}</h5>
                                            <p className="text-xs text-med-muted">{doc.jobrole}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${doc.risk_level === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                            {doc.risk_level === 'Critical' ? 'High Risk' : 'Normal'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}
