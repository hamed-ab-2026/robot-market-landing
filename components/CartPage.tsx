'use client';

import Link from 'next/link';
import {Button, Empty} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {removeFromCart, selectCartItems, selectCartTotal} from '@/store/cartSlice';
import {useLanguage} from '@/app/context/LanguageContext';
import {commerceCopy} from '@/data/commerce';
import QuantityControl from './QuantityControl';

export default function CartPage() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const total = useAppSelector(selectCartTotal);
    const {t, locale} = useLanguage();
    const copy = commerceCopy[locale];
    const money = (value: number) => `${value.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')} ${copy.currency}`;

    return (
        <main className="mx-auto max-w-7xl min-h-[65vh] px-5 md:px-8 pt-28 pb-20">
            <Link href="/products" className="text-brand-400 hover:underline">{copy.continueShopping}</Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary mt-6">{t.cart.title}</h1>
            <p className="text-secondary mt-3 mb-10">{copy.cartDescription}</p>
            {items.length === 0 ? (
                <div className="rounded-3xl border border-subtle bg-surface p-10 text-center">
                    <Empty description={t.cart.empty}/>
                    <Link href="/products" className="inline-block mt-6 text-brand-400 hover:underline">{copy.continueShopping}</Link>
                </div>
            ) : (
                <div className="grid lg:grid-cols-[minmax(0,1fr),340px] gap-8 items-start">
                    <div className="space-y-4">
                        {items.map(item => {
                            const product = t.machines.find(machine => machine.id === item.id) ?? item;
                            return (
                                <article key={item.id} className="rounded-2xl border border-subtle bg-surface p-5 flex flex-wrap sm:flex-nowrap gap-5 items-center">
                                    <Link href={`/products/${item.id}`} className="shrink-0">
                                        <img src={product.image} alt={product.name} className="w-24 h-32 object-contain"/>
                                    </Link>
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/products/${item.id}`} className="font-bold text-lg text-primary hover:text-brand-400">{product.name}</Link>
                                        <p className="text-secondary text-sm mt-2">{copy.unitPrice}: {money(item.priceNumeric)}</p>
                                        <div className="flex flex-wrap gap-3 items-center mt-4">
                                            <QuantityControl product={product}/>
                                            <Button danger type="text" icon={<DeleteOutlined/>}
                                                    aria-label={`${copy.remove}: ${product.name}`}
                                                    onClick={() => dispatch(removeFromCart(item.id))}/>
                                        </div>
                                        <p className="mt-4 text-primary font-semibold">{copy.lineTotal}: {money(item.qty * item.priceNumeric)}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                    <aside className="lg:sticky lg:top-28 border border-subtle bg-elevated rounded-2xl p-6">
                        <h2 className="font-bold text-xl text-primary">{copy.summary}</h2>
                        <div className="border-t border-subtle mt-5 pt-5 flex flex-wrap justify-between gap-3">
                            <span className="text-secondary">{t.cart.total}</span>
                            <strong className="text-primary">{money(total)}</strong>
                        </div>
                        <p className="text-secondary text-sm leading-7 my-5">{copy.checkoutUnavailable}</p>
                        <Button type="primary" size="large" disabled block>{t.cart.checkout}</Button>
                    </aside>
                </div>
            )}
        </main>
    );
}
