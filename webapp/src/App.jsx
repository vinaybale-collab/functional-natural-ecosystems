import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/shared/ErrorBoundary';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import LandscapeDetailPage from './pages/LandscapeDetailPage';
import ComparisonPage from './pages/ComparisonPage';
import MethodologyPage from './pages/MethodologyPage';
import DatasetsPage from './pages/DatasetsPage';

function App() {
  const Router = window.location.hostname.includes('github.io') ? HashRouter : BrowserRouter;

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<DashboardPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/datasets" element={<DatasetsPage />} />
          <Route path="/landscape/:id" element={<LandscapeDetailPage />} />
          <Route path="/compare/:id1/:id2" element={<ComparisonPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
