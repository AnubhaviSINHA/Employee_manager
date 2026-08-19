import React from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, Download, FileText, CheckCircle, ShieldCheck } from 'lucide-react';

export default function ReportsView() {
  const handleExportCsv = () => {
    window.open('/api/reports/employees/csv', '_blank');
  };

  const handleExportExcel = () => {
    window.open('/api/reports/employees/excel', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 rounded-3xl">
        <h2 className="text-xl font-bold text-white tracking-tight">Corporate Reports & Data Exporting</h2>
        <p className="text-slate-400 text-xs mt-0.5">Export full organization employee and departmental dataset records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Excel Export Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-950/40 to-slate-950/60"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
            <FileSpreadsheet className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-white">Formatted Excel Report (.XLSX)</h3>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            Includes formatted dark-blue header rows, auto-sized columns, active statuses, full employee contact info, and salaries.
          </p>

          <div className="mt-6">
            <button
              onClick={handleExportExcel}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Excel Report</span>
            </button>
          </div>
        </motion.div>

        {/* CSV Export Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/20 via-slate-950/40 to-slate-950/60"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
            <FileText className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-white">Standard CSV Export (.CSV)</h3>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            Lightweight comma-separated format compatible with all data integration tools, databases, and reporting systems.
          </p>

          <div className="mt-6">
            <button
              onClick={handleExportCsv}
              className="w-full py-3 px-4 rounded-xl glow-button text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download CSV Dataset</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
