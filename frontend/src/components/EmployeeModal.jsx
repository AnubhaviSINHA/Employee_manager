import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';
import axios from 'axios';

export default function EmployeeModal({ isOpen, onClose, employeeToEdit, onSaveSuccess, departments }) {
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    departmentId: '',
    designation: '',
    salary: '',
    dateOfJoining: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    gender: 'Male',
    dateOfBirth: '',
    emergencyContact: '',
    bloodGroup: 'O+',
    skills: '',
    yearsOfExperience: 0,
    employmentStatus: 'ACTIVE'
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        ...employeeToEdit,
        departmentId: employeeToEdit.departmentId || (departments[0]?.id || ''),
        salary: employeeToEdit.salary || '',
        dateOfJoining: employeeToEdit.dateOfJoining || '',
        dateOfBirth: employeeToEdit.dateOfBirth || '',
        yearsOfExperience: employeeToEdit.yearsOfExperience || 0
      });
    } else {
      setFormData({
        employeeId: 'EMP-' + Math.floor(1000 + Math.random() * 9000),
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        departmentId: departments[0]?.id || '',
        designation: 'Software Engineer',
        salary: 75000,
        dateOfJoining: new Date().toISOString().split('T')[0],
        address: '',
        city: '',
        state: '',
        country: 'USA',
        postalCode: '',
        gender: 'Male',
        dateOfBirth: '1995-01-01',
        emergencyContact: '',
        bloodGroup: 'O+',
        skills: 'Java, React, SQL',
        yearsOfExperience: 3,
        employmentStatus: 'ACTIVE'
      });
    }
  }, [employeeToEdit, departments, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...formData,
      departmentId: Number(formData.departmentId || (departments[0]?.id || ''))
    };

    try {
      if (employeeToEdit) {
        await axios.put(`/api/employees/${employeeToEdit.id}`, payload);
      } else {
        await axios.post('/api/employees', payload);
      }
      onSaveSuccess();
      onClose();
    } catch (err) {
      const errData = err.response?.data;
      if (errData?.validationErrors) {
        const firstErr = Object.values(errData.validationErrors)[0];
        setError(firstErr);
      } else {
        setError(errData?.message || 'Failed to save employee. Check inputs.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-panel w-full max-w-2xl rounded-3xl p-6 relative my-8 border border-purple-500/30 glow-purple"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-1">
          {employeeToEdit ? 'Edit Employee Details' : 'Create New Employee'}
        </h3>
        <p className="text-xs text-slate-400 mb-6">Enter official corporate profile information</p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Employee ID */}
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">Emp ID</label>
              <input
                type="text"
                required
                disabled={!!employeeToEdit}
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">Department</label>
              <select
                required
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white bg-[#090514]"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id} className="bg-[#090514] text-white">{d.name}</option>
                ))}
              </select>
            </div>

            {/* First Name */}
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">Mobile (10 Digits)</label>
              <input
                type="text"
                required
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">Designation</label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">Salary (₹)</label>
              <input
                type="number"
                required
                min="0"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
              />
            </div>

            {/* Date of Joining */}
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">Date of Joining</label>
              <input
                type="date"
                required
                value={formData.dateOfJoining}
                onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">Skills (Comma separated)</label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-purple-500/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-medium hover:bg-slate-800 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="glow-button px-5 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Employee'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
