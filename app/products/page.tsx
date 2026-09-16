import {Suspense} from 'react';
import type {Metadata} from 'next';
import ProductsPage from '@/components/ProductsPage';

export const metadata: Metadata = {title: 'همه محصولات | روبات مارکت'};

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen pt-28 px-6" aria-busy="true">
                    <div className="h-60 rounded-3xl bg-surface animate-pulse" />
                </div>
            }
        >
            <ProductsPage />
        </Suspense>
    );
}
