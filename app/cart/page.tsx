import type {Metadata} from 'next';
import CartPage from '@/components/CartPage';

export const metadata: Metadata = {title: 'سبد خرید | روبات مارکت'};

export default function Page() {
    return <CartPage/>;
}
