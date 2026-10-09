import React, { useState, useEffect, useRef } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import './Location.css';
import Header from '../header';
import LocationDemo from './LocationDemo';

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

// Google Maps component
const MapComponent = ({ center, zoom, locations, onMarkerClick, selectedLocation }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  useEffect(() => {
    if (map) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      
      // Create new markers
      const newMarkers = locations.map(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
          title: location.userName,
          icon: {
            url: getMarkerIcon(location.status),
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 40)
          }
        });

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: createInfoWindowContent(location)
        });

        marker.addListener('click', () => {
          // Close all other info windows
          markers.forEach(m => {
            if (m.infoWindow) {
              m.infoWindow.close();
            }
          });
          
          infoWindow.open(map, marker);
          onMarkerClick(location);
        });

        marker.infoWindow = infoWindow;
        return marker;
      });

      setMarkers(newMarkers);

      // Auto-open info window for selected location
      if (selectedLocation) {
        const selectedMarker = newMarkers.find(marker => 
          marker.getTitle() === selectedLocation.userName
        );
        if (selectedMarker && selectedMarker.infoWindow) {
          selectedMarker.infoWindow.open(map, selectedMarker);
          map.panTo({ lat: selectedLocation.latitude, lng: selectedLocation.longitude });
        }
      }
    }
  }, [map, locations, selectedLocation, onMarkerClick]);

  const getMarkerIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#28a745">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `);
      case 'inactive':
        return 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc3545">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `);
      default:
        return 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6c757d">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `);
    }
  };

  const createInfoWindowContent = (location) => {
    return `
      <div class="info-window">
        <h4>${location.userName}</h4>
        <p><strong>Department:</strong> ${location.department}</p>
        <p><strong>Position:</strong> ${location.position}</p>
        <p><strong>Status:</strong> <span class="status-${location.status.toLowerCase()}">${location.status}</span></p>
        <p><strong>Work Location:</strong> ${location.workLocation}</p>
        <p><strong>Address:</strong> ${location.address}</p>
        <p><strong>Phone:</strong> ${location.phone}</p>
        <p><strong>Email:</strong> ${location.email}</p>
        <p><strong>Last Seen:</strong> ${location.lastSeen}</p>
      </div>
    `;
  };

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
};

// Render function for Google Maps wrapper
const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <div className="loading">Loading Google Maps...</div>;
    case Status.FAILURE:
      return <div className="error">Error loading Google Maps. Showing demo mode instead.</div>;
    case Status.SUCCESS:
      return null;
    default:
      return null;
  }
};

