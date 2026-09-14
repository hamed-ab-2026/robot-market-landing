'use client';

// Cart drawer with quantity editing, totals, and placeholder checkout.

import {Drawer, Button, Empty, InputNumber, message} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {
    selectCartItems,
    selectCartTotal,
    selectIsDrawerOpen,
    closeDrawer,
    removeFromCart,
    setQuantity,
} from '@/store/cartSlice';
import {useLanguage} from '@/app/context/LanguageContext';
import type {Locale} from '@/types/domain';
import api from "@/lib/axios";

function toLocaleNumber(n: number, locale: Locale) {
    return n.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US');
}

export default function CartDrawer() {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectIsDrawerOpen);
    const items = useAppSelector(selectCartItems);
    const total = useAppSelector(selectCartTotal);
    const {t, locale, dir} = useLanguage();

    const currencySuffix = locale === 'fa' ? ' ریال' : ' Rials';

    const handleCheckout = async () => {
        // -------------------------------------------------------------------
        // TODO: Connect to payment gateway API..

        // try {
        //   const { data } = await axios.post('/api/payment/create', {
        //     items: items.map((i) => ({ id: i.id, qty: i.qty })),
        //     totalAmount: total,
        //   });
        //   window.location.href = data.paymentRedirectUrl;
        // } catch (err) {
        //   message.error('...');
        // }

        // api() <===> todo : use this func to fetch ...

        // -------------------------------------------------------------------
        await message.info(t.cart.checkoutToast);

    };

    return (
        <Drawer
            title={t.cart.title}
            placement={dir === 'rtl' ? 'right' : 'left'}
            onClose={() => dispatch(closeDrawer())}
            open={isOpen}
            width={400}
        >
            {items.length === 0 ? (
                <Empty description={<span className="text-secondary">{t.cart.empty}</span>} className="mt-16"/>
            ) : (
                <div className="flex flex-col gap-4">
                    {items.map((item) => (
                        <div key={item.id}
                             className="flex items-center gap-3 bg-surface border border-subtle rounded-xl p-3">
                            <img src={item.image} alt={item.name} className="w-14 h-20 object-contain shrink-0"/>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-primary truncate">{item.name}</p>
                                <p className="text-xs text-brand-400 mt-1">
                                    {toLocaleNumber(item.priceNumeric, locale)}
                                    {currencySuffix}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <InputNumber
                                        size="small"
                                        min={1}
                                        precision={0}
                                        value={item.qty}
                                        onChange={(val) => {
                                            if (val !== null) dispatch(setQuantity({id: item.id, qty: val}));
                                        }}
                                        className="w-16"
                                    />
                                    <Button
                                        type="text"
                                        danger
                                        size="small"
                                        icon={<DeleteOutlined/>}
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="border-t border-subtle pt-4 mt-2">
                        <div className="flex items-center justify-between text-sm text-secondary mb-4">
                            <span>{t.cart.total}</span>
                            <span className="text-lg font-bold text-primary">
                {toLocaleNumber(total, locale)}
                                {currencySuffix}
              </span>
                        </div>
                        <Button type="primary" block size="large" onClick={handleCheckout}>
                            {t.cart.checkout}
                        </Button>
                    </div>
                </div>
            )}
        </Drawer>
    );
}
