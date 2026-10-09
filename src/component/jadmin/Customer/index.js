import React, { useState, useEffect, useCallback } from 'react';
import './Customer.css';
import Header from '../header';

// Mock server-side data generator
const generateCustomerData = (total = 250) => {
  const departments = ['Sales', 'Marketing', 'IT', 'HR', 'Finance', 'Operations'];
  const statuses = ['Active', 'Inactive', 'Pending', 'Suspended'];
  const countries = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Australia', 'India', 'Japan'];

  const customers = [];
  for (let i = 1; i <= total; i++) {
    customers.push({
      id: i,
      customerCode: `CUST${String(i).padStart(4, '0')}`,
      firstName: `FirstName${i}`,
      lastName: `LastName${i}`,
      email: `customer${i}@example.com`,
      phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      company: `Company ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26) + 1}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      joinDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalOrders: Math.floor(Math.random() * 100) + 1,
      totalSpent: (Math.random() * 50000 + 1000).toFixed(2)
    });
  }
  return customers;
};

// Mock server API simulation
const mockServerAPI = {
  data: generateCustomerData(250),

  fetchData: async (page, pageSize, sortBy, sortOrder, search, filters) => {
    // Simulate server delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredData = [...mockServerAPI.data];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(customer =>
        customer.firstName.toLowerCase().includes(searchLower) ||
        customer.lastName.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.company.toLowerCase().includes(searchLower) ||
        customer.customerCode.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status && filters.status !== 'all') {
      filteredData = filteredData.filter(customer => customer.status === filters.status);
    }

    // Apply department filter
    if (filters.department && filters.department !== 'all') {
      filteredData = filteredData.filter(customer => customer.department === filters.department);
    }

    // Apply country filter
    if (filters.country && filters.country !== 'all') {
      filteredData = filteredData.filter(customer => customer.country === filters.country);
    }

    // Apply sorting
    if (sortBy) {
      filteredData.sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];

        // Handle numeric values
        if (sortBy === 'totalOrders' || sortBy === 'totalSpent') {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        }

        // Handle date values
        if (sortBy === 'joinDate' || sortBy === 'lastLogin') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const totalRecords = filteredData.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = filteredData.slice(startIndex, endIndex);

    return {
      data: pageData,
      totalRecords,
      totalPages: Math.ceil(totalRecords / pageSize),
      currentPage: page,
      pageSize
    };
  }
};

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0
  });
  const [sorting, setSorting] = useState({
    sortBy: 'id',
    sortOrder: 'asc'
  });
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all',
    country: 'all'
  });
  const [selectedCustomers, setSelectedCustomers] = useState(new Set());

  // Fetch data function
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await mockServerAPI.fetchData(
        pagination.currentPage,
        pagination.pageSize,
        sorting.sortBy,
        sorting.sortOrder,
        search,
        filters
      );

      setCustomers(result.data);
      setPagination(prev => ({
        ...prev,
        totalRecords: result.totalRecords,
        totalPages: result.totalPages
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, pagination.pageSize, sorting.sortBy, sorting.sortOrder, search, filters]);

  // Initial data load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    setPagination(prev => ({
      ...prev,
      pageSize: parseInt(newPageSize),
      currentPage: 1
    }));
  };

  // Handle sorting
  const handleSort = (column) => {
    setSorting(prev => ({
      sortBy: column,
      sortOrder: prev.sortBy === column && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handle row selection
  const handleRowSelect = (customerId) => {
    const newSelected = new Set(selectedCustomers);
    if (newSelected.has(customerId)) {
      newSelected.delete(customerId);
    } else {
      newSelected.add(customerId);
    }
    setSelectedCustomers(newSelected);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedCustomers.size === customers.length) {
      setSelectedCustomers(new Set());
    } else {
      setSelectedCustomers(new Set(customers.map(c => c.id)));
    }
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'badge bg-success';
      case 'Inactive': return 'badge bg-secondary';
      case 'Pending': return 'badge bg-warning';
      case 'Suspended': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    const { currentPage, totalPages } = pagination;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="customer-container">
      <Header />

      <div className="customer-content">
        {/* Controls Section */}
        <div className="table-controls">
          <div className="row g-3 align-items-end">
            {/* Search */}
            <div className="col-md-4">

              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, company..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="col-md-2">

              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            {/* Department Filter */}
            <div className="col-md-2">

              <select
                className="form-select"
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            {/* Country Filter */}
            <div className="col-md-2">

              <select
                className="form-select"
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
              >
                <option value="all">All Countries</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
                <option value="Japan">Japan</option>
              </select>
            </div>

            {/* Page Size */}
            <div className="col-md-2">

              <select
                className="form-select"
                value={pagination.pageSize}
                onChange={(e) => handlePageSizeChange(e.target.value)}
              >
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-section">
          

          <div className="table-wrapper">
            {loading && (
              <div className="loading-overlay">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            <table className="table table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th scope="col" className="text-center" style={{ width: '50px' }}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={customers.length > 0 && selectedCustomers.size === customers.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th scope="col" className="sortable" onClick={() => handleSort('customerCode')}>
                    Cust Code
                    {sorting.sortBy === 'customerCode' && (
                      <i className={`fas fa-sort-${sorting.sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                    )}
                  </th>
                  <th scope="col" className="sortable" onClick={() => handleSort('firstName')}>
                    Name
                    {sorting.sortBy === 'firstName' && (
                      <i className={`fas fa-sort-${sorting.sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                    )}
                  </th>
                  <th scope="col" className="sortable" onClick={() => handleSort('email')}>
                    Email
                    {sorting.sortBy === 'email' && (
                      <i className={`fas fa-sort-${sorting.sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                    )}
                  </th>
                  <th scope="col" className="sortable" onClick={() => handleSort('company')}>
                    Company
                    {sorting.sortBy === 'company' && (
                      <i className={`fas fa-sort-${sorting.sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                    )}
                  </th>
                  <th scope="col" className="sortable" onClick={() => handleSort('department')}>
                    Department
                    {sorting.sortBy === 'department' && (
                      <i className={`fas fa-sort-${sorting.sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                    )}
                  </th>
                  <th scope="col" className="sortable" onClick={() => handleSort('status')}>
                    Status
                    {sorting.sortBy === 'status' && (
                      <i className={`fas fa-sort-${sorting.sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                    )}
                  </th>
                  <th scope="col" className="sortable" onClick={() => handleSort('totalOrders')}>
                    Orders
                    {sorting.sortBy === 'totalOrders' && (
                      <i className={`fas fa-sort-${sorting.sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                    )}
                  </th>
                  <th scope="col" className="sortable" onClick={() => handleSort('totalSpent')}>
                    Spent
                    {sorting.sortBy === 'totalSpent' && (
                      <i className={`fas fa-sort-${sorting.sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                    )}
                  </th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className={selectedCustomers.has(customer.id) ? 'table-active' : ''}>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedCustomers.has(customer.id)}
                        onChange={() => handleRowSelect(customer.id)}
                      />
                    </td>
                    <td>
                      <span className="fw-bold text-primary">{customer.customerCode}</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-2">
                          {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-bold">{customer.firstName} {customer.lastName}</div>
                          <small className="text-muted">{customer.country}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{customer.email}</div>
                      <small className="text-muted">{customer.phone}</small>
                    </td>
                    <td>{customer.company}</td>
                    <td>
                      <span className="badge bg-light text-dark">{customer.department}</span>
                    </td>
                    <td>
                      <span className={getStatusClass(customer.status)}>{customer.status}</span>
                    </td>
                    <td className="text-center">
                      <span className="fw-bold">{customer.totalOrders}</span>
                    </td>
                    <td className="text-end">
                      <span className="fw-bold text-success">${customer.totalSpent}</span>
                    </td>
                    <td className="text-center">
                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-sm btn-outline-primary" title="View">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary" title="Edit">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-danger" title="Delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {customers.length === 0 && !loading && (
              <div className="no-data">
                <div className="text-center p-5">
                  <i className="fas fa-users fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">No customers found</h5>
                  <p className="text-muted">Try adjusting your search criteria or filters</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="pagination-section">
            <nav aria-label="Customer pagination">
              <ul className="pagination pagination-lg justify-content-center">
                <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(1)}
                    disabled={pagination.currentPage === 1}
                  >
                    <i className="fas fa-angle-double-left"></i>
                  </button>
                </li>
                <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                  >
                    <i className="fas fa-angle-left"></i>
                  </button>
                </li>

                {getPageNumbers().map(pageNum => (
                  <li key={pageNum} className={`page-item ${pagination.currentPage === pageNum ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                  >
                    <i className="fas fa-angle-right"></i>
                  </button>
                </li>
                <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.totalPages)}
                    disabled={pagination.currentPage === pagination.totalPages}
                  >
                    <i className="fas fa-angle-double-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customer;