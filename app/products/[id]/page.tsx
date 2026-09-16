import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {content} from '@/data/content';
import ProductDetails from '@/components/ProductDetails';
import ProtectedPage from '@/components/auth/ProtectedPage';

type Props = { params: { id: string } };

export function generateStaticParams() {
    return content.fa.machines.map(machine => ({id: machine.id}));
}

export function generateMetadata({params}: Props): Metadata {
    const machine = content.fa.machines.find(item => item.id === params.id);
    if (!machine) return {};
    return {title: `${machine.name} | روبات مارکت`, description: machine.description};
}

export default function ProductPage({params}: Props) {
    if (!content.fa.machines.some(machine => machine.id === params.id)) notFound();
    return <ProtectedPage><ProductDetails id={params.id}/></ProtectedPage>;
}
