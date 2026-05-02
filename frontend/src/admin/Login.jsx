import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from './AuthContext';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@epsilon-edu.in');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-deep text-cream relative overflow-hidden">
      <div className="absolute inset-0 starfield opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full glow-gold" />
      <div className="relative w-full max-w-md px-6">
        <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] text-center mb-3">Epsilon</p>
        <h1 className="font-display text-cream text-[2.5rem] leading-tight text-center">Admin Login</h1>
        <p className="font-editorial italic text-gold text-center mt-2">Content management</p>

        <form onSubmit={onSubmit} className="mt-10 space-y-5 bg-navy/60 border border-gold/20 p-8">
          <div>
            <label className="font-caps text-[0.65rem] text-cream/70 tracking-[0.22em] mb-2 block">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                   className="w-full bg-transparent border border-gold/30 text-cream px-4 py-3 outline-none focus:border-gold" />
          </div>
          <div>
            <label className="font-caps text-[0.65rem] text-cream/70 tracking-[0.22em] mb-2 block">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                   className="w-full bg-transparent border border-gold/30 text-cream px-4 py-3 outline-none focus:border-gold" />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
            <LogIn size={16} /> {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
