'use client';

import {useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import VendingCard from './VendingCard';
import {showcaseVideoSrc} from '@/data/content';
import {useLanguage} from '@/app/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const {t} = useLanguage();
    const [videoAvailable, setVideoAvailable] = useState(true);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            const section = sectionRef.current;

            if (!track || !section) return;

            const scrollDistance = () => (
                Math.max(track.scrollWidth - window.innerWidth, 0)
            );

            let animationFrameId: number | null = null;
            let latestProgress = 0;

            const syncVideo = (progress: number) => {
                latestProgress = progress;
                if (animationFrameId !== null) return;

                animationFrameId = window.requestAnimationFrame(() => {
                    const video = videoRef.current;
                    if (video && Number.isFinite(video.duration) && video.duration > 0) {
                        video.currentTime = latestProgress * video.duration;
                    }
                    animationFrameId = null;
                });
            };

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
                    onUpdate: (self) => syncVideo(self.progress),
                },
            });

            return () => {
                if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
                horizontalTween.scrollTrigger?.kill();
                horizontalTween.kill();
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="showcase" ref={sectionRef} className="relative w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                {videoAvailable && (
                    <video
                        ref={videoRef}
                        src={showcaseVideoSrc}
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover opacity-60"
                        onError={() => setVideoAvailable(false)}
                    />
                )}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(4,18,15,0.55) 0%, rgba(7,30,25,0.3) 50%, rgba(4,18,15,0.6) 100%)',
                    }}
                />
            </div>

            <div ref={trackRef} className="horizontal-track relative z-10" dir="ltr">
                {t.machines.map((machine) => (
                    <VendingCard key={machine.id} machine={machine}/>
                ))}
            </div>

        </section>
    );
}
