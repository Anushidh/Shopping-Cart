import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mb-6" />
          <h1 className="text-2xl font-light uppercase tracking-[0.2em] mb-4">Something went wrong</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs mb-8">
            An unexpected application error occurred.
          </p>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="btn btn-primary"
          >
            RETURN HOME
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
