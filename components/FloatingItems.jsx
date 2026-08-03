'use client';

// رندر آیتم‌های شناور (چیپس/نوشابه) دور دستگاه با حرکت تصادفی و ملایم GSAP.

import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';

/**
 * Renders the centralized `floatingSnacks` config as absolutely-positioned
 * images and gives each one a gentle, randomized floating drift via GSAP.
 * Positions/sizes/images all come from data/content.js — edit there only.
 */
export default function FloatingItems({items}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const nodes = containerRef.current?.querySelectorAll('[data-float-item]');
        if (!nodes) return;

        const tweens = Array.from(nodes).map((node, i) => {
            const drift = 14 + Math.random() * 14;
            const rotate = 4 + Math.random() * 6;
            return gsap.to(node, {
                y: `+=${drift}`,
                rotate: i % 2 === 0 ? rotate : -rotate,
                duration: 3.5 + Math.random() * 2.5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 1.5,
            });
        });

        return () => tweens.forEach((t) => t.kill());
    }, [items]);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none hidden md:block">
            {items.map((item) => (
                <img
                    key={item.id}
                    data-float-item
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                    style={{
                        top: item.top,
                        left: item.left,
                        width: item.size,
                        height: 'auto',
                    }}
                />
            ))}
        </div>
    );
}
