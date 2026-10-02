/**
 * App.jsx — Root component
 * Sets up React Router with all pages and shared layout
 * (Navbar, Footer, WhatsApp float button).
 */

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Layout
import Navbar          from './components/layout/Navbar/Navbar';
import Footer          from './components/layout/Footer/Footer';
import WhatsAppButton  from './components/common/WhatsAppButton/WhatsAppButton';
import ScrollToTop     from './components/common/ScrollToTop';

// Pages
import Home       from './pages/Home/Home';
import About      from './pages/About/About';
import Programs   from './pages/Programs/Programs';
import Activities from './pages/Activities/Activities';
import Facilities from './pages/Facilities/Facilities';
import Gallery    from './pages/Gallery/Gallery';
import Admissions from './pages/Admissions/Admissions';
import FAQ        from './pages/FAQ/FAQ';
import Contact    from './pages/Contact/Contact';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from './pages/Admin/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />

      {/* Sticky top navigation (hidden on admin pages) */}
      {!isAdminRoute && <Navbar />}

      {/* Page content */}
      <main>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/about"      element={<About />} />
          <Route path="/programs"   element={<Programs />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/gallery"    element={<Gallery />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/enroll"     element={<Admissions />} />
          <Route path="/faq"        element={<FAQ />} />
          <Route path="/contact"    element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Catch-all route to prevent broken/unmatched URLs from crashing or showing blank page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Persistent footer (hidden on admin pages) */}
      {!isAdminRoute && <Footer />}

      {/* Floating WhatsApp button (hidden on admin pages) */}
      {!isAdminRoute && <WhatsAppButton />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
