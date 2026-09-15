'use client';

import {useState} from 'react';
import Link from 'next/link';
import {CheckCircleOutlined} from '@ant-design/icons';
import {useLanguage} from '@/app/context/LanguageContext';
import {commerceCopy} from '@/data/commerce';
import QuantityControl from './QuantityControl';

export default function ProductDetails({id}: {id: string}) {
    const {t, locale} = useLanguage();
    const copy = commerceCopy[locale];
    const machine = t.machines.find(item => item.id === id);
    const [alternate, setAlternate] = useState(false);
    if (!machine) return null;

    return (
        <main className="max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-20">
            <nav aria-label={copy.details} className="text-sm text-secondary flex flex-wrap gap-3 mb-8">
                <Link href="/" className="hover:text-brand-400">{t.nav.home}</Link>
                <span aria-hidden="true">/</span>
                <Link href="/#showcase" className="hover:text-brand-400">{t.nav.showcase}</Link>
                <span aria-hidden="true">/</span><span>{machine.shortLabel}</span>
            </nav>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
                <section aria-label={copy.gallery} className="rounded-3xl border border-subtle bg-surface p-6">
                    <img src={alternate ? machine.imageAlt : machine.image} alt={`${machine.name} — ${alternate ? copy.alternateImage : copy.baseImage}`}
                         className="w-full h-72 md:h-[450px] object-contain"/>
                    <div className="flex justify-center gap-3 mt-6">
                        {[false, true].map(value => (
                            <button key={String(value)} onClick={() => setAlternate(value)} aria-pressed={alternate === value}
                                    aria-label={value ? copy.alternateImage : copy.baseImage}
                                    className={`rounded-xl border p-2 ${alternate === value ? 'border-brand bg-brand/10' : 'border-subtle'}`}>
                                <img src={value ? machine.imageAlt : machine.image} alt="" className="h-20 w-20 object-contain"/>
                            </button>
                        ))}
                    </div>
                </section>
                <section>
                    <p className="text-brand-400 font-semibold">{machine.shortLabel}</p>
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-primary mt-3 leading-relaxed">{machine.name}</h1>
                    <p className="text-secondary mt-5 leading-8">{machine.description}</p>
                    <p className="text-sm text-secondary mt-4">{copy.model}: <span dir="ltr">{machine.id.toUpperCase()}</span></p>
                    <h2 className="font-bold text-primary text-xl mt-8 mb-4">{copy.specifications}</h2>
                    <ul className="space-y-3">
                        {machine.highlights.map(feature => <li key={feature} className="flex gap-3 text-secondary"><CheckCircleOutlined className="text-brand-400"/>{feature}</li>)}
                    </ul>
                    <div className="border-t border-subtle mt-8 pt-6">
                        <p className="text-sm text-secondary">{copy.unitPrice}</p>
                        <p className="text-2xl font-bold text-primary mt-2">{machine.priceLabel}</p>
                        <div className="mt-5 flex flex-wrap gap-4 items-center">
                            <QuantityControl product={machine}/>
                            <Link href="/cart" className="text-brand-400 font-semibold hover:underline">{copy.cartLink}</Link>
                        </div>
                        <p className="text-secondary text-sm leading-7 mt-5">{copy.checkoutUnavailable}</p>
                    </div>
                </section>
            </div>
        </main>
    );
}
