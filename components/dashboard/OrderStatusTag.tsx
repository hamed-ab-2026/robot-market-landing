'use client';

import {Tag} from 'antd';
import type {OrderStatus} from '@/types/account';
import {useLanguage} from '@/app/context/LanguageContext';
import {orderStatusLabels} from '@/data/account';

export default function OrderStatusTag({status}: {status: OrderStatus}) {
    const {locale} = useLanguage();
    const color =
        status === 'cancelled'
            ? 'red'
            : status === 'delivered'
              ? 'green'
              : status === 'proforma_issued'
                ? 'cyan'
                : 'gold';
    return <Tag color={color}>{orderStatusLabels[locale][status]}</Tag>;
}
