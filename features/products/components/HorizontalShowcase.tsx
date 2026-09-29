'use client';

import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import VendingCard from './VendingCard';
import {featuredMachines} from '@/features/products/data/catalog';
import {useLanguage} from '@/app/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const {t} = useLanguage();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            const section = sectionRef.current;
            const background = backgroundRef.current;

            if (!track || !section) return;

            const scrollDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

            const backgroundColors = ['#062522', '#0b3d38', '#123d67', '#45235e', '#4a2c18'];
            const colorAtProgress = (progress: number) => gsap.utils.interpolate(backgroundColors, progress);

            const horizontalTween = gsap.to(track, {
                x: () => -scrollDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${scrollDistance()}`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                    onUpdate: self => {
                        if (!background) return;

                        background.style.backgroundColor = colorAtProgress(self.progress);
                        background.style.backgroundPosition = `${self.progress * 100}% ${50 + self.progress * 30}%`;
                    },
                },
            });

            return () => {
                horizontalTween.scrollTrigger?.kill();
                horizontalTween.kill();
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="showcase" ref={sectionRef} className="relative w-full overflow-hidden">
            <div
                ref={backgroundRef}
                className="absolute inset-0 z-0 bg-[#062522] transition-[background-color] duration-300"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 18% 22%, rgba(92, 204, 180, 0.42), transparent 31%), radial-gradient(circle at 78% 72%, rgba(255, 177, 92, 0.36), transparent 36%), linear-gradient(125deg, rgba(255,255,255,0.06), transparent 55%)',
                    backgroundSize: '145% 145%, 145% 145%, 100% 100%',
                    backgroundPosition: '0% 50%',
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(4,18,15,0.55) 0%, rgba(7,30,25,0.3) 50%, rgba(4,18,15,0.6) 100%)',
                    }}
                />
            </div>

            <div
                ref={trackRef}
                className="horizontal-track relative z-10 [&_.horizontal-panel]:h-full [&_.spotlight-stage]:max-h-[calc(100vh-4rem)]"
                style={{height: '100vh'}}
                dir="ltr"
            >
                {featuredMachines(t.machines).map(machine => (
                    <VendingCard key={machine.id} machine={machine} />
                ))}
            </div>
        </section>
    );
}
