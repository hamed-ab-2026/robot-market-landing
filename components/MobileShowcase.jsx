'use client';

import {useState} from 'react';
import {Modal, Button, message} from 'antd';
import {ShoppingCartOutlined, EyeOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {useLanguage} from '@/app/context/LanguageContext';
import {addToCart} from '@/store/cartSlice';

export default function MobileShowcase() {
    const dispatch = useDispatch();
    const {t, dir} = useLanguage();
    const [quickViewMachine, setQuickViewMachine] = useState(null);

    const handleAddToCart = (machine) => {
        dispatch(
            addToCart({
                id: machine.id,
                name: machine.name,
                priceNumeric: machine.priceNumeric,
                priceLabel: machine.priceLabel,
                image: machine.image,
            })
        );
        message.success(t.cart.addToast(machine.name));
    };

    const handleModalAddToCart = () => {
        if (!quickViewMachine) return;
        handleAddToCart(quickViewMachine);
        setQuickViewMachine(null);
    };

    return (
        <section id="showcase" className="relative w-full py-8 px-4" dir={dir}>
            <div className="flex flex-col gap-4">
                {t.machines.map((machine) => (
                    <div
                        key={machine.id}
                        className="flex gap-4 items-center bg-surface border border-subtle rounded-2xl p-4"
                    >
                        <img
                            src={machine.image}
                            alt={machine.name}
                            className="w-24 h-24 object-contain shrink-0"
                            onClick={() => setQuickViewMachine(machine)}
                        />

                        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                            <span className="text-brand-400 text-xs font-semibold tracking-wide">
                                {machine.shortLabel}
                            </span>
                            <h3 className="text-lg font-bold text-primary truncate">
                                {machine.name}
                            </h3>
                            <p className="text-sm text-secondary line-clamp-2">
                                {machine.description}
                            </p>
                            <p className="text-base font-bold text-primary mt-1">
                                {machine.priceLabel}
                            </p>

                            <div className="flex justify-start items-center  mt-3">
                                <Button
                                    type="primary"
                                    size="middle"
                                    icon={<ShoppingCartOutlined/>}
                                    onClick={() => handleAddToCart(machine)}
                                >
                                    {t.machineActions.addToCart}
                                </Button>
                            </div>
                        </div>
                    </div>
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