import React, { useState, useEffect } from 'react';  
import './Setting.css';
import Header from '../header';   
import Footer from '../Footer';

function Setting() {
  // State for different settings sections
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'Payroll Management System',
    companyEmail: 'admin@payrollsystem.com',
    companyPhone: '+1-555-0123',
    companyAddress: '123 Business Street, City, State 12345',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    language: 'en'
  });

  // Email Configuration State
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'your-email@gmail.com',
    smtpPassword: '',
    smtpSecurity: 'TLS',
    fromEmail: 'noreply@payrollsystem.com',
    fromName: 'Payroll System',
    testEmail: '',
    enableNotifications: true,
    enableWelcomeEmails: true,
    enablePayrollNotifications: true,
    enableExpenseApprovalEmails: true
  });

  // Master Data State
  const [masterData, setMasterData] = useState({
    departments: [
      { id: 1, name: 'Human Resources', code: 'HR', active: true },
      { id: 2, name: 'Information Technology', code: 'IT', active: true },
      { id: 3, name: 'Sales', code: 'SALES', active: true },
      { id: 4, name: 'Marketing', code: 'MKT', active: true },
      { id: 5, name: 'Finance', code: 'FIN', active: true },
      { id: 6, name: 'Operations', code: 'OPS', active: true }
    ],
    designations: [
      { id: 1, name: 'Manager', level: 'Senior', active: true },
      { id: 2, name: 'Senior Developer', level: 'Senior', active: true },
      { id: 3, name: 'Developer', level: 'Mid', active: true },
      { id: 4, name: 'Junior Developer', level: 'Junior', active: true },
      { id: 5, name: 'Team Lead', level: 'Senior', active: true },
      { id: 6, name: 'Business Analyst', level: 'Mid', active: true }
    ],
    expenseCategories: [
      { id: 1, name: 'Transportation', limit: 500, requiresApproval: true, active: true },
      { id: 2, name: 'Meals', limit: 200, requiresApproval: false, active: true },
      { id: 3, name: 'Office Supplies', limit: 100, requiresApproval: false, active: true },
      { id: 4, name: 'Technology', limit: 2000, requiresApproval: true, active: true },
      { id: 5, name: 'Travel', limit: 1500, requiresApproval: true, active: true },
      { id: 6, name: 'Training', limit: 1000, requiresApproval: true, active: true }
    ]
  });

  // System Configuration State
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordExpiryDays: 90,
    requireTwoFactor: false,
    backupFrequency: 'daily',
    logLevel: 'info',
    maxFileUploadSize: 10
  });

  // Handle input changes for different setting sections
  const handleGeneralChange = (field, value) => {
    setGeneralSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmailChange = (field, value) => {
    setEmailSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSystemChange = (field, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle master data operations
  const addMasterDataItem = (type) => {
    const newItem = {
      id: Date.now(),
      name: '',
      active: true,
      ...(type === 'departments' && { code: '' }),
      ...(type === 'designations' && { level: 'Mid' }),
      ...(type === 'expenseCategories' && { limit: 0, requiresApproval: false })
    };
    
    setMasterData(prev => ({
      ...prev,
      [type]: [...prev[type], newItem]
    }));
  };

  const updateMasterDataItem = (type, id, field, value) => {
    setMasterData(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const deleteMasterDataItem = (type, id) => {
    setMasterData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  // Save settings
  const saveSettings = async (section) => {
    setLoading(true);
    setSaveMessage('');

    // Simulate API call
    setTimeout(() => {
      setSaveMessage(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
      setLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  // Test email configuration
  const testEmailConfig = async () => {
    if (!emailSettings.testEmail) {
      setSaveMessage('Please enter a test email address.');
      return;
    }

    setLoading(true);
    setSaveMessage('Sending test email...');

    // Simulate email test
    setTimeout(() => {
      setSaveMessage(`Test email sent successfully to ${emailSettings.testEmail}!`);
      setLoading(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }, 2000);
  };

  return (
    <div className="settings-management">
      <Header />
      
      {/* Settings Header */}
      <div className="settings-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="page-title">
                <i className="fas fa-cog me-3"></i>
                System Settings
              </h2>
              <p className="page-subtitle">Manage system configuration, email settings, and master data</p>
            </div>
            <div className="col-auto">
              {saveMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="fas fa-check-circle me-2"></i>
                  {saveMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="settings-nav">
        <div className="container-fluid">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                <i className="fas fa-building me-2"></i>
                General Settings
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'email' ? 'active' : ''}`}
                onClick={() => setActiveTab('email')}
              >
                <i className="fas fa-envelope me-2"></i>
                Email Configuration
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'master' ? 'active' : ''}`}
                onClick={() => setActiveTab('master')}
              >
                <i className="fas fa-database me-2"></i>
                Master Data
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'system' ? 'active' : ''}`}
                onClick={() => setActiveTab('system')}
              >
                <i className="fas fa-server me-2"></i>
                System Configuration
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        <div className="container-fluid">
          
          {/* General Settings Tab */}
          {activeTab === 'general' && (
            <div className="settings-section">
              <div className="section-header">
                <h4><i className="fas fa-building me-2"></i>Company Information</h4>
                <p>Configure basic company details and regional settings</p>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={generalSettings.companyName}
                      onChange={(e) => handleGeneralChange('companyName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Company Email</label>
                    <input 
                      type="email" 
                      className="form-control"
                      value={generalSettings.companyEmail}
                      onChange={(e) => handleGeneralChange('companyEmail', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control"
                      value={generalSettings.companyPhone}
                      onChange={(e) => handleGeneralChange('companyPhone', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Timezone</label>
                    <select 
                      className="form-select"
                      value={generalSettings.timezone}
                      onChange={(e) => handleGeneralChange('timezone', e.target.value)}
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Company Address</label>
                <textarea 
                  className="form-control"
                  rows="3"
                  value={generalSettings.companyAddress}
                  onChange={(e) => handleGeneralChange('companyAddress', e.target.value)}
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label">Date Format</label>
                    <select 
                      className="form-select"
                      value={generalSettings.dateFormat}
                      onChange={(e) => handleGeneralChange('dateFormat', e.target.value)}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label">Currency</label>
                    <select 
                      className="form-select"
                      value={generalSettings.currency}
                      onChange={(e) => handleGeneralChange('currency', e.target.value)}
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label">Language</label>
                    <select 
                      className="form-select"
                      value={generalSettings.language}
                      onChange={(e) => handleGeneralChange('language', e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => saveSettings('general')}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Save General Settings
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Email Configuration Tab */}
          {activeTab === 'email' && (
            <div className="settings-section">
              <div className="section-header">
                <h4><i className="fas fa-envelope me-2"></i>Email Configuration</h4>
                <p>Configure SMTP settings and email notification preferences</p>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">SMTP Host</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={emailSettings.smtpHost}
                      onChange={(e) => handleEmailChange('smtpHost', e.target.value)}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="form-label">SMTP Port</label>
                    <input 
                      type="number" 
                      className="form-control"
                      value={emailSettings.smtpPort}
                      onChange={(e) => handleEmailChange('smtpPort', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="form-label">Security</label>
                    <select 
                      className="form-select"
                      value={emailSettings.smtpSecurity}
                      onChange={(e) => handleEmailChange('smtpSecurity', e.target.value)}
                    >
                      <option value="TLS">TLS</option>
                      <option value="SSL">SSL</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">SMTP Username</label>
                    <input 
                      type="email" 
                      className="form-control"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => handleEmailChange('smtpUsername', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">SMTP Password</label>
                    <input 
                      type="password" 
                      className="form-control"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => handleEmailChange('smtpPassword', e.target.value)}
                      placeholder="Enter SMTP password"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">From Email Address</label>
                    <input 
                      type="email" 
                      className="form-control"
                      value={emailSettings.fromEmail}
                      onChange={(e) => handleEmailChange('fromEmail', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">From Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={emailSettings.fromName}
                      onChange={(e) => handleEmailChange('fromName', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Email Notification Settings */}
              <div className="notification-settings">
                <h5><i className="fas fa-bell me-2"></i>Email Notifications</h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={emailSettings.enableNotifications}
                        onChange={(e) => handleEmailChange('enableNotifications', e.target.checked)}
                      />
                      <label className="form-check-label">
                        Enable Email Notifications
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={emailSettings.enableWelcomeEmails}
                        onChange={(e) => handleEmailChange('enableWelcomeEmails', e.target.checked)}
                      />
                      <label className="form-check-label">
                        Send Welcome Emails
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={emailSettings.enablePayrollNotifications}
                        onChange={(e) => handleEmailChange('enablePayrollNotifications', e.target.checked)}
                      />
                      <label className="form-check-label">
                        Payroll Notifications
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={emailSettings.enableExpenseApprovalEmails}
                        onChange={(e) => handleEmailChange('enableExpenseApprovalEmails', e.target.checked)}
                      />
                      <label className="form-check-label">
                        Expense Approval Emails
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Test Section */}
              <div className="email-test-section">
                <h5><i className="fas fa-paper-plane me-2"></i>Test Email Configuration</h5>
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label className="form-label">Test Email Address</label>
                      <input 
                        type="email" 
                        className="form-control"
                        value={emailSettings.testEmail}
                        onChange={(e) => handleEmailChange('testEmail', e.target.value)}
                        placeholder="Enter email to test configuration"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">&nbsp;</label>
                    <button 
                      className="btn btn-info w-100"
                      onClick={testEmailConfig}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Send Test Email
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => saveSettings('email')}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Save Email Settings
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Master Data Tab */}
          {activeTab === 'master' && (
            <div className="settings-section">
              <div className="section-header">
                <h4><i className="fas fa-database me-2"></i>Master Data Management</h4>
                <p>Manage departments, designations, and expense categories</p>
              </div>

              {/* Departments Section */}
              <div className="master-data-section">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5><i className="fas fa-building me-2"></i>Departments</h5>
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => addMasterDataItem('departments')}
                  >
                    <i className="fas fa-plus me-2"></i>Add Department
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Department Name</th>
                        <th>Code</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {masterData.departments.map((dept) => (
                        <tr key={dept.id}>
                          <td>
                            <input 
                              type="text" 
                              className="form-control form-control-sm"
                              value={dept.name}
                              onChange={(e) => updateMasterDataItem('departments', dept.id, 'name', e.target.value)}
                            />
                          </td>
                          <td>
                            <input 
                              type="text" 
                              className="form-control form-control-sm"
                              value={dept.code}
                              onChange={(e) => updateMasterDataItem('departments', dept.id, 'code', e.target.value)}
                            />
                          </td>
                          <td>
                            <div className="form-check form-switch">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                checked={dept.active}
                                onChange={(e) => updateMasterDataItem('departments', dept.id, 'active', e.target.checked)}
                              />
                            </div>
                          </td>
                          <td>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteMasterDataItem('departments', dept.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Designations Section */}
              <div className="master-data-section">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5><i className="fas fa-user-tie me-2"></i>Designations</h5>
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => addMasterDataItem('designations')}
                  >
                    <i className="fas fa-plus me-2"></i>Add Designation
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Designation Name</th>
                        <th>Level</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {masterData.designations.map((designation) => (
                        <tr key={designation.id}>
                          <td>
                            <input 
                              type="text" 
                              className="form-control form-control-sm"
                              value={designation.name}
                              onChange={(e) => updateMasterDataItem('designations', designation.id, 'name', e.target.value)}
                            />
                          </td>
                          <td>
                            <select 
                              className="form-select form-select-sm"
                              value={designation.level}
                              onChange={(e) => updateMasterDataItem('designations', designation.id, 'level', e.target.value)}
                            >
                              <option value="Junior">Junior</option>
                              <option value="Mid">Mid</option>
                              <option value="Senior">Senior</option>
                              <option value="Lead">Lead</option>
                            </select>
                          </td>
                          <td>
                            <div className="form-check form-switch">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                checked={designation.active}
                                onChange={(e) => updateMasterDataItem('designations', designation.id, 'active', e.target.checked)}
                              />
                            </div>
                          </td>
                          <td>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteMasterDataItem('designations', designation.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Expense Categories Section */}
              <div className="master-data-section">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5><i className="fas fa-receipt me-2"></i>Expense Categories</h5>
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => addMasterDataItem('expenseCategories')}
                  >
                    <i className="fas fa-plus me-2"></i>Add Category
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Category Name</th>
                        <th>Limit ($)</th>
                        <th>Requires Approval</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {masterData.expenseCategories.map((category) => (
                        <tr key={category.id}>
                          <td>
                            <input 
                              type="text" 
                              className="form-control form-control-sm"
                              value={category.name}
                              onChange={(e) => updateMasterDataItem('expenseCategories', category.id, 'name', e.target.value)}
                            />
                          </td>
                          <td>
                            <input 
                              type="number" 
                              className="form-control form-control-sm"
                              value={category.limit}
                              onChange={(e) => updateMasterDataItem('expenseCategories', category.id, 'limit', parseFloat(e.target.value))}
                            />
                          </td>
                          <td>
                            <div className="form-check form-switch">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                checked={category.requiresApproval}
                                onChange={(e) => updateMasterDataItem('expenseCategories', category.id, 'requiresApproval', e.target.checked)}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-switch">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                checked={category.active}
                                onChange={(e) => updateMasterDataItem('expenseCategories', category.id, 'active', e.target.checked)}
                              />
                            </div>
                          </td>
                          <td>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteMasterDataItem('expenseCategories', category.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="settings-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => saveSettings('master data')}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Save Master Data
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* System Configuration Tab */}
          {activeTab === 'system' && (
            <div className="settings-section">
              <div className="section-header">
                <h4><i className="fas fa-server me-2"></i>System Configuration</h4>
                <p>Configure system security, performance, and operational settings</p>
              </div>

              {/* Security Settings */}
              <div className="config-group">
                <h5><i className="fas fa-shield-alt me-2"></i>Security Settings</h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Session Timeout (minutes)</label>
                      <input 
                        type="number" 
                        className="form-control"
                        value={systemSettings.sessionTimeout}
                        onChange={(e) => handleSystemChange('sessionTimeout', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Max Login Attempts</label>
                      <input 
                        type="number" 
                        className="form-control"
                        value={systemSettings.maxLoginAttempts}
                        onChange={(e) => handleSystemChange('maxLoginAttempts', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Password Expiry (days)</label>
                      <input 
                        type="number" 
                        className="form-control"
                        value={systemSettings.passwordExpiryDays}
                        onChange={(e) => handleSystemChange('passwordExpiryDays', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Max File Upload Size (MB)</label>
                      <input 
                        type="number" 
                        className="form-control"
                        value={systemSettings.maxFileUploadSize}
                        onChange={(e) => handleSystemChange('maxFileUploadSize', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={systemSettings.requireTwoFactor}
                        onChange={(e) => handleSystemChange('requireTwoFactor', e.target.checked)}
                      />
                      <label className="form-check-label">
                        Require Two-Factor Authentication
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={systemSettings.allowRegistration}
                        onChange={(e) => handleSystemChange('allowRegistration', e.target.checked)}
                      />
                      <label className="form-check-label">
                        Allow User Registration
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Operations */}
              <div className="config-group">
                <h5><i className="fas fa-cogs me-2"></i>System Operations</h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Backup Frequency</label>
                      <select 
                        className="form-select"
                        value={systemSettings.backupFrequency}
                        onChange={(e) => handleSystemChange('backupFrequency', e.target.value)}
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Log Level</label>
                      <select 
                        className="form-select"
                        value={systemSettings.logLevel}
                        onChange={(e) => handleSystemChange('logLevel', e.target.value)}
                      >
                        <option value="error">Error Only</option>
                        <option value="warn">Warning</option>
                        <option value="info">Information</option>
                        <option value="debug">Debug</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={systemSettings.maintenanceMode}
                        onChange={(e) => handleSystemChange('maintenanceMode', e.target.checked)}
                      />
                      <label className="form-check-label">
                        <span className="text-warning">
                          <i className="fas fa-exclamation-triangle me-2"></i>
                          Maintenance Mode
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Information */}
              <div className="config-group">
                <h5><i className="fas fa-info-circle me-2"></i>System Information</h5>
                <div className="row">
                  <div className="col-md-3">
                    <div className="info-card">
                      <div className="info-value">v2.1.0</div>
                      <div className="info-label">System Version</div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="info-card">
                      <div className="info-value">React 18.3.1</div>
                      <div className="info-label">Framework</div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="info-card">
                      <div className="info-value">99.9%</div>
                      <div className="info-label">Uptime</div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="info-card">
                      <div className="info-value">Aug 4, 2025</div>
                      <div className="info-label">Last Updated</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => saveSettings('system')}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Save System Settings
                    </>
                  )}
                </button>
                <button className="btn btn-warning ms-2">
                  <i className="fas fa-download me-2"></i>
                  Export Configuration
                </button>
                <button className="btn btn-info ms-2">
                  <i className="fas fa-sync me-2"></i>
                  Clear Cache
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Setting; 