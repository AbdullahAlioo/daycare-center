import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If user already logged in, redirect to dashboard
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          navigate('/admin/dashboard', { replace: true });
        }
      });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isSupabaseConfigured || !supabase) {
      setErrorMsg('Supabase is not configured yet. Please add your credentials to the .env file.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data?.session) {
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-icon-bubble">
            <FaShieldAlt />
          </div>
          <h2>Admin Portal</h2>
          <p>Sign in to manage daycare inquiries and admissions</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="admin-setup-alert">
            <strong>⚠️ Configuration Needed:</strong>
            <p>Please connect your Supabase project in <code>.env</code> with <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>.</p>
          </div>
        )}

        {errorMsg && <div className="admin-error-box">{errorMsg}</div>}

        <form className="admin-login-form" onSubmit={handleLogin}>
          <div className="admin-input-group">
            <label htmlFor="email">Email Address</label>
            <div className="admin-input-wrapper">
              <FaEnvelope className="admin-field-icon" />
              <input
                id="email"
                type="email"
                required
                placeholder="admin@daycare.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label htmlFor="password">Password</label>
            <div className="admin-input-wrapper">
              <FaLock className="admin-field-icon" />
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
