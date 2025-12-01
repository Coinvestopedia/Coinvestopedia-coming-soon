import React from 'react';
import { motion } from 'framer-motion';
import bgImage from '../assets/background.png';

export const Background: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Gradient Overlay - Reduced opacity to show background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-navy-900 to-navy-900 opacity-60 z-10" />

            {/* Floating Assets - Increased opacity and scale */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0 flex items-center justify-center animate-float"
            >
                <img
                    src={bgImage}
                    alt="Crypto Background"
                    className="w-full h-full object-cover opacity-70"
                />
            </motion.div>

            {/* Animated Orbs/Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] animate-float" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-navy/40 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        </div>
    );
};
