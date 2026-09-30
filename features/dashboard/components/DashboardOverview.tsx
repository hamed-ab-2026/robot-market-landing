'use client';

import Link from 'next/link';
import {CheckCircleOutlined, ClockCircleOutlined, FileTextOutlined} from '@ant-design/icons';
import {Progress, Skeleton} from 'antd';
import {useAuth} from '@/app/context/AuthContext';
import {useLanguage} from '@/app/context/LanguageContext';
import OrderCard from '@/components/dashboard/OrderCard';
import {accountCopy} from '@/data/account';
import {useCustomerOrders} from '../hooks/useCustomerOrders';
import {getActiveOrderCount, getProfileCompletion} from '../lib/orderSummary';

export default function DashboardOverview() {
    const auth = useAuth();
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    const numberLocale = locale === 'fa' ? 'fa-IR' : 'en-US';
    const profile = auth.session?.profile;
    const orders = useCustomerOrders(profile);

    if (!profile || !orders) return <Skeleton active />;

    const completion = getProfileCompletion(profile);
    const activeOrders = getActiveOrderCount(orders);
    const cards = [
        {
            label: copy.profileCompletion,
            value: `${completion.toLocaleString(numberLocale)}٪`,
            icon: <CheckCircleOutlined />,
            extra: <Progress percent={completion} showInfo={false} size="small" />,
        },
        {
            label: copy.activeOrders,
            value: activeOrders.toLocaleString(numberLocale),
            icon: <ClockCircleOutlined />,
        },
        {
            label: copy.totalOrders,
            value: orders.length.toLocaleString(numberLocale),
            icon: <FileTextOutlined />,
        },
    ];

    return (
        <>
            <h1 className="text-3xl font-extrabold text-primary">
                {copy.welcome} {profile.firstName}
            </h1>
            <p className="text-secondary mt-3">{copy.dashboardDescription}</p>
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
                {cards.map(card => (
                    <div key={card.label} className="rounded-2xl border border-subtle bg-elevated p-5">
                        <div className="text-brand-400 text-2xl">{card.icon}</div>
                        <p className="text-secondary text-sm mt-4">{card.label}</p>
                        <strong className="text-2xl text-primary block mt-1">{card.value}</strong>
                        {card.extra && <div className="mt-3">{card.extra}</div>}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between gap-4 mt-10 mb-5">
                <h2 className="text-xl font-bold text-primary">{copy.recentOrders}</h2>
                <Link href="/dashboard/orders" className="text-brand-400">
                    {copy.viewAll}
                </Link>
            </div>
            <div className="space-y-4">
                {orders.slice(0, 2).map(order => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </>
    );
}
