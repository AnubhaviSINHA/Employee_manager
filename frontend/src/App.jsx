import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeModal from './components/EmployeeModal';
import EmployeeProfileDrawer from './components/EmployeeProfileDrawer';
import FileUploadModal from './components/FileUploadModal';
import DepartmentView from './components/DepartmentView';
import AuditLogsView from './components/AuditLogsView';
import ReportsView from './components/ReportsView';

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    username: 'admin',
    role: 'ADMIN',
    name: 'Admin User',
    email: 'admin@ems.com'
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [departments, setDepartments] = useState([]);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const [selectedProfileEmp, setSelectedProfileEmp] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [selectedUploadEmp, setSelectedUploadEmp] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Fetch departments on load so they are immediately available everywhere
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('/api/departments');
      setDepartments(res.data || []);
    } catch (err) {
      console.error('Error fetching departments', err);
    }
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  const handleOpenAddModal = () => {
    fetchDepartments(); // refresh list before opening
    setEmployeeToEdit(null);
    setIsAddModalOpen(true);
  };

  const handleEditEmployee = (emp) => {
    fetchDepartments();
    setEmployeeToEdit(emp);
    setIsAddModalOpen(true);
  };

  const handleViewProfile = (emp) => {
    setSelectedProfileEmp(emp);
    setIsProfileOpen(true);
  };

  const handleUploadFile = (emp) => {
    setSelectedUploadEmp(emp);
    setIsUploadOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#080413] text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar currentUser={currentUser} activeTab={activeTab} />

        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && <DashboardView onNavigate={(tab) => setActiveTab(tab)} />}
          {activeTab === 'employees' && (
            <EmployeeDirectory
              onOpenAddModal={handleOpenAddModal}
              onEditEmployee={handleEditEmployee}
              onViewProfile={handleViewProfile}
              onUploadFile={handleUploadFile}
              userRole={currentUser.role}
            />
          )}
          {activeTab === 'departments' && <DepartmentView userRole={currentUser.role} />}
          {activeTab === 'audit-logs' && <AuditLogsView />}
          {activeTab === 'reports' && <ReportsView />}
        </main>
      </div>

      {/* Modals & Drawers */}
      <EmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        employeeToEdit={employeeToEdit}
        onSaveSuccess={fetchDepartments}
        departments={departments}
      />

      <EmployeeProfileDrawer
        employee={selectedProfileEmp}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <FileUploadModal
        employee={selectedUploadEmp}
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={() => {}}
      />
    </div>
  );
}
