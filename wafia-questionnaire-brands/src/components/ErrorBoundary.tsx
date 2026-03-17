import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (import.meta.env.DEV) {
            console.error('ErrorBoundary caught error:', error, errorInfo);
        }
        this.setState({ errorInfo: errorInfo.componentStack || null });

        // Log to external service if configured
        if (import.meta.env.VITE_ERROR_REPORTING_URL) {
            fetch(import.meta.env.VITE_ERROR_REPORTING_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    error: error.toString(),
                    stack: error.stack,
                    componentStack: errorInfo.componentStack
                })
            }).catch((reportError) => {
                if (import.meta.env.DEV) {
                    console.error(reportError);
                }
            });
        }
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen flex items-center justify-center bg-[#020202] text-white p-6">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{ backgroundImage: 'url("/noise.png")' }} />

                    <div className="relative z-10 text-center space-y-6 max-w-md">
                        <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-10 h-10 text-red-500" />
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">
                                Une erreur est survenue
                            </h1>
                            <p className="text-zinc-400 text-lg">
                                L'application a rencontré un problème inattendu
                            </p>
                        </div>

                        {import.meta.env.DEV && this.state.error && (
                            <details className="text-left bg-white/5 border border-white/10 rounded-xl p-4">
                                <summary className="cursor-pointer text-sm font-mono text-zinc-400 hover:text-white">
                                    Détails techniques (dev only)
                                </summary>
                                <pre className="mt-4 text-xs text-red-400 overflow-auto max-h-48">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo}
                                </pre>
                            </details>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={this.handleReset}
                                className="flex-1 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                Revenir à l'accueil
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/5 transition-colors"
                            >
                                Recharger la page
                            </button>
                        </div>

                        <p className="text-xs text-zinc-600 pt-4">
                            Si le problème persiste, contactez le support technique
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
