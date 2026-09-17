'use client';

import type {Machine} from '@/types/domain';
import type {MouseEvent} from 'react';
import {useRef} from 'react';
import QuantityControl from './QuantityControl';
import ProtectedLink from './auth/ProtectedLink';
import {commerceCopy} from '@/data/commerce';
import {useLanguage} from '@/app/context/LanguageContext';
import FloatingItems from './FloatingItems';
import {floatingSnacks} from '@/data/content';

export default function VendingCard({machine}: {machine: Machine}) {
    const {t, dir, locale} = useLanguage();
    const stageRef = useRef<HTMLDivElement>(null);
    const lensRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLImageElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const stage = stageRef.current;
        if (!stage) return;
        const rect = stage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (lensRef.current) {
            lensRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        }
        if (revealRef.current) {
            revealRef.current.style.clipPath = `circle(95px at ${x}px ${y}px)`;
        }
    };

    const handleMouseLeave = () => {
        if (revealRef.current) revealRef.current.style.clipPath = 'circle(0px at 50% 50%)';
    };

    return (
        <div className="horizontal-panel flex items-center justify-center px-6 md:px-16" dir={dir}>
            <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-0 md:gap-10 items-center">
                <div
                    ref={stageRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="spotlight-stage relative h-48  md:h-[500px] flex items-center justify-center"
                >
                    <FloatingItems items={floatingSnacks} />

                    <img src={machine.image} alt={machine.name} className="base-layer z-10" />
                    <img
                        ref={revealRef}
                        src={machine.imageAlt}
                        alt={`${machine.name} - ${t.machineActions.altVariant}`}
                        className="reveal-layer z-20"
                    />
                    <div ref={lensRef} className="spotlight-lens" />

                    <span className="absolute hidden md:block top-3 z-30 text-[11px] px-3 py-1 rounded-full bg-brand/15 border border-subtle text-brand-400 start-3">
                        {t.machineActions.hoverHint}
                    </span>
                </div>

                <div className="flex flex-col justify-center items-center gap-5 ">
                    <span className="text-brand-400 text-sm font-semibold tracking-wide">{machine.shortLabel}</span>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-primary">{machine.name}</h3>

                    <div className="grid grid-cols-[auto,1fr] gap-4 items-start bg-surface border border-subtle rounded-2xl p-4">
                        <img
                            src={machine.gif}
                            alt={t.machineActions.gifAlt(machine.name)}
                            className="w-28 h-14 md:w-32 md:h-24 object-cover rounded-lg border border-subtle"
                        />
                        <p className="text-sm md:text-base text-secondary md:leading-7">{machine.description}</p>
                    </div>

                    <ul className="flex flex-wrap gap-2">
                        {machine.highlights.map(h => (
                            <li
                                key={h}
                                className="text-xs md:text-sm text-brand-400 bg-brand/10 border border-subtle rounded-full px-3 py-1"
                            >
                                {h}
                            </li>
                        ))}
                    </ul>

                    <p className="text-xl md:text-2xl font-bold text-primary mt-2">{machine.priceLabel}</p>

                    <div className="flex flex-wrap  items-center gap-2 mt-2 ">
                        <QuantityControl product={machine} />
                        <ProtectedLink
                            href={`/products/${machine.id}`}
                            className="px-5 py-3 rounded-xl border border-subtle text-primary hover:text-brand-400"
                        >
                            {commerceCopy[locale].details}
                        </ProtectedLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
