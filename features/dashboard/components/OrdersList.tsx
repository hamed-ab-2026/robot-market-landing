'use client';

import {Empty, Skeleton} from 'antd';
import {useAuth} from '@/app/context/AuthContext';
import {useLanguage} from '@/app/context/LanguageContext';
import OrderCard from '@/components/dashboard/OrderCard';
import {accountCopy} from '@/data/account';
import {useCustomerOrders} from '../hooks/useCustomerOrders';

export default function OrdersList() {
    const auth = useAuth();
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    const profile = auth.session?.profile;
    const orders = useCustomerOrders(profile);

    return (
        <>
            <h1 className="text-3xl font-extrabold text-primary">{copy.orders}</h1>
            <p className="text-secondary mt-3 mb-7">{copy.dashboardDescription}</p>
            {!orders ? (
                <Skeleton active />
            ) : orders.length ? (
                <div className="space-y-4">
                    {orders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <Empty description={copy.emptyOrders} />
            )}
        </>
    );
}
