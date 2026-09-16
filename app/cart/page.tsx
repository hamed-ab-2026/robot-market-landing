import type {Metadata} from 'next';
import CartPage from '@/components/CartPage';
import ProtectedPage from '@/components/auth/ProtectedPage';

export const metadata: Metadata = {title: 'سبد خرید | روبات مارکت'};

export default function Page() {
    return (
        <ProtectedPage>
            <CartPage />
        </ProtectedPage>
    );
}
