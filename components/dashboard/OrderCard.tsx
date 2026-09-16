'use client';

import Link from 'next/link';
import type {CustomerOrder} from '@/types/account';
import {useLanguage} from '@/app/context/LanguageContext';
import {accountCopy, paymentStatusLabels} from '@/data/account';
import OrderStatusTag from './OrderStatusTag';

export default function OrderCard({order}: {order: CustomerOrder}) {
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    return (
        <article className="rounded-2xl border border-subtle bg-elevated p-5">
            <div className="flex flex-wrap justify-between gap-4">
                <div>
                    <p className="text-sm text-secondary">{copy.orderNumber}</p>
                    <strong className="text-primary" dir="ltr">
                        {order.number}
                    </strong>
                </div>
                <OrderStatusTag status={order.status} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-5 pt-5 border-t border-subtle text-sm">
                <div>
                    <span className="text-secondary block">{copy.orderDate}</span>
                    <span className="text-primary">{order.createdAt}</span>
                </div>
                <div>
                    <span className="text-secondary block">{copy.paymentStatus}</span>
                    <span className="text-primary">{paymentStatusLabels[locale][order.paymentStatus]}</span>
                </div>
                <div>
                    <span className="text-secondary block">{copy.orderItems}</span>
                    <span className="text-primary">
                        {order.items
                            .reduce((sum, item) => sum + item.quantity, 0)
                            .toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')}
                    </span>
                </div>
            </div>
            <Link
                href={`/dashboard/orders/${order.id}`}
                className="inline-block text-brand-400 font-semibold mt-5 hover:underline"
            >
                {copy.details}
            </Link>
        </article>
    );
}
