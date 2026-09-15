'use client';

import Link from 'next/link';
import {useLanguage} from '@/app/context/LanguageContext';
import {commerceCopy} from '@/data/commerce';
import QuantityControl from './QuantityControl';

export default function MobileShowcase() {
    const {t, dir, locale} = useLanguage();

    return (
        <section id="showcase" className="relative w-full py-8 px-4" dir={dir}>
            <div className="flex flex-col gap-4">
                {t.machines.map(machine => (
                    <article key={machine.id} className="bg-surface border border-subtle rounded-2xl p-4">
                        <Link href={`/products/${machine.id}`} className="flex gap-4 items-center">
                            <img src={machine.image} alt={machine.name} className="w-24 h-28 object-contain shrink-0"/>
                            <div className="min-w-0">
                                <span className="text-brand-400 text-xs font-semibold">{machine.shortLabel}</span>
                                <h3 className="text-lg font-bold text-primary mt-1">{machine.name}</h3>
                                <p className="text-sm text-secondary line-clamp-2 mt-2">{machine.description}</p>
                            </div>
                        </Link>
                        <p className="text-base font-bold text-primary my-4">{machine.priceLabel}</p>
                        <div className="flex flex-wrap justify-between items-center gap-3">
                            <QuantityControl product={machine}/>
                            <Link href={`/products/${machine.id}`} className="text-sm text-brand-400 hover:underline">
                                {commerceCopy[locale].details}
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
