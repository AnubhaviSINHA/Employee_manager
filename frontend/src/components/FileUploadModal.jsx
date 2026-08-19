import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, UploadCloud, Image, FileText, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function FileUploadModal({ isOpen, onClose, employee, onUploadSuccess }) {
  const [fileType, setFileType] = useState('photo'); // 'photo' or 'resume'
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !employee) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccessMsg('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    const endpoint = fileType === 'photo'
      ? `/api/employees/${employee.id}/upload-photo`
      : `/api/employees/${employee.id}/upload-resume`;

    try {
      await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccessMsg(`Successfully uploaded ${fileType === 'photo' ? 'profile picture' : 'resume'}!`);
      setTimeout(() => {
        onUploadSuccess();
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'File upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-panel w-full max-w-md rounded-3xl p-6 relative border border-purple-500/30 glow-purple"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-white mb-1">Upload Documents</h3>
        <p className="text-xs text-slate-400 mb-5">Employee: <span className="text-purple-300 font-semibold">{employee.firstName} {employee.lastName}</span></p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          {/* File Type Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-purple-950/40 border border-purple-500/20">
            <button
              type="button"
              onClick={() => { setFileType('photo'); setSelectedFile(null); }}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                fileType === 'photo' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Image className="w-4 h-4" /> Profile Photo
            </button>
            <button
              type="button"
              onClick={() => { setFileType('resume'); setSelectedFile(null); }}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                fileType === 'resume' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" /> PDF Resume
            </button>
          </div>

          {/* Drag & Drop Area */}
          <div className="border-2 border-dashed border-purple-500/30 hover:border-purple-400/60 rounded-2xl p-6 text-center bg-purple-950/20 transition-all cursor-pointer relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept={fileType === 'photo' ? 'image/*' : '.pdf,.doc,.docx'}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <UploadCloud className="w-10 h-10 text-purple-400 mx-auto mb-2 animate-bounce" />
            {selectedFile ? (
              <div>
                <p className="text-xs font-bold text-white truncate max-w-xs mx-auto">{selectedFile.name}</p>
                <span className="text-[10px] text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB</span>
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold text-slate-200">Click or drag file to upload</p>
                <p className="text-[10px] text-slate-400 mt-1">
                  {fileType === 'photo' ? 'PNG, JPG, JPEG up to 5MB' : 'PDF, DOCX up to 5MB'}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-medium hover:bg-slate-800 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="glow-button px-5 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
