import { useState, FormEvent } from 'react'
import { supabase } from '../lib/supabase'

// Helper to get URL parameters
const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search)
    return {
        gclid: params.get('gclid') || undefined,
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
    }
}

export function EmailForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        // Validation
        if (!email || !validateEmail(email)) {
            setStatus('error')
            setErrorMessage('Please enter a valid email address')
            return
        }

        setStatus('loading')
        setErrorMessage('')

        try {
            // Get tracking parameters
            const trackingParams = getUrlParams()

            // Insert into Supabase
            const { error } = await supabase
                .from('subscribers')
                .insert({
                    email: email.toLowerCase().trim(),
                    source: 'coming_soon_page',
                    ...trackingParams
                })

            if (error) {
                // Handle duplicate email error gracefully
                if (error.code === '23505') {
                    setStatus('success') // Still show success (user is already subscribed)
                } else {
                    throw error
                }
            } else {
                setStatus('success')
                    // Track successful form submission
                    ; (window as any).dataLayer = (window as any).dataLayer || []
                    ; (window as any).dataLayer.push({
                        'event': 'form_success'
                    })
            }

            // Clear form
            setEmail('')

            // Optional: Track conversion event
            if (window.gtag && trackingParams.gclid) {
                window.gtag('event', 'conversion', {
                    'send_to': 'AW-XXXXXXXXX/XXXXXX', // Replace with your Google Ads conversion ID
                    'transaction_id': trackingParams.gclid
                })
            }

        } catch (error: any) {
            console.error('Subscription error:', error)
            setStatus('error')
            setErrorMessage('Something went wrong. Please try again.')
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        disabled={status === 'loading' || status === 'success'}
                        className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                    >
                        {status === 'loading' ? 'Joining...' : status === 'success' ? '✓ Joined!' : 'Notify Me'}
                    </button>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                    <p className="text-emerald-400 text-sm text-center animate-fade-in">
                        🎉 Success! You'll be the first to know when we launch.
                    </p>
                )}

                {status === 'error' && errorMessage && (
                    <p className="text-red-400 text-sm text-center animate-fade-in">
                        {errorMessage}
                    </p>
                )}
            </form>

            {/* Social Proof (Optional) */}
            <p className="mt-4 text-white/50 text-xs text-center">
                Join the waitlist • No spam, ever
            </p>
        </div>
    )
}
