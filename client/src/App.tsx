/**
 * LUNGO DESIGN PHILOSOPHY — Quiet Manifesto
 * A fixed-light, editorial presentation: cream paper, charcoal type, olive signals,
 * asymmetric composition, tactile imagery, and calm interaction.
 */
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";

function App() {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}

export default App;
