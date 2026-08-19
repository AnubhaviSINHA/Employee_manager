import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Calendar, MapPin, Building2, Briefcase, Award, FileText, Heart, ShieldCheck } from 'lucide-react';

export default function EmployeeProfileDrawer({ employee, isOpen, onClose }) {
  if (!isOpen || !employee) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md glass-panel min-h-screen border-l border-purple-500/30 p-6 overflow-y-auto flex flex-col justify-between"
        >
          <div>
            {/* Header Close */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-purple-500/10">
              <span className="text-xs font-mono font-bold text-purple-400">PROFILE OVERVIEW</span>
              <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Avatar Card */}
            <div className="text-center mb-6 p-6 rounded-3xl bg-gradient-to-b from-purple-900/30 to-slate-950/50 border border-purple-500/20">
              <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gradient-to-tr from-purple-600 to-pink-600 p-1 shadow-lg shadow-purple-500/30">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                  {employee.profilePicture ? (
                    <img src={employee.profilePicture} alt="" className="w-full h-full object-cover" />
                  ) : (
                    `${employee.firstName?.charAt(0) || ''}${employee.lastName?.charAt(0) || ''}`
                  )}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">{employee.firstName} {employee.lastName}</h3>
              <p className="text-xs text-purple-300 font-medium">{employee.designation}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-mono">
                {employee.employeeId}
              </span>
            </div>

            {/* Contact & General Details */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/10 space-y-3 text-xs">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{employee.mobile}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{employee.departmentName || 'Unassigned Department'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Joined {employee.dateOfJoining || 'N/A'}</span>
                </div>
              </div>

              {/* Skills Badge List */}
              {employee.skills && (
                <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/10">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2 font-bold">Skills & Expertise</span>
                  <div className="flex flex-wrap gap-1.5">
                    {employee.skills.split(',').map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-medium">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* File Documents & Resume */}
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/10 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold mb-1">Uploaded Attachments</span>
                {employee.resumePath ? (
                  <a
                    href={employee.resumePath}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs hover:bg-purple-500/20 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-400" />
                      <span className="font-medium">Curriculum Vitae (PDF)</span>
                    </div>
                    <span className="text-[10px] font-mono underline">View Document</span>
                  </a>
                ) : (
                  <p className="text-xs text-slate-500 italic">No resume uploaded yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-purple-500/10">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-500/10 transition-all cursor-pointer"
            >
              Close Profile
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