function Location() {
  const [useDemoMode, setUseDemoMode] = useState(true);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
  // If no API key is provided, force demo mode
  useEffect(() => {
    if (!apiKey) {
      setUseDemoMode(true);
    }
  }, [apiKey]);

  // If demo mode is enabled, render the demo component
  if (useDemoMode) {
    return <LocationDemo />;
  }

  // Rest of the Google Maps implementation
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filteredData, setFilteredData] = useState(locationData);
  const [filters, setFilters] = useState({
    department: 'all',
    status: 'all',
    search: ''
  });
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [mapZoom, setMapZoom] = useState(12);

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
    setMapCenter({ lat: location.latitude, lng: location.longitude });
    setMapZoom(15);
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const clearFilters = () => {
    setFilters({
      department: 'all',
      status: 'all',
      search: ''
    });
    setSelectedLocation(null);
    setMapCenter({ lat: 40.7128, lng: -74.0060 });
    setMapZoom(12);
  };

  const getStatusClass = (status) => {
    return status.toLowerCase() === 'active' ? 'status-active' : 'status-inactive';
  };

  return (
    <div className="location-container">
      <Header />
      
      <div className="location-content">
        <h1>Location Tracking</h1>
        
        <div className="mode-toggle">
          <button 
            onClick={() => setUseDemoMode(!useDemoMode)}
            className="btn btn-secondary"
          >
            Switch to {useDemoMode ? 'Google Maps' : 'Demo'} Mode
          </button>
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
            <div className="map-container">
              <Wrapper
                apiKey={apiKey}
                render={render}
                libraries={['marker']}
              >
                <MapComponent
                  center={mapCenter}
                  zoom={mapZoom}
                  locations={filteredData}
                  onMarkerClick={handleMarkerClick}
                  selectedLocation={selectedLocation}
                />
              </Wrapper>
            </div>
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

export default Location;

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

// Google Maps component
const MapComponent = ({ center, zoom, locations, onMarkerClick, selectedLocation }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  useEffect(() => {
    if (map) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      
      // Create new markers
      const newMarkers = locations.map(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
          title: location.userName,
          icon: {
            url: getMarkerIcon(location.status),
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 40)
          }
        });

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: createInfoWindowContent(location)
        });

        marker.addListener('click', () => {
          // Close all other info windows
          markers.forEach(m => {
            if (m.infoWindow) {
              m.infoWindow.close();
            }
          });
          
          infoWindow.open(map, marker);
          onMarkerClick(location);
        });

        marker.infoWindow = infoWindow;
        return marker;
      });

      setMarkers(newMarkers);

      // Auto-open info window for selected location
      if (selectedLocation) {
        const selectedMarker = newMarkers.find(marker => 
          marker.getTitle() === selectedLocation.userName
        );
        if (selectedMarker && selectedMarker.infoWindow) {
          selectedMarker.infoWindow.open(map, selectedMarker);
          map.panTo({ lat: selectedLocation.latitude, lng: selectedLocation.longitude });
        }
      }
    }
  }, [map, locations, selectedLocation, onMarkerClick]);

  const getMarkerIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#28a745">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `);
      case 'inactive':
        return 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc3545">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `);
      default:
        return 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6c757d">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `);
    }
  };

  const createInfoWindowContent = (location) => {
    return `
      <div class="info-window">
        <h4>${location.userName}</h4>
        <p><strong>Department:</strong> ${location.department}</p>
        <p><strong>Position:</strong> ${location.position}</p>
        <p><strong>Status:</strong> <span class="status-${location.status.toLowerCase()}">${location.status}</span></p>
        <p><strong>Work Location:</strong> ${location.workLocation}</p>
        <p><strong>Address:</strong> ${location.address}</p>
        <p><strong>Phone:</strong> ${location.phone}</p>
        <p><strong>Email:</strong> ${location.email}</p>
        <p><strong>Last Seen:</strong> ${location.lastSeen}</p>
      </div>
    `;
  };

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
};

// Render function for Google Maps wrapper
const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <div className="loading">Loading Google Maps...</div>;
    case Status.FAILURE:
      return <div className="error">Error loading Google Maps</div>;
    case Status.SUCCESS:
      return null;
    default:
      return null;
  }
};

function Location() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filteredData, setFilteredData] = useState(locationData);
  const [filters, setFilters] = useState({
    department: 'all',
    status: 'all',
    search: ''
  });
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [mapZoom, setMapZoom] = useState(12);

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
    setMapCenter({ lat: location.latitude, lng: location.longitude });
    setMapZoom(15);
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const clearFilters = () => {
    setFilters({
      department: 'all',
      status: 'all',
      search: ''
    });
    setSelectedLocation(null);
    setMapCenter({ lat: 40.7128, lng: -74.0060 });
    setMapZoom(12);
  };

  const getStatusClass = (status) => {
    return status.toLowerCase() === 'active' ? 'status-active' : 'status-inactive';
  };

  return (
    <div className="location-container">
      <Header />
      
      <div className="location-content">
        <h1>Location Tracking</h1>
        
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
            <div className="map-container">
              <Wrapper
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyBHLett8djBo62dDXj0EjCpF6M-TsFMUAk"} // Demo key - replace with your actual API key
                render={render}
                libraries={['marker']}
              >
                <MapComponent
                  center={mapCenter}
                  zoom={mapZoom}
                  locations={filteredData}
                  onMarkerClick={handleMarkerClick}
                  selectedLocation={selectedLocation}
                />
              </Wrapper>
            </div>
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

export default Location;