'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {Alert, App, Button, Empty, Skeleton, Steps} from 'antd';
import {DownloadOutlined, FileExcelOutlined, PrinterOutlined} from '@ant-design/icons';
import type {CustomerOrder} from '@/types/account';
import {useAuth} from '@/app/context/AuthContext';
import {useLanguage} from '@/app/context/LanguageContext';
import {accountCopy, orderStatusLabels, paymentStatusLabels} from '@/data/account';
import {getOrder} from '@/services/orders';
import {downloadInvoiceExcel, downloadInvoicePdf} from '@/lib/invoice';
import OrderStatusTag from '@/components/dashboard/OrderStatusTag';
import InvoiceDocument from '@/components/dashboard/InvoiceDocument';

export default function OrderDetailsPage({params}: {params: {id: string}}) {
    const auth = useAuth();
    const {message} = App.useApp();
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    const [order, setOrder] = useState<CustomerOrder | null | undefined>(null);
    const [exporting, setExporting] = useState<'pdf' | 'excel' | null>(null);
    const invoiceRef = useRef<HTMLDivElement>(null);
    const numberLocale = locale === 'fa' ? 'fa-IR' : 'en-US';
    const money = (value: number) => `${value.toLocaleString(numberLocale)} ${locale === 'fa' ? 'ریال' : 'Rials'}`;
    useEffect(() => {
        if (auth.session) getOrder(params.id, auth.session.profile).then(setOrder);
    }, [auth.session, params.id]);
    if (order === null) return <Skeleton active />;
    if (!order)
        return (
            <div>
                <Empty description={copy.notFound} />
                <Link href="/dashboard/orders" className="text-brand-400 block text-center mt-5">
                    {copy.backToOrders}
                </Link>
            </div>
        );
    const exportPdf = async () => {
        if (!invoiceRef.current) return;
        setExporting('pdf');
        try {
            await downloadInvoicePdf(invoiceRef.current, order.invoice!.number);
        } catch {
            await message.error('ساخت فایل PDF انجام نشد. دوباره تلاش کنید.');
        } finally {
            setExporting(null);
        }
    };
    const exportExcel = async () => {
        setExporting('excel');
        try {
            await downloadInvoiceExcel(order, order.invoice!.number);
        } catch {
            await message.error('ساخت فایل Excel انجام نشد. دوباره تلاش کنید.');
        } finally {
            setExporting(null);
        }
    };
    return (
        <>
            <Link href="/dashboard/orders" className="text-brand-400 hover:underline">
                {copy.backToOrders}
            </Link>
            <div className="flex flex-wrap justify-between gap-4 items-center mt-5">
                <div>
                    <p className="text-secondary">{copy.orderNumber}</p>
                    <h1 className="text-3xl font-extrabold text-primary" dir="ltr">
                        {order.number}
                    </h1>
                </div>
                <OrderStatusTag status={order.status} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-7">
                <div className="rounded-xl border border-subtle bg-elevated p-4">
                    <span className="text-sm text-secondary">{copy.orderDate}</span>
                    <strong className="block text-primary mt-1">{order.createdAt}</strong>
                </div>
                <div className="rounded-xl border border-subtle bg-elevated p-4">
                    <span className="text-sm text-secondary">{copy.lastUpdate}</span>
                    <strong className="block text-primary mt-1">{order.updatedAt}</strong>
                </div>
                <div className="rounded-xl border border-subtle bg-elevated p-4">
                    <span className="text-sm text-secondary">{copy.paymentStatus}</span>
                    <strong className="block text-primary mt-1">
                        {paymentStatusLabels[locale][order.paymentStatus]}
                    </strong>
                </div>
            </div>

            <section className="rounded-2xl border border-subtle bg-elevated p-5 md:p-7 mt-7">
                <h2 className="text-xl font-bold text-primary mb-6">{copy.timeline}</h2>
                <Steps
                    direction="vertical"
                    current={order.events.length - 1}
                    items={order.events.map(event => ({
                        title: orderStatusLabels[locale][event.status],
                        description: `${event.date} — ${event.note}`,
                        status: event.completed ? 'finish' : 'wait',
                    }))}
                />
            </section>

            <section className="rounded-2xl border border-subtle bg-elevated p-5 md:p-7 mt-7">
                <h2 className="text-xl font-bold text-primary mb-5">{copy.orderItems}</h2>
                <div className="space-y-5">
                    {order.items.map(item => (
                        <article
                            key={item.id}
                            className="flex flex-wrap sm:flex-nowrap gap-5 border-b border-subtle last:border-0 pb-5 last:pb-0"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-28 object-contain rounded-xl bg-surface"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold text-primary">{item.name}</h3>
                                <p className="text-sm text-secondary mt-1" dir="ltr">
                                    {item.model}
                                </p>
                                <p className="text-secondary mt-3">
                                    {copy.modules}: {item.modules.join('، ')}
                                </p>
                                <p className="text-primary mt-3">
                                    {copy.quantity}: {item.quantity.toLocaleString(numberLocale)} · {copy.total}:{' '}
                                    {money(item.quantity * item.unitPrice)}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mt-7">
                <h2 className="text-xl font-bold text-primary mb-5">{copy.invoice}</h2>
                {!order.invoice ? (
                    <Alert type="info" showIcon message={copy.invoicePending} />
                ) : (
                    <>
                        <div className="flex flex-wrap gap-3 mb-5 invoice-actions">
                            <Button
                                type="primary"
                                icon={<DownloadOutlined />}
                                loading={exporting === 'pdf'}
                                onClick={exportPdf}
                            >
                                {copy.downloadPdf}
                            </Button>
                            <Button icon={<FileExcelOutlined />} loading={exporting === 'excel'} onClick={exportExcel}>
                                {copy.downloadExcel}
                            </Button>
                            <Button icon={<PrinterOutlined />} onClick={() => window.print()}>
                                {copy.print}
                            </Button>
                        </div>
                        <div className="overflow-x-auto rounded-2xl border border-subtle">
                            <InvoiceDocument ref={invoiceRef} order={order} />
                        </div>
                    </>
                )}
            </section>
        </>
    );
}
