import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, UserCheck, UserX, Edit, Eye, Upload, RefreshCw, Trash2, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

export default function EmployeeDirectory({ onOpenAddModal, onEditEmployee, onViewProfile, onUploadFile, userRole }) {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [searchKeyword, selectedDept, selectedStatus, page]);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('/api/departments');
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        size: 8,
        sortBy: 'id',
        sortDir: 'desc'
      };
      if (searchKeyword) params.keyword = searchKeyword;
      if (selectedDept) params.departmentId = selectedDept;
      if (selectedStatus) params.employmentStatus = selectedStatus;

      const res = await axios.get('/api/employees/search/advanced', { params });
      setEmployees(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalElements(res.data.totalElements || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = async (id) => {
    if (!window.confirm('Are you sure you want to deactivate (soft-delete) this employee?')) return;
    try {
      await axios.put(`/api/employees/${id}/soft-delete`);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.put(`/api/employees/${id}/restore`);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    }
  };

  const handlePermanentDelete = async (id) => {
    if (!window.confirm('WARNING: Permanently delete this employee from the database?')) return;
    try {
      await axios.delete(`/api/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls Bar */}
      <div className="glass-panel p-5 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Employee Directory</h2>
            <p className="text-slate-400 text-xs mt-0.5">Manage staff profiles, departmental assignments, and status</p>
          </div>

          {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenAddModal}
              className="glow-button px-4 py-2.5 rounded-xl text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Employee</span>
            </motion.button>
          )}
        </div>

        {/* Filters and Search Input */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => { setSearchKeyword(e.target.value); setPage(0); }}
              placeholder="Search name, email, ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs text-white placeholder-slate-500"
            />
          </div>

          {/* Department Filter */}
          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => { setSelectedDept(e.target.value); setPage(0); }}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white cursor-pointer appearance-none"
            >
              <option value="" className="bg-[#090514]">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id} className="bg-[#090514]">{d.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setPage(0); }}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white cursor-pointer appearance-none"
            >
              <option value="" className="bg-[#090514]">All Statuses</option>
              <option value="ACTIVE" className="bg-[#090514]">Active</option>
              <option value="INACTIVE" className="bg-[#090514]">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* SaaS Table Card */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-purple-500/20 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-purple-950/40 text-slate-300 text-[11px] uppercase tracking-wider border-b border-purple-500/20 font-mono">
                <th className="py-3.5 px-5">Emp ID</th>
                <th className="py-3.5 px-5">Name & Profile</th>
                <th className="py-3.5 px-5">Email & Mobile</th>
                <th className="py-3.5 px-5">Department</th>
                <th className="py-3.5 px-5">Designation</th>
                <th className="py-3.5 px-5">Salary</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10 text-xs">
              {loading ? (
                <tr>
                  <td colspan="8" className="py-12 text-center text-purple-400">
                    <div className="w-6 h-6 border-3 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-2"></div>
                    Loading employee records...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colspan="8" className="py-12 text-center text-slate-400">
                    No matching employee records found.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => {
                  const isActive = emp.employmentStatus !== 'INACTIVE';
                  return (
                    <motion.tr
                      key={emp.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-purple-500/10 transition-colors"
                    >
                      <td className="py-4 px-5 font-mono font-bold text-purple-400">{emp.employeeId}</td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-purple-500/20">
                            {emp.profilePicture ? (
                              <img src={emp.profilePicture} alt="" className="w-full h-full rounded-full object-cover" />
                            ) : (
                              `${emp.firstName?.charAt(0) || ''}${emp.lastName?.charAt(0) || ''}`
                            )}
                          </div>
                          <div>
                            <span className="font-semibold text-white block">{emp.firstName} {emp.lastName}</span>
                            <span className="text-[10px] text-slate-400">Joined {emp.dateOfJoining || 'N/A'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-slate-200 block">{emp.email}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{emp.mobile}</span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium">
                          {emp.departmentName || 'Unassigned'}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-slate-300">{emp.designation}</td>
                      <td className="py-4 px-5 font-bold text-emerald-400 font-mono">
                        ${emp.salary?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
                      </td>
                      <td className="py-4 px-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider inline-flex items-center gap-1 ${
                          isActive ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400' : 'bg-rose-500/15 border border-rose-500/30 text-rose-400'
                        }`}>
                          {isActive ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                          {isActive ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Profile */}
                          <button
                            onClick={() => onViewProfile(emp)}
                            title="View Profile"
                            className="p-1.5 rounded-lg text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Upload Photo/Resume */}
                          <button
                            onClick={() => onUploadFile(emp)}
                            title="Upload Documents"
                            className="p-1.5 rounded-lg text-indigo-300 hover:bg-indigo-500/20 transition-all cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                          </button>

                          {/* Edit (Admin / Manager) */}
                          {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
                            <button
                              onClick={() => onEditEmployee(emp)}
                              title="Edit Details"
                              className="p-1.5 rounded-lg text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}

                          {/* Soft Delete / Restore */}
                          {isActive ? (
                            <button
                              onClick={() => handleSoftDelete(emp.id)}
                              title="Deactivate Employee"
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRestore(emp.id)}
                              title="Reactivate Employee"
                              className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          )}

                          {/* Permanent Delete (Admin Only) */}
                          {userRole === 'ADMIN' && (
                            <button
                              onClick={() => handlePermanentDelete(emp.id)}
                              title="Permanently Delete"
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-600/20 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-purple-950/30 border-t border-purple-500/10 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Showing page {page + 1} of {totalPages} ({totalElements} total records)</span>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="p-1.5 rounded-lg glass-input disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              className="p-1.5 rounded-lg glass-input disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
