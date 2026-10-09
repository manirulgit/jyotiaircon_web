import React, { useState, useEffect } from 'react';
import './Location.css';
import Header from '../header';

// Sample JSON data with user locations
const locationData = [
  {
    id: 1,
    userId: 'USER001',
    userName: 'John Doe',
    department: 'Engineering',
    position: 'Software Developer',
    latitude: 40.7128,
    longitude: -74.0060,
    address: '123 Broadway, New York, NY',
    phone: '+1-234-567-8900',
    email: 'john.doe@company.com',
    status: 'Active',
    lastSeen: '2025-07-31 09:30:00',
    workLocation: 'New York Office'
  },
  {
    id: 2,
    userId: 'USER002',
    userName: 'Jane Smith',
    department: 'Marketing',
    position: 'Marketing Manager',
    latitude: 40.7589,
    longitude: -73.9851,
    address: '456 Times Square, New York, NY',
    phone: '+1-234-567-8901',
    email: 'jane.smith@company.com',
    status: 'Active',
    lastSeen: '2025-07-31 10:15:00',
    workLocation: 'Times Square Office'
  },
  {
    id: 3,
    userId: 'USER003',
    userName: 'Mike Johnson',
    department: 'Sales',
    position: 'Sales Representative',
    latitude: 40.7505,
    longitude: -73.9934,
    address: '789 Empire State Building, NY',
    phone: '+1-234-567-8902',
    email: 'mike.johnson@company.com',
    status: 'Inactive',
    lastSeen: '2025-07-30 17:45:00',
    workLocation: 'Empire State Office'
  },
  {
    id: 4,
    userId: 'USER004',
    userName: 'Sarah Wilson',
    department: 'HR',
    position: 'HR Specialist',
    latitude: 40.7614,
    longitude: -73.9776,
    address: '321 Central Park East, NY',
    phone: '+1-234-567-8903',
    email: 'sarah.wilson@company.com',
    status: 'Active',
    lastSeen: '2025-07-31 08:45:00',
    workLocation: 'Central Park Office'
  },
  {
    id: 5,
    userId: 'USER005',
    userName: 'David Brown',
    department: 'Finance',
    position: 'Financial Analyst',
    latitude: 40.7282,
    longitude: -74.0776,
    address: '654 Wall Street, New York, NY',
    phone: '+1-234-567-8904',
    email: 'david.brown@company.com',
    status: 'Active',
    lastSeen: '2025-07-31 11:20:00',
    workLocation: 'Wall Street Office'
  }
];

