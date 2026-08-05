'use client';

import {useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Modal, Button, message} from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import VendingCard from './VendingCard';
import {showcaseVideoSrc} from '@/data/content';
import {useLanguage} from '@/app/context/LanguageContext';
import {addToCart} from '@/store/cartSlice';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalShowcase() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const videoRef = useRef(null);
    const dispatch = useDispatch();
    const {t} = useLanguage();
    const [quickViewMachine, setQuickViewMachine] = useState(null);
    const [videoAvailable, setVideoAvailable] = useState(true);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            const section = sectionRef.current;

            if (!track || !section) return;

            const scrollDistance = () => (
                Math.max(track.scrollWidth - window.innerWidth, 0)
            );

            let animationFrameId = null;
            let latestProgress = 0;

            const syncVideo = (progress) => {
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

    const handleModalAddToCart = () => {
        if (!quickViewMachine) return;

        dispatch(
            addToCart({
                id: quickViewMachine.id,
                name: quickViewMachine.name,
                priceNumeric: quickViewMachine.priceNumeric,
                priceLabel: quickViewMachine.priceLabel,
                image: quickViewMachine.image,
            })
        );

        message.success(t.cart.addToast(quickViewMachine.name));
        setQuickViewMachine(null);
    };

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
                    <VendingCard key={machine.id} machine={machine} onQuickView={setQuickViewMachine}/>
                ))}
            </div>

            <Modal
                open={!!quickViewMachine}
                onCancel={() => setQuickViewMachine(null)}
                footer={null}
                centered
                title={quickViewMachine?.name}
            >
                {quickViewMachine && (
                    <div className="flex flex-col gap-4">
                        <img
                            src={quickViewMachine.image}
                            alt={quickViewMachine.name}
                            className="w-full h-64 object-contain"
                        />
                        <p className="text-secondary leading-7">{quickViewMachine.description}</p>
                        <p className="text-xl font-bold text-primary">{quickViewMachine.priceLabel}</p>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ShoppingCartOutlined/>}
                            onClick={handleModalAddToCart}
                        >
                            {t.machineActions.addToCart}
                        </Button>
                    </div>
                )}
            </Modal>
        </section>
    );
}