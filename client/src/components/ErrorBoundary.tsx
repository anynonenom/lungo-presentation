/**
 * LUNGO DESIGN PHILOSOPHY — Quiet Manifesto
 * Even the error state remains simple, calm, and easy to understand.
 */
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-state">
          <div className="error-card">
            <AlertTriangle size={36} />
            <h2>The presentation needs a quick refresh.</h2>
            <p>
              Something did not load as expected. Reload the page and it should be ready again.
            </p>
            <button
              onClick={() => window.location.reload()}
            >
              <RotateCcw size={15} />
              Reload presentation
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
