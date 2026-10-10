import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import './AdminLogin.css';

const AdminLogin = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/admin/dashboard';

  useEffect(() => {
    // If user already logged in, redirect to dashboard
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          navigate(redirectTo, { replace: true });
        }
      });
    }
  }, [navigate, redirectTo]);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setErrorMsg('');
    setSuccessMsg('');
  };

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
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!isSupabaseConfigured || !supabase) {
      setErrorMsg('Supabase is not configured yet. Please add your credentials to the .env file.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) {
        throw error;
      }

      setSuccessMsg('If this email belongs to an admin account, a password reset link is on its way. Please check your inbox and spam folder.');
    } catch (err) {
      setErrorMsg(err.message || 'Could not send the reset email. Please try again later.');
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
          <h2>{mode === 'login' ? 'Admin Portal' : 'Reset Password'}</h2>
          <p>
            {mode === 'login'
              ? 'Sign in to manage daycare inquiries, admissions and reviews'
              : 'Enter your admin email and we will send you a link to set a new password'}
          </p>
        </div>

        {!isSupabaseConfigured && (
          <div className="admin-setup-alert">
            <strong>⚠️ Configuration Needed:</strong>
            <p>Please connect your Supabase project in <code>.env</code> with <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>.</p>
          </div>
        )}

        {errorMsg && <div className="admin-error-box">{errorMsg}</div>}
        {successMsg && <div className="admin-success-box">{successMsg}</div>}

        <form className="admin-login-form" onSubmit={mode === 'login' ? handleLogin : handleForgotPassword}>
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

          {mode === 'login' && (
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
          )}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {mode === 'login'
              ? (loading ? 'Authenticating...' : 'Sign In to Dashboard')
              : (loading ? 'Sending...' : 'Send Reset Link')}
          </button>

          <button
            type="button"
            className="admin-link-btn"
            onClick={() => switchMode(mode === 'login' ? 'forgot' : 'login')}
          >
            {mode === 'login' ? 'Forgot your password?' : 'Back to sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
