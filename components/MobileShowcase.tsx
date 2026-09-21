'use client';

import {PhoneOutlined} from '@ant-design/icons';
import {featuredMachines} from '@/data/products';
import {useLanguage} from '@/app/context/LanguageContext';
import {commerceCopy} from '@/data/commerce';

export default function MobileShowcase() {
    const {t, dir, locale} = useLanguage();
    const copy = commerceCopy[locale];
    const contact = t.contactInfo;

    return (
        <section id="showcase" className="relative w-full py-8 px-4" dir={dir}>
            <div className="flex flex-col gap-4 pb-4">
                {featuredMachines(t.machines).map(machine => (
                    <article
                        key={machine.id}
                        className="w-full bg-surface border border-subtle rounded-2xl p-4"
                    >
                        <div className="flex gap-4 items-center">
                            {/*<Link href={`/products/${machine.id}`} className="flex gap-4 items-center">*/}
                            <img src={machine.image} alt={machine.name} className="w-24 h-28 object-contain shrink-0" />
                            <div className="min-w-0">
                                <span className="text-brand-400 text-xs font-semibold">{machine.shortLabel}</span>
                                <h3 className="text-lg font-bold text-primary mt-1">{machine.name}</h3>
                                <p className="text-sm text-secondary line-clamp-2 mt-2">{machine.description}</p>
                            </div>
                            {/*</Link>*/}
                        </div>
                        <p className="text-base font-bold text-primary my-4">{machine.priceLabel}</p>
                        {/* <div className="flex flex-wrap justify-between items-center gap-3">
                            <QuantityControl product={machine} />
                            <Link href={`/products/${machine.id}`} className="text-sm text-brand-400 hover:underline">
                                {copy.details}
                            </Link>
                        </div>*/}
                    </article>
                ))}
            </div>

            <div className="mt-3 rounded-2xl border border-subtle bg-elevated p-5 text-center">
                <h3 className="text-xl font-bold text-primary">{copy.supportOrderTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-secondary">{copy.supportOrderDescription}</p>
                <a
                    href={`tel:${contact.orderPhoneHref}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 font-bold text-ink-950 transition-colors hover:bg-brand-300"
                    dir="ltr"
                >
                    <PhoneOutlined />
                    <span>{copy.callSupport}</span>
                    <span>{contact.orderPhone}</span>
                </a>
            </div>
        </section>
    );
}
