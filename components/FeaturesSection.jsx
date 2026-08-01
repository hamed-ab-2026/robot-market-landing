'use client';

import {
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
  CreditCardOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { useLanguage } from '@/app/context/LanguageContext';

const ICONS = {
  safety: SafetyCertificateOutlined,
  consulting: CustomerServiceOutlined,
  installment: CreditCardOutlined,
  packaging: InboxOutlined,
};

export default function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section className="relative px-6 md:px-16 py-16 md:py-20 bg-page border-t border-subtle">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {t.features.map((feature) => {
          const Icon = ICONS[feature.icon];
          return (
            <div
              key={feature.id}
              className="group bg-surface border border-subtle rounded-2xl p-6 text-center hover:border-brand-500/60 hover:bg-surface-strong transition-colors"
            >
              <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-brand/15 border border-subtle flex items-center justify-center text-brand-400 text-2xl group-hover:bg-brand/25 transition-colors">
                {Icon && <Icon />}
              </div>
              <h3 className="text-primary font-bold text-base mb-2">{feature.title}</h3>
              <p className="text-secondary text-sm leading-6">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
