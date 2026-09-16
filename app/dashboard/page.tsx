'use client';

import {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import {Progress, Skeleton} from 'antd';
import {CheckCircleOutlined, ClockCircleOutlined, FileTextOutlined} from '@ant-design/icons';
import type {CustomerOrder} from '@/types/account';
import {useAuth} from '@/app/context/AuthContext';
import {useLanguage} from '@/app/context/LanguageContext';
import {accountCopy} from '@/data/account';
import {getOrders} from '@/services/orders';
import OrderCard from '@/components/dashboard/OrderCard';

export default function DashboardPage() {
    const auth = useAuth();
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    const [orders, setOrders] = useState<CustomerOrder[] | null>(null);
    useEffect(() => { if (auth.session) getOrders(auth.session.profile).then(setOrders); }, [auth.session]);
    const completion = useMemo(() => {
        if (!auth.session) return 0;
        const profile = auth.session.profile;
        const required = [profile.firstName, profile.lastName, profile.province, profile.city, profile.address, profile.postalCode];
        return Math.round(required.filter(Boolean).length / required.length * 100);
    }, [auth.session]);
    if (!orders) return <Skeleton active/>;
    const activeOrders = orders.filter(order => !['delivered', 'cancelled'].includes(order.status)).length;
    const cards = [
        {label: copy.profileCompletion, value: `${completion.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')}٪`, icon: <CheckCircleOutlined/>, extra: <Progress percent={completion} showInfo={false} size="small"/>},
        {label: copy.activeOrders, value: activeOrders.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US'), icon: <ClockCircleOutlined/>},
        {label: copy.totalOrders, value: orders.length.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US'), icon: <FileTextOutlined/>},
    ];
    return <>
        <h1 className="text-3xl font-extrabold text-primary">{copy.welcome} {auth.session?.profile.firstName}</h1>
        <p className="text-secondary mt-3">{copy.dashboardDescription}</p>
        <div className="grid sm:grid-cols-3 gap-4 mt-8">{cards.map(card => <div key={card.label} className="rounded-2xl border border-subtle bg-elevated p-5">
            <div className="text-brand-400 text-2xl">{card.icon}</div><p className="text-secondary text-sm mt-4">{card.label}</p><strong className="text-2xl text-primary block mt-1">{card.value}</strong>{card.extra && <div className="mt-3">{card.extra}</div>}
        </div>)}</div>
        <div className="flex items-center justify-between gap-4 mt-10 mb-5"><h2 className="text-xl font-bold text-primary">{copy.recentOrders}</h2><Link href="/dashboard/orders" className="text-brand-400">{copy.viewAll}</Link></div>
        <div className="space-y-4">{orders.slice(0, 2).map(order => <OrderCard key={order.id} order={order}/>)}</div>
    </>;
}