// Mock Map Component for demo purposes
const MockMapComponent = ({ selectedLocation, onLocationClick }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div className="mock-map">
      <div className="map-header">
        <h3>Interactive Location Map</h3>
        <p>Employee locations in New York City</p>
      </div>
      
      <div className="map-canvas">
        {locationData.map((location) => (
          <div 
            key={location.id}
            className={`map-marker ${location.status.toLowerCase()} ${selectedLocation?.id === location.id ? 'selected' : ''}`}
            style={{
              left: `${((location.longitude + 74.1) * 800)}px`,
              top: `${((40.8 - location.latitude) * 800)}px`
            }}
            onClick={() => {
              setSelectedMarker(location);
              onLocationClick(location);
            }}
            title={`${location.userName} - ${location.workLocation}`}
          >
            <div className="marker-icon">
              <span>{location.userName.charAt(0)}</span>
            </div>
            
            {selectedMarker?.id === location.id && (
              <div className="info-popup">
                <div className="popup-header">
                  <h4>{location.userName}</h4>
                  <button 
                    className="close-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMarker(null);
                    }}
                  >
                    ×
                  </button>
                </div>
                <div className="popup-content">
                  <p><strong>Department:</strong> {location.department}</p>
                  <p><strong>Position:</strong> {location.position}</p>
                  <p><strong>Status:</strong> <span className={`status-${location.status.toLowerCase()}`}>{location.status}</span></p>
                  <p><strong>Work Location:</strong> {location.workLocation}</p>
                  <p><strong>Address:</strong> {location.address}</p>
                  <p><strong>Phone:</strong> {location.phone}</p>
                  <p><strong>Email:</strong> {location.email}</p>
                  <p><strong>Last Seen:</strong> {location.lastSeen}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        
        <div className="map-legend">
          <h4>Legend</h4>
          <div className="legend-item">
            <span className="legend-marker active"></span>
            <span>Active Employee</span>
          </div>
          <div className="legend-item">
            <span className="legend-marker inactive"></span>
            <span>Inactive Employee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function LocationDemo() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filteredData, setFilteredData] = useState(locationData);
  const [filters, setFilters] = useState({
    department: 'all',
    status: 'all',
    search: ''
  });

  // Get unique departments for filter
  const departments = [...new Set(locationData.map(location => location.department))];

  // Filter locations based on criteria
  useEffect(() => {
    let filtered = locationData;

    if (filters.department !== 'all') {
      filtered = filtered.filter(location => location.department === filters.department);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(location => location.status.toLowerCase() === filters.status);
    }

    if (filters.search) {
      filtered = filtered.filter(location =>
        location.userName.toLowerCase().includes(filters.search.toLowerCase()) ||
        location.department.toLowerCase().includes(filters.search.toLowerCase()) ||
        location.position.toLowerCase().includes(filters.search.toLowerCase()) ||
        location.workLocation.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const clearFilters = () => {
    setFilters({
      department: 'all',
      status: 'all',
      search: ''
    });
    setSelectedLocation(null);
  };

  const getStatusClass = (status) => {
    return status.toLowerCase() === 'active' ? 'status-active' : 'status-inactive';
  };

  return (
    <div className="location-container">
      <Header />
      
      <div className="location-content">
       
        <div className="demo-notice">
          <p>🗺️ <strong>Agen Live view:</strong> This shows the location tracking interface with live data.</p>
        </div>
        
        {/* Filter Controls */}
        <div className="filter-controls">
          <div className="filter-group">
            <label>Search:</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by name, department, position..."
              className="form-control"
            />
          </div>
          
          <div className="filter-group">
            <label>Department:</label>
            <select 
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="all">All Departments</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Status:</label>
            <select 
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <button onClick={clearFilters} className="btn btn-secondary">
            Clear Filters
          </button>
        </div>

        <div className="location-main">
          {/* Map Section */}
          <div className="map-section">
            <MockMapComponent
              selectedLocation={selectedLocation}
              onLocationClick={handleLocationSelect}
            />
          </div>

          {/* Location List */}
          <div className="location-list">
            <h3>Employee Locations ({filteredData.length})</h3>
            <div className="location-items">
              {filteredData.map((location) => (
                <div 
                  key={location.id} 
                  className={`location-item ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="location-avatar">
                    <span className={`status-indicator ${getStatusClass(location.status)}`}></span>
                    <div className="avatar">{location.userName.charAt(0)}</div>
                  </div>
                  
                  <div className="location-info">
                    <h4>{location.userName}</h4>
                    <p className="department">{location.department} - {location.position}</p>
                    <p className="work-location">{location.workLocation}</p>
                    <p className="address">{location.address}</p>
                    <div className="contact-info">
                      <span className="phone">{location.phone}</span>
                      <span className="email">{location.email}</span>
                    </div>
                    <p className="coordinates">
                      📍 Lat: {location.latitude}, Lng: {location.longitude}
                    </p>
                    <p className="last-seen">Last seen: {location.lastSeen}</p>
                  </div>
                  
                  <div className="location-status">
                    <span className={`status-badge ${getStatusClass(location.status)}`}>
                      {location.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredData.length === 0 && (
              <div className="no-data">
                <p>No locations found matching the selected criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="location-stats">
          <div className="stats-card">
            <h3>Total Employees</h3>
            <p>{filteredData.length}</p>
          </div>
          <div className="stats-card active">
            <h3>Active</h3>
            <p>{filteredData.filter(l => l.status === 'Active').length}</p>
          </div>
          <div className="stats-card inactive">
            <h3>Inactive</h3>
            <p>{filteredData.filter(l => l.status === 'Inactive').length}</p>
          </div>
          <div className="stats-card departments">
            <h3>Departments</h3>
            <p>{new Set(filteredData.map(l => l.department)).size}</p>
          </div>
        </div>

     
       
      </div>
    </div>
  );
}

export default LocationDemo;
