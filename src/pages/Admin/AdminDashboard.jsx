import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSignOutAlt, 
  FaSync, 
  FaDownload, 
  FaSearch, 
  FaEnvelope, 
  FaUserGraduate, 
  FaClock, 
  FaTrash, 
  FaPhone, 
  FaCalendarAlt, 
  FaChild,
  FaCheckCircle
} from 'react-icons/fa';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'admissions'
  const [inquiries, setInquiries] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [actionLoading, setActionLoading] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  // Fetch current user and data
  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || '');
      }

      // Fetch Inquiries
      const { data: inqData, error: inqError } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (inqError) throw inqError;
      setInquiries(inqData || []);

      // Fetch Admissions
      const { data: admData, error: admError } = await supabase
        .from('admissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (admError) throw admError;
      setAdmissions(admData || []);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle Logout
  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate('/admin/login');
  };

  // Update Status
  const handleStatusChange = async (table, id, newStatus) => {
    if (!supabase) return;
    setActionLoading(id);
    try {
      const { error } = await supabase
        .from(table)
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      if (table === 'inquiries') {
        setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      } else {
        setAdmissions(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete Record
  const handleDelete = async (table, id) => {
    if (!window.confirm('Are you sure you want to delete this record? This cannot be undone.')) {
      return;
    }
    if (!supabase) return;

    setActionLoading(id);
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (table === 'inquiries') {
        setInquiries(prev => prev.filter(item => item.id !== id));
      } else {
        setAdmissions(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      alert('Failed to delete record: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const dataToExport = activeTab === 'inquiries' ? filteredInquiries : filteredAdmissions;
    if (!dataToExport.length) {
      alert('No data available to export.');
      return;
    }

    const headers = Object.keys(dataToExport[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of dataToExport) {
      const values = headers.map(header => {
        const val = row[header] ? String(row[header]).replace(/"/g, '""') : '';
        return `"${val}"`;
      });
      csvRows.push(values.join(','));
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${activeTab}_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculations
  const newInquiriesCount = inquiries.filter(i => i.status === 'New' || i.status === 'Pending').length;
  const newAdmissionsCount = admissions.filter(a => a.status === 'Pending').length;

  // Filter inquiries
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.phone && item.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter admissions
  const filteredAdmissions = admissions.filter(item => {
    const matchesSearch = 
      (item.parent_name && item.parent_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.child_name && item.child_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.phone && item.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.program && item.program.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (isoStr) => {
    if (!isoStr) return '-';
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="admin-dashboard-page">
      {/* Top Header */}
      <header className="admin-nav-bar">
        <div className="admin-nav-inner">
          <div className="admin-brand">
            <span className="admin-badge">Admin Panel</span>
            <h2>Angels & Fairies Daycare</h2>
          </div>
          <div className="admin-user-controls">
            <span className="admin-logged-user">{userEmail || 'Admin User'}</span>
            <button className="admin-signout-btn" onClick={handleSignOut}>
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main-container">
        {/* Metric Cards */}
        <section className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon inq-icon">
              <FaEnvelope />
            </div>
            <div>
              <h3>{inquiries.length}</h3>
              <p>Total Inquiries</p>
              {newInquiriesCount > 0 && (
                <span className="stat-subtext highlight">{newInquiriesCount} new / pending</span>
              )}
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon adm-icon">
              <FaUserGraduate />
            </div>
            <div>
              <h3>{admissions.length}</h3>
              <p>Total Enrollments</p>
              {newAdmissionsCount > 0 && (
                <span className="stat-subtext highlight">{newAdmissionsCount} pending review</span>
              )}
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon act-icon">
              <FaCheckCircle />
            </div>
            <div>
              <h3>{inquiries.filter(i => i.status === 'Resolved').length + admissions.filter(a => a.status === 'Enrolled').length}</h3>
              <p>Completed Leads</p>
              <span className="stat-subtext">Processed applications</span>
            </div>
          </div>
        </section>

        {/* Tab & Filter Bar */}
        <div className="admin-controls-card">
          <div className="admin-tabs">
            <button 
              className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => { setActiveTab('inquiries'); setStatusFilter('ALL'); }}
            >
              <FaEnvelope /> General Inquiries ({inquiries.length})
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'admissions' ? 'active' : ''}`}
              onClick={() => { setActiveTab('admissions'); setStatusFilter('ALL'); }}
            >
              <FaUserGraduate /> Enrollments & Admissions ({admissions.length})
            </button>
          </div>

          <div className="admin-filter-actions">
            <div className="admin-search-box">
              <FaSearch />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-select-filter"
            >
              <option value="ALL">All Statuses</option>
              {activeTab === 'inquiries' ? (
                <>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Resolved">Resolved</option>
                </>
              ) : (
                <>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Declined">Declined</option>
                </>
              )}
            </select>

            <button className="admin-action-btn" onClick={fetchData} title="Refresh records">
              <FaSync className={loading ? 'spin' : ''} /> Refresh
            </button>

            <button className="admin-action-btn export-btn" onClick={exportToCSV} title="Export to CSV file">
              <FaDownload /> Export CSV
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="admin-table-container">
          {loading ? (
            <div className="admin-table-loader">
              <FaSync className="spin" /> Loading records from database...
            </div>
          ) : activeTab === 'inquiries' ? (
            /* Inquiries Table */
            filteredInquiries.length === 0 ? (
              <div className="admin-empty-state">
                <FaEnvelope />
                <h4>No inquiries found</h4>
                <p>When visitors submit the contact form, their messages will appear here.</p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Sender</th>
                      <th>Contact</th>
                      <th>Topic</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map((inq) => (
                      <tr key={inq.id}>
                        <td className="cell-date">{formatDate(inq.created_at)}</td>
                        <td>
                          <strong>{inq.name}</strong>
                        </td>
                        <td>
                          <div className="contact-sublines">
                            <span><FaEnvelope /> <a href={`mailto:${inq.email}`}>{inq.email}</a></span>
                            <span><FaPhone /> <a href={`tel:${inq.phone}`}>{inq.phone}</a></span>
                          </div>
                        </td>
                        <td>
                          <span className="topic-badge">{inq.topic}</span>
                        </td>
                        <td className="cell-message">
                          <p title={inq.message}>{inq.message}</p>
                        </td>
                        <td>
                          <select
                            value={inq.status || 'New'}
                            onChange={(e) => handleStatusChange('inquiries', inq.id, e.target.value)}
                            className={`status-pill status-${(inq.status || 'new').toLowerCase()}`}
                            disabled={actionLoading === inq.id}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="delete-row-btn"
                            title="Delete inquiry"
                            onClick={() => handleDelete('inquiries', inq.id)}
                            disabled={actionLoading === inq.id}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            /* Admissions Table */
            filteredAdmissions.length === 0 ? (
              <div className="admin-empty-state">
                <FaUserGraduate />
                <h4>No enrollment applications found</h4>
                <p>When parents submit the admissions form, their applications will appear here.</p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Parent</th>
                      <th>Child & Program</th>
                      <th>Start Date</th>
                      <th>Notes</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmissions.map((adm) => (
                      <tr key={adm.id}>
                        <td className="cell-date">{formatDate(adm.created_at)}</td>
                        <td>
                          <strong>{adm.parent_name}</strong>
                          <div className="contact-sublines">
                            <span><FaEnvelope /> <a href={`mailto:${adm.email}`}>{adm.email}</a></span>
                            <span><FaPhone /> <a href={`tel:${adm.phone}`}>{adm.phone}</a></span>
                          </div>
                        </td>
                        <td>
                          <div className="child-program-info">
                            <strong><FaChild /> {adm.child_name} ({adm.child_age})</strong>
                            <span className="program-badge">{adm.program}</span>
                          </div>
                        </td>
                        <td>
                          <span className="start-date-badge">
                            <FaCalendarAlt /> {adm.start_date || 'ASAP'}
                          </span>
                        </td>
                        <td className="cell-message">
                          <p title={adm.notes}>{adm.notes || 'No special notes provided'}</p>
                        </td>
                        <td>
                          <select
                            value={adm.status || 'Pending'}
                            onChange={(e) => handleStatusChange('admissions', adm.id, e.target.value)}
                            className={`status-pill status-${(adm.status || 'pending').toLowerCase()}`}
                            disabled={actionLoading === adm.id}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Declined">Declined</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="delete-row-btn"
                            title="Delete enrollment"
                            onClick={() => handleDelete('admissions', adm.id)}
                            disabled={actionLoading === adm.id}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
