'use client';

import {useEffect, useState} from 'react';
import {Empty, Skeleton} from 'antd';
import type {CustomerOrder} from '@/types/account';
import {useAuth} from '@/app/context/AuthContext';
import {useLanguage} from '@/app/context/LanguageContext';
import {accountCopy} from '@/data/account';
import {getOrders} from '@/services/orders';
import OrderCard from '@/components/dashboard/OrderCard';

export default function OrdersPage() {
    const auth = useAuth();
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    const [orders, setOrders] = useState<CustomerOrder[] | null>(null);
    useEffect(() => { if (auth.session) getOrders(auth.session.profile).then(setOrders); }, [auth.session]);
    return <>
        <h1 className="text-3xl font-extrabold text-primary">{copy.orders}</h1>
        <p className="text-secondary mt-3 mb-7">{copy.dashboardDescription}</p>
        {!orders ? <Skeleton active/> : orders.length ? <div className="space-y-4">{orders.map(order => <OrderCard key={order.id} order={order}/>)}</div> : <Empty description={copy.emptyOrders}/>} 
    </>;
}
