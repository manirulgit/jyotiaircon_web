import React, { useState, useEffect } from 'react';
import './ExpenseList.css';
import Headers from '../header';    
import Footer from '../Footer';

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [sortField, setSortField] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');
    const [selectedExpenses, setSelectedExpenses] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);

    // Mock expense data with comprehensive daily expense tracking
    const mockExpenseData = [
        {
            id: 'EXP-001',
            date: '2025-08-03',
            category: 'Transportation',
            subcategory: 'Fuel',
            description: 'Car fuel for client meeting',
            amount: 85.50,
            currency: 'USD',
            paymentMethod: 'Credit Card',
            vendor: 'Shell Gas Station',
            employee: 'John Smith',
            department: 'Sales',
            receiptNumber: 'RCP-001',
            status: 'Approved',
            approvedBy: 'Sarah Johnson',
            approvedDate: '2025-08-04',
            location: 'Downtown Branch',
            project: 'Client Visit - ABC Corp',
            taxAmount: 6.84,
            notes: 'Business trip to meet potential client'
        },
        {
            id: 'EXP-002',
            date: '2025-08-03',
            category: 'Meals',
            subcategory: 'Business Lunch',
            description: 'Lunch with client presentation',
            amount: 125.00,
            currency: 'USD',
            paymentMethod: 'Cash',
            vendor: 'The Business Grill',
            employee: 'Sarah Johnson',
            department: 'Marketing',
            receiptNumber: 'RCP-002',
            status: 'Pending',
            approvedBy: null,
            approvedDate: null,
            location: 'City Center',
            project: 'Marketing Campaign Q3',
            taxAmount: 12.50,
            notes: 'Client lunch for campaign discussion'
        },
        {
            id: 'EXP-003',
            date: '2025-08-02',
            category: 'Office Supplies',
            subcategory: 'Stationery',
            description: 'Office supplies for team',
            amount: 45.75,
            currency: 'USD',
            paymentMethod: 'Company Card',
            vendor: 'Office Depot',
            employee: 'Mike Davis',
            department: 'Operations',
            receiptNumber: 'RCP-003',
            status: 'Approved',
            approvedBy: 'John Smith',
            approvedDate: '2025-08-03',
            location: 'Main Office',
            project: 'General Operations',
            taxAmount: 3.66,
            notes: 'Monthly office supplies purchase'
        },
        {
            id: 'EXP-004',
            date: '2025-08-02',
            category: 'Technology',
            subcategory: 'Software',
            description: 'Monthly software subscription',
            amount: 199.99,
            currency: 'USD',
            paymentMethod: 'Credit Card',
            vendor: 'Adobe Systems',
            employee: 'Lisa Wong',
            department: 'Design',
            receiptNumber: 'RCP-004',
            status: 'Approved',
            approvedBy: 'Sarah Johnson',
            approvedDate: '2025-08-02',
            location: 'Remote',
            project: 'Design Team Tools',
            taxAmount: 16.00,
            notes: 'Creative Cloud subscription for design team'
        },
        {
            id: 'EXP-005',
            date: '2025-08-01',
            category: 'Travel',
            subcategory: 'Accommodation',
            description: 'Hotel stay for conference',
            amount: 450.00,
            currency: 'USD',
            paymentMethod: 'Company Card',
            vendor: 'Marriott Hotel',
            employee: 'David Brown',
            department: 'Sales',
            receiptNumber: 'RCP-005',
            status: 'Approved',
            approvedBy: 'John Smith',
            approvedDate: '2025-08-01',
            location: 'Los Angeles',
            project: 'Sales Conference 2025',
            taxAmount: 54.00,
            notes: 'Accommodation for annual sales conference'
        },
        {
            id: 'EXP-006',
            date: '2025-08-01',
            category: 'Communication',
            subcategory: 'Phone Bills',
            description: 'Monthly mobile phone bills',
            amount: 120.00,
            currency: 'USD',
            paymentMethod: 'Bank Transfer',
            vendor: 'Verizon',
            employee: 'Admin Office',
            department: 'Administration',
            receiptNumber: 'RCP-006',
            status: 'Approved',
            approvedBy: 'Sarah Johnson',
            approvedDate: '2025-08-01',
            location: 'Main Office',
            project: 'General Operations',
            taxAmount: 9.60,
            notes: 'Corporate mobile phone plan'
        },
        {
            id: 'EXP-007',
            date: '2025-07-31',
            category: 'Training',
            subcategory: 'Online Course',
            description: 'Professional development course',
            amount: 299.00,
            currency: 'USD',
            paymentMethod: 'Credit Card',
            vendor: 'LinkedIn Learning',
            employee: 'Emma Wilson',
            department: 'HR',
            receiptNumber: 'RCP-007',
            status: 'Pending',
            approvedBy: null,
            approvedDate: null,
            location: 'Remote',
            project: 'HR Team Development',
            taxAmount: 23.92,
            notes: 'Advanced HR management certification'
        },
        {
            id: 'EXP-008',
            date: '2025-07-31',
            category: 'Marketing',
            subcategory: 'Advertising',
            description: 'Google Ads campaign',
            amount: 1250.00,
            currency: 'USD',
            paymentMethod: 'Credit Card',
            vendor: 'Google Ads',
            employee: 'Tom Anderson',
            department: 'Marketing',
            receiptNumber: 'RCP-008',
            status: 'Approved',
            approvedBy: 'Sarah Johnson',
            approvedDate: '2025-08-01',
            location: 'Remote',
            project: 'Q3 Digital Campaign',
            taxAmount: 100.00,
            notes: 'Monthly digital advertising budget'
        },
        {
            id: 'EXP-009',
            date: '2025-07-30',
            category: 'Utilities',
            subcategory: 'Internet',
            description: 'Office internet service',
            amount: 89.99,
            currency: 'USD',
            paymentMethod: 'Bank Transfer',
            vendor: 'Comcast Business',
            employee: 'Admin Office',
            department: 'Administration',
            receiptNumber: 'RCP-009',
            status: 'Approved',
            approvedBy: 'John Smith',
            approvedDate: '2025-07-30',
            location: 'Main Office',
            project: 'General Operations',
            taxAmount: 7.20,
            notes: 'Monthly high-speed internet service'
        },
        {
            id: 'EXP-010',
            date: '2025-07-30',
            category: 'Maintenance',
            subcategory: 'Equipment',
            description: 'Printer maintenance service',
            amount: 150.00,
            currency: 'USD',
            paymentMethod: 'Cash',
            vendor: 'TechFix Services',
            employee: 'Mike Davis',
            department: 'Operations',
            receiptNumber: 'RCP-010',
            status: 'Rejected',
            approvedBy: 'Sarah Johnson',
            approvedDate: '2025-07-31',
            location: 'Main Office',
            project: 'Office Equipment',
            taxAmount: 12.00,
            notes: 'Quarterly printer maintenance - denied due to recent service'
        },
        {
            id: 'EXP-011',
            date: '2025-07-29',
            category: 'Entertainment',
            subcategory: 'Team Building',
            description: 'Team lunch for project completion',
            amount: 320.00,
            currency: 'USD',
            paymentMethod: 'Company Card',
            vendor: 'Italian Bistro',
            employee: 'Sarah Johnson',
            department: 'Management',
            receiptNumber: 'RCP-011',
            status: 'Approved',
            approvedBy: 'John Smith',
            approvedDate: '2025-07-29',
            location: 'Downtown',
            project: 'Project Alpha Completion',
            taxAmount: 25.60,
            notes: 'Celebration lunch for successful project delivery'
        },
        {
            id: 'EXP-012',
            date: '2025-07-29',
            category: 'Transportation',
            subcategory: 'Taxi',
            description: 'Airport taxi for business trip',
            amount: 65.00,
            currency: 'USD',
            paymentMethod: 'Cash',
            vendor: 'City Taxi Service',
            employee: 'David Brown',
            department: 'Sales',
            receiptNumber: 'RCP-012',
            status: 'Pending',
            approvedBy: null,
            approvedDate: null,
            location: 'Airport',
            project: 'Client Visit - XYZ Corp',
            taxAmount: 5.20,
            notes: 'Transportation to airport for client meeting'
        }
    ];

    // Simulate server-side data fetching
    const fetchExpenses = async () => {
        setLoading(true);
        
        // Simulate API delay
        setTimeout(() => {
            let filteredData = [...mockExpenseData];

            // Apply search filter
            if (searchTerm) {
                filteredData = filteredData.filter(expense =>
                    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    expense.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    expense.id.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            // Apply category filter
            if (categoryFilter) {
                filteredData = filteredData.filter(expense => expense.category === categoryFilter);
            }

            // Apply status filter
            if (statusFilter) {
                filteredData = filteredData.filter(expense => expense.status === statusFilter);
            }

            // Apply date filter
            if (dateFilter) {
                filteredData = filteredData.filter(expense => expense.date === dateFilter);
            }

            // Apply sorting
            filteredData.sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];
                
                if (sortField === 'amount') {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                } else if (sortField === 'date') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }
                
                if (sortDirection === 'asc') {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
            });

            // Pagination
            const startIndex = (currentPage - 1) * parseInt(pageSize);
            const endIndex = startIndex + parseInt(pageSize);
            const paginatedData = filteredData.slice(startIndex, endIndex);

            setExpenses(paginatedData);
            setTotalRecords(filteredData.length);
            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        fetchExpenses();
    }, [currentPage, pageSize, searchTerm, categoryFilter, statusFilter, dateFilter, sortField, sortDirection]);

    // Event handlers
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleSelectExpense = (expenseId) => {
        setSelectedExpenses(prev => 
            prev.includes(expenseId) 
                ? prev.filter(id => id !== expenseId)
                : [...prev, expenseId]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedExpenses(expenses.map(expense => expense.id));
        } else {
            setSelectedExpenses([]);
        }
    };

    // Helper functions
    const getStatusBadge = (status) => {
        const statusClasses = {
            'Approved': 'badge badge-success',
            'Pending': 'badge badge-warning',
            'Rejected': 'badge badge-danger'
        };
        return <span className={statusClasses[status] || 'badge badge-secondary'}>{status}</span>;
    };

    const getCategoryIcon = (category) => {
        const categoryIcons = {
            'Transportation': 'fas fa-car',
            'Meals': 'fas fa-utensils',
            'Office Supplies': 'fas fa-paperclip',
            'Technology': 'fas fa-laptop',
            'Travel': 'fas fa-plane',
            'Communication': 'fas fa-phone',
            'Training': 'fas fa-graduation-cap',
            'Marketing': 'fas fa-bullhorn',
            'Utilities': 'fas fa-plug',
            'Maintenance': 'fas fa-wrench',
            'Entertainment': 'fas fa-glass-cheers'
        };
        return categoryIcons[category] || 'fas fa-receipt';
    };

    const formatCurrency = (amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Pagination calculations
    const totalPages = Math.ceil(totalRecords / pageSize);
    const startRecord = (currentPage - 1) * pageSize + 1;
    const endRecord = Math.min(currentPage * pageSize, totalRecords);

    return (
        <div className="expense-management">
            <Headers />
            
            {/* Enhanced Controls Section */}
            <div className="table-controls">
                <div className="container-fluid">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-search"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search expenses, employee, vendor..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <select 
                                className="form-select"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Meals">Meals</option>
                                <option value="Office Supplies">Office Supplies</option>
                                <option value="Technology">Technology</option>
                                <option value="Travel">Travel</option>
                                <option value="Communication">Communication</option>
                                <option value="Training">Training</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Entertainment">Entertainment</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select 
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <input 
                                type="date" 
                                className="form-control"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            />
                        </div>
                        <div className="col-md-1">
                            <select 
                                className="form-select"
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(e.target.value)}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary w-100">
                                <i className="fas fa-plus me-2"></i>
                                Add Expense
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Table Section */}
            <div className="table-section">
                <div className="table-wrapper">
                    {loading && (
                        <div className="loading-overlay">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th style={{width: '30px'}}>
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input"
                                        onChange={handleSelectAll}
                                        checked={selectedExpenses.length === expenses.length && expenses.length > 0}
                                    />
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('id')}
                                    style={{cursor: 'pointer', width: '80px'}}
                                >
                                    Expense ID {sortField === 'id' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('date')}
                                    style={{cursor: 'pointer', width: '90px'}}
                                >
                                    Date {sortField === 'date' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('description')}
                                    style={{cursor: 'pointer', width: '200px'}}
                                >
                                    Description {sortField === 'description' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('category')}
                                    style={{cursor: 'pointer', width: '120px'}}
                                >
                                    Category {sortField === 'category' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('amount')}
                                    style={{cursor: 'pointer', width: '100px'}}
                                >
                                    Amount {sortField === 'amount' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('employee')}
                                    style={{cursor: 'pointer', width: '120px'}}
                                >
                                    Employee {sortField === 'employee' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('vendor')}
                                    style={{cursor: 'pointer', width: '120px'}}
                                >
                                    Vendor {sortField === 'vendor' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('status')}
                                    style={{cursor: 'pointer', width: '90px'}}
                                >
                                    Status {sortField === 'status' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th style={{width: '100px'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense.id} className={selectedExpenses.includes(expense.id) ? 'table-active' : ''}>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input"
                                            checked={selectedExpenses.includes(expense.id)}
                                            onChange={() => handleSelectExpense(expense.id)}
                                        />
                                    </td>
                                    <td>
                                        <strong className="text-primary">{expense.id}</strong>
                                    </td>
                                    <td>
                                        <small className="text-muted">{formatDate(expense.date)}</small>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <i className={`${getCategoryIcon(expense.category)} me-2 text-muted`}></i>
                                            <div>
                                                <div className="fw-bold">{expense.description}</div>
                                                <small className="text-muted">{expense.subcategory}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-light">
                                            <i className={`${getCategoryIcon(expense.category)} me-1`}></i>
                                            {expense.category}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="amount-cell">
                                            <strong className="text-success">{formatCurrency(expense.amount)}</strong>
                                            <small className="d-block text-muted">Tax: {formatCurrency(expense.taxAmount)}</small>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="avatar-sm me-2">
                                                {expense.employee.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <small className="fw-bold">{expense.employee}</small>
                                                <small className="d-block text-muted">{expense.department}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <small className="fw-bold">{expense.vendor}</small>
                                            <small className="d-block text-muted">{expense.paymentMethod}</small>
                                        </div>
                                    </td>
                                    <td>{getStatusBadge(expense.status)}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn btn-sm btn-outline-primary me-1" title="View Details">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-success me-1" title="Edit Expense">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-info" title="Download Receipt">
                                                <i className="fas fa-download"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {expenses.length === 0 && !loading && (
                        <div className="text-center py-5">
                            <i className="fas fa-receipt fa-3x text-muted mb-3"></i>
                            <h5 className="text-muted">No expenses found</h5>
                            <p className="text-muted">Try adjusting your search criteria or add a new expense</p>
                        </div>
                    )}
                </div>

                {/* Enhanced Pagination */}
                <div className="pagination-section">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="pagination-info">
                                    Showing {startRecord} to {endRecord} of {totalRecords} expenses
                                </div>
                            </div>
                            <div className="col-auto">
                                <nav>
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                <i className="fas fa-chevron-left"></i>
                                            </button>
                                        </li>
                                        
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                                            let pageNumber;
                                            if (totalPages <= 5) {
                                                pageNumber = index + 1;
                                            } else if (currentPage <= 3) {
                                                pageNumber = index + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNumber = totalPages - 4 + index;
                                            } else {
                                                pageNumber = currentPage - 2 + index;
                                            }
                                            
                                            return (
                                                <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                                    <button 
                                                        className="page-link" 
                                                        onClick={() => handlePageChange(pageNumber)}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                        
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                <i className="fas fa-chevron-right"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default ExpenseList;
