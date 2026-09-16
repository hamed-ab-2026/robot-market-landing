'use client';

import {Button} from 'antd';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import type {CartProduct} from '@/types/domain';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {addToCart, decrementQty} from '@/store/cartSlice';
import {useLanguage} from '@/app/context/LanguageContext';
import {commerceCopy} from '@/data/commerce';

export default function QuantityControl({product}: {product: CartProduct}) {
    const dispatch = useAppDispatch();
    const {locale} = useLanguage();
    const copy = commerceCopy[locale];
    const quantity = useAppSelector(state => state.cart.items.find(item => item.id === product.id)?.qty ?? 0);

    return (
        <div role="group" aria-label={`${copy.quantity}: ${product.name}`}
             className="inline-flex items-center gap-3 rounded-xl border border-subtle bg-page p-1" dir="ltr">
            <Button icon={<MinusOutlined/>} disabled={quantity === 0}
                    aria-label={`${copy.decrease}: ${product.name}`}
                    onClick={() => dispatch(decrementQty(product.id))}/>
            <span aria-live="polite" aria-atomic="true" className="min-w-8 text-center font-bold text-primary">
                {quantity.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')}
            </span>
            <Button type="primary" icon={<PlusOutlined/>}
                    aria-label={`${copy.increase}: ${product.name}`}
                    onClick={() => dispatch(addToCart({id: product.id, name: product.name, image: product.image,
                        priceLabel: product.priceLabel, priceNumeric: product.priceNumeric}))}/>
        </div>
    );
}
