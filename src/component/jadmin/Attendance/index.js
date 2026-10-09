import React, { useState, useEffect } from 'react';
import Header from "../header";
import AttendanceService from '../../../services/attendanceService';
import EmployeeService from '../../../services/employeeService';
import './Attendance.css';

function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'

  // Fetch attendance data from API
  const fetchAttendanceData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page: 1,
        size: 1000, // Get all records for calendar view
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        employeeId: selectedEmployee !== 'all' ? selectedEmployee : ''
      };

      const response = await AttendanceService.getAttendance(params);
      
      if (response.success && response.data) {
        // Transform API data to match component structure
        const transformedData = response.data.map(record => ({
          id: record.id,
          employeeId: record.employee_id || record.employeeId,
          employeeName: record.employee_name || record.employeeName,
          date: record.attendance_date || record.date,
          status: record.status,
          checkIn: record.check_in || record.checkIn,
          checkOut: record.check_out || record.checkOut,
          workingHours: record.working_hours || record.workingHours || '0'
        }));
        
        setAttendanceData(transformedData);
        setFilteredData(transformedData);
      } else {
        throw new Error(response.error || 'Failed to fetch attendance data');
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setError(error.message);
      setAttendanceData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch employees list for dropdown
  const fetchEmployees = async () => {
    try {
      const response = await EmployeeService.getEmployees({ page: 1, size: 1000 });
      
      if (response.success && response.data) {
        // Extract unique employee names
        const employeeList = response.data.map(emp => ({
          id: emp.id,
          name: emp.name || emp.employee_name || `${emp.first_name} ${emp.last_name}`.trim(),
          employeeId: emp.employee_id || emp.employeeId
        }));
        
        setEmployees(employeeList);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchEmployees();
    fetchAttendanceData();
  }, []);

  // Filter data based on date range and employee
  useEffect(() => {
    fetchAttendanceData();
  }, [dateRange, selectedEmployee]);

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Get attendance data for a specific date
  const getAttendanceForDate = (day) => {
    if (!day) return [];
    
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredData.filter(record => record.date === dateStr);
  };

  // Navigate calendar months
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Handle date range filter
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setDateRange({ startDate: '', endDate: '' });
    setSelectedEmployee('all');
  };

  // Get status color class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'present': return 'status-present';
      case 'absent': return 'status-absent';
      case 'late': return 'status-late';
      case 'half day': return 'status-half-day';
      default: return '';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="attendance-container">
      <Header />
      
      <div className="attendance-content">
         <div className="demo-notice">
          <p>🗺️ <strong>Agen Attendance:</strong> Attendance.</p>
        </div>
        
        {/* Filter Controls */}
        <div className="filter-controls">
          <div className="filter-group">
            <label>View Mode:</label>
            <select 
              value={viewMode} 
              onChange={(e) => setViewMode(e.target.value)}
              className="form-control"
            >
              <option value="calendar">Calendar View</option>
              <option value="list">List View</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Employee:</label>
            <select 
              value={selectedEmployee} 
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="form-control"
            >
              <option value="all">All Employees</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.employeeId}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateRangeChange}
              className="form-control"
            />
          </div>
          
          <div className="filter-group">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateRangeChange}
              className="form-control"
            />
          </div>
          
          <button 
            onClick={handleClearFilters}
            className="btn btn-secondary"
          >
            Clear Filters
          </button>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center p-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading attendance data...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
            <button 
              className="btn btn-outline-danger btn-sm ms-2"
              onClick={fetchAttendanceData}
            >
              Retry
            </button>
          </div>
        )}

        {/* Calendar View */}
        {!loading && !error && viewMode === 'calendar' && (
          <div className="calendar-view">
            <div className="calendar-header">
              <button onClick={() => navigateMonth(-1)} className="btn btn-outline-primary">
                &#8249;
              </button>
              <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button onClick={() => navigateMonth(1)} className="btn btn-outline-primary">
                &#8250;
              </button>
            </div>

            <div className="calendar-grid">
              {dayNames.map(day => (
                <div key={day} className="calendar-day-header">
                  {day}
                </div>
              ))}
              
              {generateCalendarDays().map((day, index) => (
                <div key={index} className={`calendar-day ${day ? 'active-day' : 'inactive-day'}`}>
                  {day && (
                    <>
                      <div className="day-number">{day}</div>
                      <div className="day-attendance">
                        {getAttendanceForDate(day).map((record, recordIndex) => (
                          <div 
                            key={recordIndex} 
                            className={`attendance-item ${getStatusClass(record.status)}`}
                            title={`${record.employeeName} - ${record.status}`}
                          >
                            <span className="employee-initial">
                              {record.employeeName.charAt(0)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* List View */}
        {!loading && !error && viewMode === 'list' && (
          <div className="list-view">
            <div className="attendance-table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Working Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record) => (
                    <tr key={record.id}>
                      <td>{record.employeeId}</td>
                      <td>{record.employeeName}</td>
                      <td>{record.date}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td>{record.checkIn || '-'}</td>
                      <td>{record.checkOut || '-'}</td>
                      <td>{record.workingHours} hrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredData.length === 0 && (
                <div className="no-data">
                  <p>No attendance records found for the selected criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Statistics */}
        {!loading && !error && (
        <div className="attendance-stats">
          <div className="stats-card">
            <h3>Total Records</h3>
            <p>{filteredData.length}</p>
          </div>
          <div className="stats-card present">
            <h3>Present</h3>
            <p>{filteredData.filter(r => r.status === 'Present').length}</p>
          </div>
          <div className="stats-card absent">
            <h3>Absent</h3>
            <p>{filteredData.filter(r => r.status === 'Absent').length}</p>
          </div>
          <div className="stats-card late">
            <h3>Late</h3>
            <p>{filteredData.filter(r => r.status === 'Late').length}</p>
          </div>
          <div className="stats-card half-day">
            <h3>Half Day</h3>
            <p>{filteredData.filter(r => r.status === 'Half Day').length}</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;  