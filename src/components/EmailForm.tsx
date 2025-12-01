import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export const EmailForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }

        try {
            const { error } = await supabase
                .from('subscribers')
                .insert([{ email }]);

            if (error) throw error;

            setStatus('success');
            setMessage('Thanks for subscribing! We\'ll keep you posted.');
            setEmail('');
        } catch (error: any) {
            console.error('Error:', error);
            // Handle duplicate email error specifically if possible, or generic
            if (error.code === '23505') { // Unique violation code for Postgres
                setStatus('success'); // Treat duplicate as success to not leak info or just be nice
                setMessage("You're already on the list!");
            } else {
                setStatus('error');
                setMessage('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="w-full max-w-md mx-auto relative z-20">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm pr-36"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/20"
                    >
                        {status === 'loading' ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : status === 'success' ? (
                            <>
                                <span>Joined</span>
                                <CheckCircle className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                <span>Notify Me</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Feedback Message */}
            {status !== 'idle' && (
                <div className={`mt-4 flex items-center justify-center gap-2 text-sm font-medium animate-fade-in ${status === 'error' ? 'text-red-400' : 'text-emerald-400'
                    }`}>
                    {status === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    <span>{message}</span>
                </div>
            )}
        </div>
    );
};
