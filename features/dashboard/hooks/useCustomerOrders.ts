'use client';

import {useEffect, useState} from 'react';
import {getOrders} from '@/services/orders';
import type {CustomerOrder, CustomerProfile} from '@/types/account';

/**
 * Loads the signed-in customer's orders after the browser auth profile is available.
 */
export function useCustomerOrders(profile: CustomerProfile | undefined) {
    const [orders, setOrders] = useState<CustomerOrder[] | null>(null);

    useEffect(() => {
        if (!profile) return;

        let active = true;

        getOrders(profile).then(nextOrders => {
            if (active) setOrders(nextOrders);
        });

        return () => {
            active = false;
        };
    }, [profile]);

    return orders;
}
