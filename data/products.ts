import type {Locale, Machine, ProductCategory} from '@/types/domain';

export const productCategories: {id: ProductCategory; label: Record<Locale, string>}[] = [
    {id: 'warm-vending', label: {fa: 'وندینگ گرم', en: 'Warm vending'}},
];

// Keep the home showcase independent of future catalog additions.
const featuredIds = ['rm-35', 'rm-48', 'rm-60'];

export function featuredMachines(machines: Machine[]): Machine[] {
    return featuredIds.flatMap(id => machines.filter(machine => machine.id === id));
}

export function filterMachines(machines: Machine[], category: string): Machine[] {
    return category ? machines.filter(machine => machine.category === category) : machines;
}
