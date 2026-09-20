'use client';

import Link from 'next/link';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useLanguage} from '@/app/context/LanguageContext';
import {commerceCopy} from '@/data/commerce';
import {filterMachines, productCategories} from '@/data/products';
import QuantityControl from './QuantityControl';

export default function ProductsPage() {
    const {t, locale} = useLanguage();
    const copy = commerceCopy[locale];
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const category = searchParams.get('category') ?? '';
    const products = filterMachines(t.machines, category);
    const knownCategory = productCategories.some(item => item.id === category);

    const setCategory = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set('category', value);
        else params.delete('category');
        // Preserve other query parameters and allow browser Back to restore filters.
        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname, {scroll: false});
    };

    return (
        <main className="max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-20 min-h-[70vh]">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary">{copy.allProducts}</h1>
            <p className="text-secondary mt-4 leading-7">{copy.productsDescription}</p>
            <div className="mt-8 mb-8 rounded-2xl border border-subtle bg-surface p-5 flex flex-wrap items-end gap-4">
                <div className="flex flex-col gap-2 w-full sm:w-72">
                    <label htmlFor="product-category" className="text-sm font-semibold text-primary">
                        {copy.category}
                    </label>
                    <select
                        id="product-category"
                        value={category}
                        onChange={event => setCategory(event.target.value)}
                        className="w-full border border-subtle bg-elevated text-primary rounded-xl px-4 py-3 focus:outline-brand"
                    >
                        <option value="">{copy.allCategories}</option>
                        {category && !knownCategory && <option value={category}>{copy.unknownCategory}</option>}
                        {productCategories.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.label[locale]}
                            </option>
                        ))}
                    </select>
                </div>
                {category && (
                    <button onClick={() => setCategory('')} className="text-brand-400 py-3 hover:underline">
                        {copy.clearFilters}
                    </button>
                )}
                <p aria-live="polite" aria-atomic="true" className="text-secondary text-sm py-3 sm:ms-auto">
                    {products.length.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US')} {copy.results}
                </p>
            </div>
            {products.length ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(machine => (
                        <article
                            key={machine.id}
                            className="flex flex-col rounded-3xl border border-subtle bg-surface p-5"
                        >
                            {/*<Link href={`/products/${machine.id}`} className="rounded-2xl bg-page p-5">*/}
                            {/*    <img src={machine.image} alt={machine.name} className="w-full h-60 object-contain" />*/}
                            {/*</Link>*/}

                            <div className="rounded-2xl bg-page p-5">
                                <img src={machine.image} alt={machine.name} className="w-full h-60 object-contain" />
                            </div>
                            <span className="text-brand-400 text-xs mt-5">
                                {productCategories.find(item => item.id === machine.category)?.label[locale]}
                            </span>
                            <h2 className="text-xl font-bold text-primary mt-2">
                                {/*<Link href={`/products/${machine.id}`}>{machine.name}</Link>*/}
                                <div>{machine.name}</div>
                            </h2>
                            <p className="text-secondary text-sm leading-7 mt-3 mb-5">{machine.description}</p>
                            <p className="text-primary text-lg font-bold mt-auto mb-4">{machine.priceLabel}</p>
                            {/*FAZ1*/}
                            {/*<div className="flex flex-wrap items-center justify-between gap-3">*/}
                            {/*    <QuantityControl product={machine} />*/}
                            {/*    <Link*/}
                            {/*        href={`/products/${machine.id}`}*/}
                            {/*        className="text-brand-400 text-sm hover:underline"*/}
                            {/*    >*/}
                            {/*        {copy.details}*/}
                            {/*    </Link>*/}
                            {/*</div>*/}
                        </article>
                    ))}
                </div>
            ) : (
                <div className="text-center text-secondary border border-subtle rounded-2xl p-12">
                    {copy.noProducts}
                </div>
            )}
        </main>
    );
}
