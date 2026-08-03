'use client';

// نقشه نشان (Neshan) — از Static Map API استفاده می‌کند. تا وقتی کلید API خالی باشد،
// به‌جای نقشه یک پیام راهنما نشان داده می‌شود (نه تصویر خراب).

import {useState} from 'react';
import {EnvironmentOutlined} from '@ant-design/icons';
import {useLanguage} from '@/app/context/LanguageContext';
import {useTheme} from '@/app/context/ThemeContext';
import {mapLocations} from '@/data/content';
import Image from "next/image";

// ---------------------------------------------------------------------------
// Neshan (نشان) map integration.
//
// TODO: put your Neshan API key here, or (preferred) set it as an environment
// variable in `.env.local`:
//   NEXT_PUBLIC_NESHAN_API_KEY=your-key-here
// Get a key from https://platform.neshan.org
// ---------------------------------------------------------------------------
const NESHAN_API_KEY = process.env.NEXT_PUBLIC_NESHAN_API_KEY || '';

// Neshan's Static Map API — a plain image, no JS SDK/script tag needed.
// Verify query param names/values against the current Neshan docs
// (https://platform.neshan.org/api/static-map/) if this ever needs updating —
// `type` accepts their day/night map styles, e.g. "standard-day" / "standard-night".
function staticMapUrl({lat, lng}, mapStyle) {
    const params = new URLSearchParams({
        key: NESHAN_API_KEY,
        type: mapStyle,
        center: `${lat},${lng}`,
        zoom: '15',
        size: '600x400',
        marker: `${lat},${lng}`,
    });
    return `https://api.neshan.org/v5/static?${params.toString()}`;
}

function neshanViewUrl({lat, lng}) {
    return `https://neshan.org/maps/@${lat},${lng},15z`;
}

function MapThumb({coords, mapStyle, alt}) {
    const [errored, setErrored] = useState(false);
    const {t} = useLanguage();

    if (!NESHAN_API_KEY || errored) {
        return (
            <div
                className="w-full h-full min-h-[280px] flex flex-col items-center justify-center gap-3 bg-surface text-secondary text-sm text-center p-6">
                <EnvironmentOutlined className="text-3xl text-brand-400"/>
                <p>{t.map.configNotice}</p>
            </div>
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={staticMapUrl(coords, mapStyle)}
            alt={alt}
            onError={() => setErrored(true)}
            className="w-full h-full object-cover"
        />
    );
}

export default function MapSection() {
    const {t} = useLanguage();
    const {theme} = useTheme();
    const mapStyle = theme === 'dark' ? 'standard-night' : 'standard-day';

    const pins = [
        {
            key: 'factory',
            label: t.map.factoryLabel,
            coords: mapLocations.factory,
            address: t.contactInfo.factoryAddress
        },
        {
            key: 'sales',
            label: t.map.salesLabel,
            coords: mapLocations.salesOffice,
            address: t.contactInfo.salesOfficeAddress
        },
    ];

    return (
        <section id="map" className="relative px-6 md:px-16 py-20 md:py-28 bg-page border-t border-subtle">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-brand-400 text-sm font-semibold tracking-wide">{t.map.eyebrow}</span>
                    <h2 className="text-2xl md:text-4xl font-extrabold brand-gradient-text mt-3">{t.map.title}</h2>
                </div>

                <div className="grid lg:grid-cols-[1.3fr,1fr] gap-6">
                    <div className="rounded-2xl overflow-hidden border border-subtle h-[360px] lg:h-auto min-h-[360px]">
                        <MapThumb coords={pins[0].coords} mapStyle={mapStyle} alt={pins[0].label}/>
                    </div>

                    <div className="flex flex-col gap-4">
                        {pins.map((pin) => (
                            <div key={pin.key} className="bg-surface border border-subtle rounded-2xl p-5">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-10 h-10 shrink-0 rounded-lg bg-brand/15 border border-subtle flex items-center justify-center text-brand-400">
                                        <EnvironmentOutlined/>
                                    </div>
                                    <div>
                                        <h3 className="text-primary font-bold text-sm mb-1">{pin.label}</h3>
                                        <p className="text-secondary text-sm leading-7 mb-2">{pin.address}</p>
                                        <a
                                            href={neshanViewUrl(pin.coords)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-400 hover:text-brand-300 text-xs font-semibold transition-colors"
                                        >
                                            {t.map.openInMaps} ↗
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
