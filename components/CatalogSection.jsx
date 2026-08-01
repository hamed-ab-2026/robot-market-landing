'use client';

import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { useLanguage } from '@/app/context/LanguageContext';

function toLocaleNumber(n, locale) {
  return n.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US');
}

export default function CatalogSection() {
  const { t, locale } = useLanguage();
  const dispatch = useDispatch();
  const currencySuffix = locale === 'fa' ? ' ریال' : ' Rials';

  const handleAdd = (item) => {
    dispatch(
      addToCart({
        id: `catalog-${item.id}`,
        name: item.name,
        priceNumeric: item.priceNumeric,
        priceLabel: `${toLocaleNumber(item.priceNumeric, locale)}${currencySuffix}`,
        image: item.image,
      })
    );
    message.success(t.catalog.addToast(item.name));
  };

  return (
    <section id="catalog" className="relative px-6 md:px-16 py-20 md:py-28 bg-elevated border-t border-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-brand-400 text-sm font-semibold tracking-wide">{t.catalog.eyebrow}</span>
          <h2 className="text-2xl md:text-4xl font-extrabold brand-gradient-text mt-3">{t.catalog.title}</h2>
        </div>
        <p className="text-secondary text-sm md:text-base text-center max-w-2xl mx-auto mb-12">
          {t.catalog.subtitle}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.catalog.items.map((item) => (
            <div
              key={item.id}
              className="bg-surface border border-subtle rounded-2xl p-5 flex flex-col hover:border-brand-500/60 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] text-brand-400 font-semibold">{item.category}</span>
                  <h3 className="text-primary font-bold text-sm leading-6">{item.name}</h3>
                </div>
              </div>

              <div className="mt-auto flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-secondary line-through opacity-70">
                    {toLocaleNumber(item.originalPriceNumeric, locale)}
                    {currencySuffix}
                  </p>
                  <p className="text-base font-bold text-primary">
                    {toLocaleNumber(item.priceNumeric, locale)}
                    {currencySuffix}
                  </p>
                </div>
                <Button
                  type="primary"
                  size="middle"
                  icon={<PlusOutlined />}
                  onClick={() => handleAdd(item)}
                >
                  {t.catalog.addToOrder}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
