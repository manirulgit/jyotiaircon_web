import React, { useState, useEffect } from 'react';
import './ListTicket.css';
import Headers from '../header';
import Footer from '../Footer';

function ListTicket() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);
    const [newTicketData, setNewTicketData] = useState({
        title: '',
        description: '',
        reporter: '',
        assignee: '',
        priority: 'Medium',
        category: 'Bug',
        department: 'IT',
        dueDate: '',
        tags: '',
        attachments: ''
    });

    // Mock API function to simulate server-side data fetching
    const fetchTickets = async (page, size, search, sort, direction, statusFilter, priorityFilter) => {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock ticket data
        const mockTickets = [
            { 
                id: 'TKT-001', 
                title: 'Login page not loading', 
                description: 'Users unable to access login page, getting 404 error',
                reporter: 'John Smith',
                assignee: 'Sarah Johnson',
                status: 'Open',
                priority: 'High',
                category: 'Bug',
                createdDate: '2024-01-15',
                dueDate: '2024-01-20',
                department: 'IT'
            },
            { 
                id: 'TKT-002', 
                title: 'Payroll calculation error', 
                description: 'Overtime hours not being calculated correctly in payroll system',
                reporter: 'Mike Davis',
                assignee: 'David Wilson',
                status: 'In Progress',
                priority: 'Critical',
                category: 'Bug',
                createdDate: '2024-01-14',
                dueDate: '2024-01-16',
                department: 'HR'
            },
            { 
                id: 'TKT-003', 
                title: 'Add new employee portal', 
                description: 'Need to create a self-service portal for new employee onboarding',
                reporter: 'Emily Brown',
                assignee: 'Lisa Anderson',
                status: 'Open',
                priority: 'Medium',
                category: 'Feature Request',
                createdDate: '2024-01-13',
                dueDate: '2024-02-15',
                department: 'HR'
            },
            { 
                id: 'TKT-004', 
                title: 'Database backup failure', 
                description: 'Automated database backup failed last night, need investigation',
                reporter: 'Robert Taylor',
                assignee: 'Christopher White',
                status: 'Resolved',
                priority: 'High',
                category: 'Infrastructure',
                createdDate: '2024-01-12',
                dueDate: '2024-01-14',
                department: 'IT'
            },
            { 
                id: 'TKT-005', 
                title: 'Update employee handbook', 
                description: 'Annual review and update of employee handbook policies',
                reporter: 'Jennifer Garcia',
                assignee: 'Amanda Thompson',
                status: 'In Progress',
                priority: 'Low',
                category: 'Documentation',
                createdDate: '2024-01-11',
                dueDate: '2024-02-28',
                department: 'HR'
            },
            { 
                id: 'TKT-006', 
                title: 'Email server downtime', 
                description: 'Email server experiencing intermittent connectivity issues',
                reporter: 'Michael Martinez',
                assignee: 'John Smith',
                status: 'Open',
                priority: 'Critical',
                category: 'Infrastructure',
                createdDate: '2024-01-10',
                dueDate: '2024-01-12',
                department: 'IT'
            },
            { 
                id: 'TKT-007', 
                title: 'Performance review system', 
                description: 'Implement automated performance review scheduling system',
                reporter: 'Jessica Lee',
                assignee: 'Sarah Johnson',
                status: 'Closed',
                priority: 'Medium',
                category: 'Feature Request',
                createdDate: '2024-01-09',
                dueDate: '2024-03-01',
                department: 'HR'
            },
            { 
                id: 'TKT-008', 
                title: 'Printer setup in conference room', 
                description: 'Need to install and configure network printer in main conference room',
                reporter: 'David Wilson',
                assignee: 'Robert Taylor',
                status: 'In Progress',
                priority: 'Low',
                category: 'Hardware',
                createdDate: '2024-01-08',
                dueDate: '2024-01-25',
                department: 'IT'
            },
            { 
                id: 'TKT-009', 
                title: 'Security audit compliance', 
                description: 'Conduct quarterly security audit and implement necessary fixes',
                reporter: 'Lisa Anderson',
                assignee: 'Christopher White',
                status: 'Open',
                priority: 'High',
                category: 'Security',
                createdDate: '2024-01-07',
                dueDate: '2024-01-31',
                department: 'IT'
            },
            { 
                id: 'TKT-010', 
                title: 'Training material update', 
                description: 'Update training materials for new software implementation',
                reporter: 'Amanda Thompson',
                assignee: 'Jennifer Garcia',
                status: 'Resolved',
                priority: 'Medium',
                category: 'Training',
                createdDate: '2024-01-06',
                dueDate: '2024-01-20',
                department: 'HR'
            },
            { 
                id: 'TKT-011', 
                title: 'VPN connection issues', 
                description: 'Multiple users reporting VPN connection failures',
                reporter: 'Mike Davis',
                assignee: 'John Smith',
                status: 'In Progress',
                priority: 'High',
                category: 'Network',
                createdDate: '2024-01-05',
                dueDate: '2024-01-18',
                department: 'IT'
            },
            { 
                id: 'TKT-012', 
                title: 'Employee benefits portal', 
                description: 'Create online portal for employees to manage their benefits',
                reporter: 'Emily Brown',
                assignee: 'Lisa Anderson',
                status: 'Open',
                priority: 'Medium',
                category: 'Feature Request',
                createdDate: '2024-01-04',
                dueDate: '2024-04-01',
                department: 'HR'
            }
        ];

        // Apply filtering
        let filteredTickets = mockTickets.filter(ticket => {
            const matchesSearch = ticket.title.toLowerCase().includes(search.toLowerCase()) ||
                                ticket.description.toLowerCase().includes(search.toLowerCase()) ||
                                ticket.id.toLowerCase().includes(search.toLowerCase()) ||
                                ticket.reporter.toLowerCase().includes(search.toLowerCase()) ||
                                ticket.assignee.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === '' || ticket.status === statusFilter;
            const matchesPriority = priorityFilter === '' || ticket.priority === priorityFilter;
            return matchesSearch && matchesStatus && matchesPriority;
        });

        // Apply sorting
        filteredTickets.sort((a, b) => {
            let aVal = a[sort];
            let bVal = b[sort];
            
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (direction === 'asc') {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });

        // Apply pagination
        const startIndex = (page - 1) * size;
        const paginatedTickets = filteredTickets.slice(startIndex, startIndex + size);

        setTickets(paginatedTickets);
        setTotalRecords(filteredTickets.length);
        setLoading(false);
    };

    useEffect(() => {
        fetchTickets(currentPage, pageSize, searchTerm, sortField, sortDirection, statusFilter, priorityFilter);
    }, [currentPage, pageSize, searchTerm, sortField, sortDirection, statusFilter, priorityFilter]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size) => {
        setPageSize(parseInt(size));
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

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedTickets(tickets.map(ticket => ticket.id));
        } else {
            setSelectedTickets([]);
        }
    };

    const handleSelectTicket = (ticketId) => {
        setSelectedTickets(prev => 
            prev.includes(ticketId) 
                ? prev.filter(id => id !== ticketId)
                : [...prev, ticketId]
        );
    };

    const totalPages = Math.ceil(totalRecords / pageSize);
    const startRecord = (currentPage - 1) * pageSize + 1;
    const endRecord = Math.min(currentPage * pageSize, totalRecords);

    const getStatusBadge = (status) => {
        let badgeClass = 'badge-primary';
        if (status === 'Open') badgeClass = 'badge-warning';
        else if (status === 'In Progress') badgeClass = 'badge-info';
        else if (status === 'Resolved') badgeClass = 'badge-success';
        else if (status === 'Closed') badgeClass = 'badge-secondary';
        
        return <span className={`badge ${badgeClass}`}>{status}</span>;
    };

    const getPriorityBadge = (priority) => {
        let badgeClass = 'badge-secondary';
        if (priority === 'Critical') badgeClass = 'badge-danger';
        else if (priority === 'High') badgeClass = 'badge-warning';
        else if (priority === 'Medium') badgeClass = 'badge-info';
        else if (priority === 'Low') badgeClass = 'badge-success';
        
        return <span className={`badge ${badgeClass}`}>{priority}</span>;
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'Bug': 'fas fa-bug',
            'Feature Request': 'fas fa-plus-circle',
            'Infrastructure': 'fas fa-server',
            'Documentation': 'fas fa-file-alt',
            'Hardware': 'fas fa-desktop',
            'Security': 'fas fa-shield-alt',
            'Training': 'fas fa-graduation-cap',
            'Network': 'fas fa-network-wired'
        };
        return icons[category] || 'fas fa-ticket-alt';
    };

    // New Ticket Modal Functions
    const handleNewTicketInputChange = (e) => {
        const { name, value } = e.target;
        setNewTicketData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveNewTicket = () => {
        // Generate new ticket ID
        const newTicketId = `TKT-${String(Math.max(...tickets.map(t => parseInt(t.id.split('-')[1]))) + 1).padStart(3, '0')}`;
        
        // Create new ticket object
        const newTicket = {
            id: newTicketId,
            ...newTicketData,
            status: 'Open',
            createdDate: new Date().toISOString().split('T')[0],
            createdBy: 'Current User' // In real app, get from auth context
        };

        // Save to JSON format (in real app, send to API)
        const ticketJsonData = {
            timestamp: new Date().toISOString(),
            action: 'CREATE_TICKET',
            data: newTicket
        };

        // Log JSON data (in real app, save to database/API)
        console.log('New Ticket Data (JSON):', JSON.stringify(ticketJsonData, null, 2));
        
        // For demo purposes, save to localStorage
        const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        existingTickets.push(newTicket);
        localStorage.setItem('tickets', JSON.stringify(existingTickets));

        // Show success message
        alert(`Ticket ${newTicketId} created successfully!\n\nJSON Data:\n${JSON.stringify(ticketJsonData, null, 2)}`);

        // Reset form and close modal
        setNewTicketData({
            title: '',
            description: '',
            reporter: '',
            assignee: '',
            priority: 'Medium',
            category: 'Bug',
            department: 'IT',
            dueDate: '',
            tags: '',
            attachments: ''
        });
        setShowNewTicketModal(false);

        // Refresh tickets list
        fetchTickets(currentPage, pageSize, searchTerm, sortField, sortDirection, statusFilter, priorityFilter);
    };

    const handleCloseModal = () => {
        setShowNewTicketModal(false);
        setNewTicketData({
            title: '',
            description: '',
            reporter: '',
            assignee: '',
            priority: 'Medium',
            category: 'Bug',
            department: 'IT',
            dueDate: '',
            tags: '',
            attachments: ''
        });
    };
  return (
        <div className="ticket-management">
            <Headers />
            
            {/* Enhanced Controls Section */}
            <div className="table-controls">
                <div className="container-fluid">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-4">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-search"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search tickets, reporter, assignee..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <select 
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select 
                                className="form-select"
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                            >
                                <option value="">All Priority</option>
                                <option value="Critical">Critical</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="col-md-2">
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
                            <button 
                                className="btn btn-primary w-100"
                                onClick={() => setShowNewTicketModal(true)}
                            >
                                <i className="fas fa-plus me-2"></i>
                                New Ticket
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
                                        checked={selectedTickets.length === tickets.length && tickets.length > 0}
                                    />
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('id')}
                                    style={{cursor: 'pointer', width: '80px'}}
                                >
                                    Ticket ID {sortField === 'id' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('title')}
                                    style={{cursor: 'pointer', width: '200px'}}
                                >
                                    Title {sortField === 'title' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('reporter')}
                                    style={{cursor: 'pointer', width: '120px'}}
                                >
                                    Reporter {sortField === 'reporter' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('assignee')}
                                    style={{cursor: 'pointer', width: '120px'}}
                                >
                                    Assignee {sortField === 'assignee' && (
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
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('priority')}
                                    style={{cursor: 'pointer', width: '80px'}}
                                >
                                    Priority {sortField === 'priority' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('category')}
                                    style={{cursor: 'pointer', width: '100px'}}
                                >
                                    Category {sortField === 'category' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('createdDate')}
                                    style={{cursor: 'pointer', width: '90px'}}
                                >
                                    Created {sortField === 'createdDate' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th style={{width: '100px'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket.id} className={selectedTickets.includes(ticket.id) ? 'table-active' : ''}>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input"
                                            checked={selectedTickets.includes(ticket.id)}
                                            onChange={() => handleSelectTicket(ticket.id)}
                                        />
                                    </td>
                                    <td>
                                        <strong className="text-primary">{ticket.id}</strong>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <i className={`${getCategoryIcon(ticket.category)} me-2 text-muted`}></i>
                                            <div>
                                                <div className="fw-bold">{ticket.title}</div>
                                                <small className="text-muted">{ticket.description.substring(0, 50)}...</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="avatar-sm me-2">
                                                {ticket.reporter.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <small>{ticket.reporter}</small>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="avatar-sm me-2">
                                                {ticket.assignee.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <small>{ticket.assignee}</small>
                                        </div>
                                    </td>
                                    <td>{getStatusBadge(ticket.status)}</td>
                                    <td>{getPriorityBadge(ticket.priority)}</td>
                                    <td>
                                        <span className="badge badge-light">
                                            <i className={`${getCategoryIcon(ticket.category)} me-1`}></i>
                                            {ticket.category}
                                        </span>
                                    </td>
                                    <td>
                                        <small className="text-muted">{ticket.createdDate}</small>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn btn-sm btn-outline-primary me-1" title="View Details">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-success me-1" title="Edit Ticket">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger" title="Close Ticket">
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {tickets.length === 0 && !loading && (
                        <div className="text-center py-5">
                            <i className="fas fa-ticket-alt fa-3x text-muted mb-3"></i>
                            <h5 className="text-muted">No tickets found</h5>
                            <p className="text-muted">Try adjusting your search criteria or create a new ticket</p>
                        </div>
                    )}
                </div>

                {/* Enhanced Pagination */}
                <div className="pagination-section">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="pagination-info">
                                    Showing {startRecord} to {endRecord} of {totalRecords} tickets
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

            {/* New Ticket Modal */}
            {showNewTicketModal && (
                <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
                    <div className="modal-dialog modal-xl modal-dialog-centered" style={{maxWidth: '90%', width: '1200px'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                {/* <h5 className="modal-title">
                                    <i className="fas fa-plus-circle me-2 text-primary"></i>
                                    Create New Ticket
                                </h5> */}
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        {/* Title */}
                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-heading me-2"></i>
                                                Ticket Title *
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="title"
                                                value={newTicketData.title}
                                                onChange={handleNewTicketInputChange}
                                                placeholder="Enter ticket title..."
                                                required
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-align-left me-2"></i>
                                                Description *
                                            </label>
                                            <textarea 
                                                className="form-control" 
                                                name="description"
                                                value={newTicketData.description}
                                                onChange={handleNewTicketInputChange}
                                                rows="4"
                                                placeholder="Describe the issue or request in detail..."
                                                required
                                            ></textarea>
                                        </div>

                                        {/* Reporter and Assignee */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-user me-2"></i>
                                                Reporter *
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="reporter"
                                                value={newTicketData.reporter}
                                                onChange={handleNewTicketInputChange}
                                                placeholder="Reporter name..."
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-user-cog me-2"></i>
                                                Assignee
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="assignee"
                                                value={newTicketData.assignee}
                                                onChange={handleNewTicketInputChange}
                                            >
                                                <option value="">Select assignee...</option>
                                                <option value="Sarah Johnson">Sarah Johnson</option>
                                                <option value="David Wilson">David Wilson</option>
                                                <option value="Lisa Anderson">Lisa Anderson</option>
                                                <option value="Christopher White">Christopher White</option>
                                                <option value="John Smith">John Smith</option>
                                                <option value="Amanda Thompson">Amanda Thompson</option>
                                                <option value="Jennifer Garcia">Jennifer Garcia</option>
                                                <option value="Robert Taylor">Robert Taylor</option>
                                            </select>
                                        </div>

                                        {/* Priority and Category */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-exclamation-triangle me-2"></i>
                                                Priority *
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="priority"
                                                value={newTicketData.priority}
                                                onChange={handleNewTicketInputChange}
                                                required
                                            >
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                                <option value="Critical">Critical</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-tags me-2"></i>
                                                Category *
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="category"
                                                value={newTicketData.category}
                                                onChange={handleNewTicketInputChange}
                                                required
                                            >
                                                <option value="Bug">Bug</option>
                                                <option value="Feature Request">Feature Request</option>
                                                <option value="Infrastructure">Infrastructure</option>
                                                <option value="Documentation">Documentation</option>
                                                <option value="Hardware">Hardware</option>
                                                <option value="Security">Security</option>
                                                <option value="Training">Training</option>
                                                <option value="Network">Network</option>
                                            </select>
                                        </div>

                                        {/* Department and Due Date */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-building me-2"></i>
                                                Department *
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="department"
                                                value={newTicketData.department}
                                                onChange={handleNewTicketInputChange}
                                                required
                                            >
                                                <option value="IT">IT</option>
                                                <option value="HR">HR</option>
                                                <option value="Finance">Finance</option>
                                                <option value="Marketing">Marketing</option>
                                                <option value="Operations">Operations</option>
                                                <option value="Sales">Sales</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-calendar-alt me-2"></i>
                                                Due Date
                                            </label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                name="dueDate"
                                                value={newTicketData.dueDate}
                                                onChange={handleNewTicketInputChange}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>

                                        {/* Tags */}
                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-tag me-2"></i>
                                                Tags
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="tags"
                                                value={newTicketData.tags}
                                                onChange={handleNewTicketInputChange}
                                                placeholder="Enter tags separated by commas (e.g., urgent, login, bug)"
                                            />
                                        </div>

                                        {/* Attachments */}
                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-paperclip me-2"></i>
                                                Attachments
                                            </label>
                                            <input 
                                                type="file" 
                                                className="form-control" 
                                                name="attachments"
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files).map(file => file.name).join(', ');
                                                    setNewTicketData(prev => ({...prev, attachments: files}));
                                                }}
                                                multiple
                                                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                                            />
                                            <div className="form-text">
                                                Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG, GIF
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    <i className="fas fa-times me-2"></i>
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    onClick={handleSaveNewTicket}
                                    disabled={!newTicketData.title || !newTicketData.description || !newTicketData.reporter}
                                >
                                    <i className="fas fa-save me-2"></i>
                                    Create Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    );
}
export default ListTicket;
