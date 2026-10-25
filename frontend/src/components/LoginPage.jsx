import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate login / basic auth validation against Spring Boot endpoints
    setTimeout(() => {
      if ((username === 'admin' || username === 'manager' || username === 'employee') && password) {
        const userRole = username === 'admin' ? 'ADMIN' : username === 'manager' ? 'MANAGER' : 'EMPLOYEE';
        onLoginSuccess({
          username,
          password,
          role: userRole,
          name: username === 'admin' ? 'Admin User' : username === 'manager' ? 'Manager' : 'Employee',
          email: `${username}@ems.com`
        });
      } else {
        setError('Invalid username or password. Use demo credentials below.');
      }
      setLoading(false);
    }, 600);
  };

  const handleQuickLogin = (user, pass) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#070314]">
      {/* Dynamic Glowing Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Main Glass Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md mx-4 relative z-10"
      >
        <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden glow-purple border border-purple-500/20">
          
          {/* Subtle Top Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white mb-4 shadow-lg shadow-purple-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Enterprise EMS</h2>
            <p className="text-slate-400 text-sm mt-1">Sign in to access your management dashboard</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Username</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl glow-button text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In to EMS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Quick Login Options */}
          <div className="mt-8 pt-6 border-t border-purple-500/10 text-center">
            <p className="text-xs text-slate-400 mb-3 font-medium">Quick Login Demo Accounts:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin', 'admin123')}
                className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" /> Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('manager', 'manager123')}
                className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" /> Manager
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('employee', 'employee123')}
                className="px-3 py-1.5 rounded-lg bg-slate-500/10 hover:bg-slate-500/20 border border-slate-500/20 text-slate-300 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" /> Employee
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
