'use client';

import {useEffect} from 'react';
import {useStore} from 'react-redux';
import type {AppStore} from '@/store/store';
import type {CartItem} from '@/types/domain';
import {restoreCart} from '@/store/cartSlice';
import {content} from '@/data/content';

const STORAGE_KEY = 'rm-cart';
const useAppStore = useStore.withTypes<AppStore>();

export default function CartPersistence() {
    const store = useAppStore();

    useEffect(() => {
        try {
            const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
            if (Array.isArray(saved)) {
                const items: CartItem[] = [];
                for (const entry of saved) {
                    if (
                        !entry ||
                        typeof entry !== 'object' ||
                        typeof entry.id !== 'string' ||
                        !Number.isSafeInteger(entry.qty) ||
                        entry.qty < 1
                    )
                        continue;
                    const machine = content.fa.machines.find(item => item.id === entry.id);
                    if (!machine || items.some(item => item.id === machine.id)) continue;
                    // Restore identifiers and quantities; use current catalog prices and images.
                    items.push({
                        id: machine.id,
                        name: machine.name,
                        image: machine.image,
                        priceNumeric: machine.priceNumeric,
                        priceLabel: machine.priceLabel,
                        qty: entry.qty,
                    });
                }
                store.dispatch(restoreCart(items));
            }
        } catch {
            // Invalid or unavailable storage must not prevent shopping.
        }

        return store.subscribe(() => {
            try {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(store.getState().cart.items.map(({id, qty}) => ({id, qty}))),
                );
            } catch {
                // Keep the in-memory cart usable when storage is full or disabled.
            }
        });
    }, [store]);

    return null;
}
