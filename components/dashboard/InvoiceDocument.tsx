'use client';

import {forwardRef} from 'react';
import type {CustomerOrder} from '@/types/account';
import {useLanguage} from '@/app/context/LanguageContext';
import {accountCopy} from '@/data/account';

const InvoiceDocument = forwardRef<HTMLDivElement, {order: CustomerOrder}>(({order}, ref) => {
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    const invoice = order.invoice!;
    const numberLocale = locale === 'fa' ? 'fa-IR' : 'en-US';
    const money = (value: number) => `${value.toLocaleString(numberLocale)} ${locale === 'fa' ? 'ریال' : 'Rials'}`;
    const subtotal = order.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const total = subtotal - invoice.discount + invoice.shipping + invoice.tax;
    const buyerName =
        order.customer.type === 'corporate'
            ? order.customer.companyName
            : `${order.customer.firstName} ${order.customer.lastName}`;
    return (
        <div ref={ref} className="invoice-document" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
            <div className="invoice-head">
                <img src="/images/icons/logo.png" alt="Robot Market" />
                <div>
                    <h2>{copy.invoice}</h2>
                    <p>
                        {copy.invoiceNumber}: <span dir="ltr">{invoice.number}</span>
                    </p>
                </div>
            </div>
            <div className="invoice-meta">
                <div>
                    <strong>{copy.seller}</strong>
                    <p>{copy.sellerName}</p>
                    <p>{copy.sellerPhone}</p>
                </div>
                <div>
                    <strong>{copy.buyer}</strong>
                    <p>{buyerName}</p>
                    <p dir="ltr">{order.customer.phone}</p>
                    <p>
                        {order.customer.city}، {order.customer.address}
                    </p>
                </div>
                <div>
                    <p>
                        {copy.issueDate}: {invoice.issueDate}
                    </p>
                    <p>
                        {copy.validUntil}: {invoice.validUntil}
                    </p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{copy.orderItems}</th>
                        <th>{copy.modules}</th>
                        <th>{copy.quantity}</th>
                        <th>{copy.unitPrice}</th>
                        <th>{copy.total}</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                {item.name}
                                <small>{item.model}</small>
                            </td>
                            <td>{item.modules.join('، ')}</td>
                            <td>{item.quantity}</td>
                            <td>{money(item.unitPrice)}</td>
                            <td>{money(item.unitPrice * item.quantity)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="invoice-totals">
                <p>
                    <span>{copy.subtotal}</span>
                    <strong>{money(subtotal)}</strong>
                </p>
                <p>
                    <span>{copy.discount}</span>
                    <strong>{money(invoice.discount)}</strong>
                </p>
                <p>
                    <span>{copy.shipping}</span>
                    <strong>{money(invoice.shipping)}</strong>
                </p>
                <p>
                    <span>{copy.tax}</span>
                    <strong>{money(invoice.tax)}</strong>
                </p>
                <p className="grand">
                    <span>{copy.finalTotal}</span>
                    <strong>{money(total)}</strong>
                </p>
            </div>
            <p className="invoice-note">این پیش‌فاکتور پس از هماهنگی تلفنی و تأیید ادمین روبات مارکت صادر شده است.</p>
        </div>
    );
});
InvoiceDocument.displayName = 'InvoiceDocument';
export default InvoiceDocument;
