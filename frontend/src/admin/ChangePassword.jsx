import React, { useState } from 'react';
import { api } from './api';
import { CheckCircle2 } from 'lucide-react';

export default function ChangePassword() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); setErr('');
    if (form.next !== form.confirm) { setErr('New passwords do not match'); return; }
    try {
      await api.changePassword(form.current, form.next);
      setMsg('Password updated.');
      setForm({ current: '', next: '', confirm: '' });
    } catch (e) {
      setErr(e?.response?.data?.detail || 'Failed');
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-navy text-[2rem]">Change password</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-5 bg-white p-8 border border-navy/10">
        {['current', 'next', 'confirm'].map((k, i) => (
          <div key={k}>
            <label className="fld-label">{['Current password','New password','Confirm new password'][i]}</label>
            <input type="password" required className="fld-input" value={form[k]}
                   onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
          </div>
        ))}
        {err && <p className="text-red-600 text-sm">{err}</p>}
        {msg && <p className="text-green-700 text-sm inline-flex items-center gap-2"><CheckCircle2 size={16} /> {msg}</p>}
        <button type="submit" className="btn-gold">Update password</button>
      </form>
    </div>
  );
}
