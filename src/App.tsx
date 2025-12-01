
import { Background } from './components/Background';
import { EmailForm } from './components/EmailForm';
import { motion } from 'framer-motion';

function App() {
    return (
        <div className="min-h-screen relative flex flex-col font-sans selection:bg-emerald-500/30">
            <Background />

            <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="w-full max-w-4xl mx-auto text-center space-y-12">

                    {/* Logo Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <div className="inline-block">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2">
                                COINVESTO<span className="text-emerald-500">PEDIA</span>
                            </h1>
                            <div className="h-1 w-1/3 bg-emerald-500 mx-auto rounded-full" />
                        </div>

                        <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                            Where Crypto Meets Wall Street
                        </p>
                    </motion.div>

                    {/* Value Prop */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="max-w-2xl mx-auto"
                    >
                        <p className="text-lg text-gray-400 leading-relaxed">
                            The smartest way to understand crypto investing. <br />
                            <span className="text-white font-semibold">Coming Soon</span>
                        </p>
                    </motion.div>

                    {/* Email Capture */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        <EmailForm />
                    </motion.div>

                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-8 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Coinvestopedia. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
