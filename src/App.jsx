import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FloatingNav from './components/FloatingNav';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import CoaLearningPage from './pages/CoaLearningPage';
import NumberConverterPage from './pages/NumberConverterPage';
import SetAssociativePage from './pages/SetAssociativePage';
import ZeroWaySetPage from './pages/ZeroWaySetPage';
import OneWaySetPage from './pages/OneWaySetPage';
import TwoWaySetPage from './pages/TwoWaySetPage';
import ThreeWaySetPage from './pages/ThreeWaySetPage';
import Assignment1Page from './pages/Assignment1Page';
import GalleryPage from './pages/GalleryPage';
import GitHubProjectsPage from './pages/GitHubProjectsPage';

export default function App() {
  return (
    <>
      <FloatingNav />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutMePage />} />
          
          {/* COA Learning Routes */}
          <Route path="/coa-learning" element={<CoaLearningPage />} />
          <Route path="/coa-learning/number-converter" element={<NumberConverterPage />} />
          <Route path="/coa-learning/set-associative" element={<SetAssociativePage />} />
          <Route path="/coa-learning/set-associative/0-way" element={<ZeroWaySetPage />} />
          <Route path="/coa-learning/set-associative/1-way" element={<OneWaySetPage />} />
          <Route path="/coa-learning/set-associative/2-way" element={<TwoWaySetPage />} />
          <Route path="/coa-learning/set-associative/3-way" element={<ThreeWaySetPage />} />

          {/* Academic & Portfolio Routes */}
          <Route path="/assignment-1" element={<Assignment1Page />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/github" element={<GitHubProjectsPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
