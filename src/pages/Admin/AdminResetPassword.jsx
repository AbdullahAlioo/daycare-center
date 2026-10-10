import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaKey } from 'react-icons/fa';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import './AdminLogin.css';

const MIN_PASSWORD_LENGTH = 8;

/**
 * Sets a new admin password. Reached either from the password-reset email
 * (Supabase signs the admin in from the link) or from "Change Password"
 * in the dashboard while already signed in.
 */
const AdminResetPassword = () => {
  const [status, setStatus] = useState(isSupabaseConfigured ? 'checking' : 'invalid'); // 'checking' | 'ready' | 'invalid' | 'done'
  const [linkError] = useState(() => new URLSearchParams(window.location.hash.slice(1)).get('error_description'));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setStatus(prev => (prev === 'checking' ? (session ? 'ready' : 'invalid') : prev));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setStatus(prev => (prev === 'done' ? prev : 'ready'));
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrorMsg(`Please use at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('The two passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setStatus('done');
    } catch (err) {
      setErrorMsg(err.message || 'Could not update the password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-icon-bubble">
            <FaKey />
          </div>
          <h2>Set New Password</h2>
          <p>Choose a new password for your admin account</p>
        </div>

        {status === 'checking' && <p className="admin-muted-text">Checking your reset link...</p>}

        {status === 'invalid' && (
          <>
            <div className="admin-error-box">
              {linkError || 'This reset link is invalid or has expired.'} Please request a new link from the sign-in page.
            </div>
            <Link to="/admin/login" className="admin-login-btn admin-login-btn--link">Back to sign in</Link>
          </>
        )}

        {status === 'done' && (
          <>
            <div className="admin-success-box">Your password has been updated.</div>
            <button type="button" className="admin-login-btn" onClick={() => navigate('/admin/dashboard', { replace: true })}>
              Go to Dashboard
            </button>
          </>
        )}

        {status === 'ready' && (
          <>
            {errorMsg && <div className="admin-error-box">{errorMsg}</div>}

            <form className="admin-login-form" onSubmit={handleSubmit}>
              <div className="admin-input-group">
                <label htmlFor="new-password">New Password</label>
                <div className="admin-input-wrapper">
                  <FaLock className="admin-field-icon" />
                  <input
                    id="new-password"
                    type="password"
                    required
                    autoComplete="new-password"
                    placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-input-group">
                <label htmlFor="confirm-password">Confirm New Password</label>
                <div className="admin-input-wrapper">
                  <FaLock className="admin-field-icon" />
                  <input
                    id="confirm-password"
                    type="password"
                    required
                    autoComplete="new-password"
                    placeholder="Type it again"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="admin-login-btn" disabled={loading}>
                {loading ? 'Saving...' : 'Save New Password'}
              </button>

              <Link to="/admin/dashboard" className="admin-link-btn">Cancel</Link>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminResetPassword;
