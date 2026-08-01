'use client';

import {
  HomeOutlined,
  ReadOutlined,
  ShopOutlined,
  MedicineBoxOutlined,
  ClockCircleOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { useLanguage } from '@/app/context/LanguageContext';

const ICONS = {
  hotel: HomeOutlined,
  school: ReadOutlined,
  pharmacy: ShopOutlined,
  hospital: MedicineBoxOutlined,
  night: ClockCircleOutlined,
  specialty: AppstoreOutlined,
};

export default function LocationsSection() {
  const { t } = useLanguage();

  return (
    <section id="locations" className="relative px-6 md:px-16 py-20 md:py-28 bg-page border-t border-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold brand-gradient-text">{t.locations.title}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.locations.items.map((loc) => {
            const Icon = ICONS[loc.icon];
            return (
              <div
                key={loc.id}
                className="bg-page-60 border border-subtle rounded-2xl p-6 hover:border-brand-500/60 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand/15 border border-subtle flex items-center justify-center text-brand-400 text-xl mb-4">
                  {Icon && <Icon />}
                </div>
                <h3 className="text-primary font-bold text-base mb-2">{loc.title}</h3>
                <p className="text-secondary text-sm leading-7">{loc.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
