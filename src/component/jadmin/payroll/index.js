import React, { useState, useRef } from 'react';
import Header from '../header';
import './payroll.css';
import Footer from '../Footer';
import homeIcon from '../../../assets/home-icon.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Payroll() {
    const [showModal, setShowModal] = useState(false);
    const [showPayslipModal, setShowPayslipModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEmployees, setSelectedEmployees] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const payslipRef = useRef();

    const handlePreview = (row) => {
        setModalData(row);
        setShowModal(true);
    };

    const handlePayslipPreview = (row) => {
        setModalData(row);
        setShowPayslipModal(true);
    };

    const handleCheckboxChange = (employeeId) => {
        const newSelected = new Set(selectedEmployees);
        if (newSelected.has(employeeId)) {
            newSelected.delete(employeeId);
        } else {
            newSelected.add(employeeId);
        }
        setSelectedEmployees(newSelected);
    };

    const handleSelectAll = () => {
        if (selectedEmployees.size === sampleData.length) {
            setSelectedEmployees(new Set());
        } else {
            setSelectedEmployees(new Set(sampleData.map(emp => emp.id)));
        }
    };

    const downloadPayslip = async (employee) => {
        setModalData(employee);
        setShowPayslipModal(true);

        // Wait for modal to render
        setTimeout(async () => {
            if (payslipRef.current) {
                const canvas = await html2canvas(payslipRef.current, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true
                });

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`Payslip_${employee.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 7)}.pdf`);

                setShowPayslipModal(false);
            }
        }, 500);
    };

    const sampleData = [
        {
            id: 1,
            name: "John Doe",
            department: "Engineering",
            position: "Senior Developer",
            employeeId: "EMP001",
            basicSalary: 50000,
            hra: 15000,
            transportAllowance: 5000,
            medicalAllowance: 3000,
            overtimePay: 2000,
            bonus: 5000,
            providentFund: 6000,
            tax: 8000,
            insurance: 2000,
            loan: 1000,
            other: 500
        },
        {
            id: 2,
            name: "Jane Smith",
            department: "Marketing",
            position: "Marketing Manager",
            employeeId: "EMP002",
            basicSalary: 45000,
            hra: 13500,
            transportAllowance: 4000,
            medicalAllowance: 2500,
            overtimePay: 1500,
            bonus: 4000,
            providentFund: 5400,
            tax: 7000,
            insurance: 1800,
            loan: 0,
            other: 200
        },
        {
            id: 3,
            name: "Mike Johnson",
            department: "Finance",
            position: "Financial Analyst",
            employeeId: "EMP003",
            basicSalary: 40000,
            hra: 12000,
            transportAllowance: 3500,
            medicalAllowance: 2000,
            overtimePay: 1000,
            bonus: 3500,
            providentFund: 4800,
            tax: 6000,
            insurance: 1500,
            loan: 2000,
            other: 300
        },
        {
            id: 4,
            name: "Sarah Wilson",
            department: "HR",
            position: "HR Specialist",
            employeeId: "EMP004",
            basicSalary: 38000,
            hra: 11400,
            transportAllowance: 3000,
            medicalAllowance: 1800,
            overtimePay: 800,
            bonus: 3000,
            providentFund: 4560,
            tax: 5500,
            insurance: 1400,
            loan: 500,
            other: 250
        },
        {
            id: 5,
            name: "David Brown",
            department: "IT Support",
            position: "IT Technician",
            employeeId: "EMP005",
            basicSalary: 35000,
            hra: 10500,
            transportAllowance: 2500,
            medicalAllowance: 1500,
            overtimePay: 600,
            bonus: 2500,
            providentFund: 4200,
            tax: 4800,
            insurance: 1200,
            loan: 1500,
            other: 200
        },
        {
            id: 6,
            name: "Emily Davis",
            department: "Sales",
            position: "Sales Executive",
            employeeId: "EMP006",
            basicSalary: 42000,
            hra: 12600,
            transportAllowance: 3500,
            medicalAllowance: 2200,
            overtimePay: 1200,
            bonus: 3800,
            providentFund: 5040,
            tax: 6500,
            insurance: 1600,
            loan: 800,
            other: 300
        },
        {
            id: 7,
            name: "Robert Taylor",
            department: "Operations",
            position: "Operations Manager",
            employeeId: "EMP007",
            basicSalary: 48000,
            hra: 14400,
            transportAllowance: 4500,
            medicalAllowance: 2800,
            overtimePay: 1800,
            bonus: 4500,
            providentFund: 5760,
            tax: 7500,
            insurance: 1900,
            loan: 1200,
            other: 400
        },
        {
            id: 8,
            name: "Lisa Anderson",
            department: "Design",
            position: "UI/UX Designer",
            employeeId: "EMP008",
            basicSalary: 41000,
            hra: 12300,
            transportAllowance: 3200,
            medicalAllowance: 2100,
            overtimePay: 1100,
            bonus: 3600,
            providentFund: 4920,
            tax: 6200,
            insurance: 1550,
            loan: 600,
            other: 280
        },
        {
            id: 9,
            name: "James Miller",
            department: "Quality Assurance",
            position: "QA Engineer",
            employeeId: "EMP009",
            basicSalary: 39000,
            hra: 11700,
            transportAllowance: 3000,
            medicalAllowance: 1900,
            overtimePay: 900,
            bonus: 3200,
            providentFund: 4680,
            tax: 5800,
            insurance: 1450,
            loan: 1000,
            other: 250
        },
        {
            id: 10,
            name: "Maria Garcia",
            department: "Customer Service",
            position: "Customer Success Manager",
            employeeId: "EMP010",
            basicSalary: 36000,
            hra: 10800,
            transportAllowance: 2800,
            medicalAllowance: 1700,
            overtimePay: 700,
            bonus: 2800,
            providentFund: 4320,
            tax: 5000,
            insurance: 1300,
            loan: 900,
            other: 220
        }
    ];

    // Calculate totals for each employee
    const enrichedData = sampleData.map(emp => {
        const totalEarnings = emp.basicSalary + emp.hra + emp.transportAllowance + emp.medicalAllowance + emp.overtimePay + emp.bonus;
        const totalDeductions = emp.providentFund + emp.tax + emp.insurance + emp.loan + emp.other;
        const netSalary = totalEarnings - totalDeductions;

        return {
            ...emp,
            totalEarnings,
            totalDeductions,
            netSalary
        };
    });

    // Filter data based on search term
    const filteredData = enrichedData.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ fontSize: '13px' }}>
            <Header />
        
                        <div className="demo-notice">
                            <p>🗺️ <strong> Payroll:</strong> Payroll.</p>
                  </div>

            {/* Controls Section */}
            <div className="payroll-controls">
                <div className="payroll-filters">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={{ fontSize: '13px', marginRight: '10px' }}
                    />
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ fontSize: '13px', padding: '4px 8px', marginRight: '10px', width: '200px' }}
                    />
                    <button className="payroll-btn" style={{ fontSize: '13px' }}>
                        Generate Payroll
                    </button>
                    <button
                        className="payroll-btn"
                        style={{ fontSize: '13px', backgroundColor: '#28a745', marginLeft: '5px' }}
                        onClick={() => {
                            if (selectedEmployees.size > 0) {
                                alert(`Processing payroll for ${selectedEmployees.size} selected employees`);
                            } else {
                                alert('Please select employees to process');
                            }
                        }}
                    >
                        <i className="fas fa-check"></i> Process Selected ({selectedEmployees.size})
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="payroll-summary">
                <div className="summary-card">
                    <h4>Total Employees</h4>
                    <p>{filteredData.length}</p>
                </div>
                <div className="summary-card">
                    <h4>Total Earnings</h4>
                    <p>${filteredData.reduce((sum, emp) => sum + emp.totalEarnings, 0).toLocaleString()}</p>
                </div>
                <div className="summary-card">
                    <h4>Total Deductions</h4>
                    <p>${filteredData.reduce((sum, emp) => sum + emp.totalDeductions, 0).toLocaleString()}</p>
                </div>
                <div className="summary-card">
                    <h4>Net Payroll</h4>
                    <p>${filteredData.reduce((sum, emp) => sum + emp.netSalary, 0).toLocaleString()}</p>
                </div>
            </div>

            <div className="payroll-table-container">
                <table className="payroll-table" style={{ fontSize: '12px' }}>
                    <thead>
                        <tr>
                            <th style={{ fontSize: '12px' }}>
                                <input
                                    type='checkbox'
                                    checked={selectedEmployees.size === filteredData.length && filteredData.length > 0}
                                    onChange={handleSelectAll}
                                    className='checkbox'
                                    style={{ width: '16px', height: '16px' }}
                                />
                            </th>
                            <th style={{ fontSize: '12px' }}>Emp ID</th>
                            <th style={{ fontSize: '12px' }}>Name</th>
                            <th style={{ fontSize: '12px' }}>Department</th>
                            <th style={{ fontSize: '12px' }}>Basic Salary</th>
                            <th style={{ fontSize: '12px' }}>Total Earnings</th>
                            <th style={{ fontSize: '12px' }}>Total Deductions</th>
                            <th style={{ fontSize: '12px' }}>Net Salary</th>
                            <th style={{ fontSize: '12px' }}>Status</th>
                            <th style={{ fontSize: '12px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((emp) => (
                            <tr key={emp.id}>
                                <td>
                                    <input
                                        type='checkbox'
                                        checked={selectedEmployees.has(emp.id)}
                                        onChange={() => handleCheckboxChange(emp.id)}
                                        className='checkbox'
                                        style={{ width: '16px', height: '16px' }}
                                    />
                                </td>
                                <td>{emp.employeeId}</td>
                                <td>{emp.name}</td>
                                <td>{emp.department}</td>
                                <td>${emp.basicSalary.toLocaleString()}</td>
                                <td>${emp.totalEarnings.toLocaleString()}</td>
                                <td>${emp.totalDeductions.toLocaleString()}</td>
                                <td style={{ fontWeight: 'bold', color: '#28a745' }}>
                                    ${emp.netSalary.toLocaleString()}
                                </td>
                                <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                    <span style={{ marginLeft: 6, verticalAlign: 'middle' }}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <circle cx="8" cy="8" r="8" fill="#4BB543" />
                                            <path d="M4 8.5L7 11.5L12 6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        className="payroll-btn"
                                        style={{ fontSize: '11px', marginRight: '5px' }}
                                        onClick={() => handlePreview(emp)}
                                    >
                                        <i className="fas fa-eye"></i> View
                                    </button>
                                    <button
                                        className="payroll-btn"
                                        style={{ fontSize: '11px', backgroundColor: '#17a2b8', marginRight: '5px' }}
                                        onClick={() => handlePayslipPreview(emp)}
                                    >
                                        <i className="fas fa-receipt"></i> Payslip
                                    </button>
                                    <button
                                        className="payroll-btn"
                                        style={{ fontSize: '11px', backgroundColor: '#dc3545' }}
                                        onClick={() => downloadPayslip(emp)}
                                    >
                                        <i className="fas fa-download"></i> PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Detailed View Modal */}
            {showModal && modalData && (
                <div className="payroll-modal-overlay">
                    <div className="payroll-modal payroll-detailed-modal">
                        <div className="modal-header">
                            <h2>Employee Payroll Details</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-content-grid">
                            <div className="employee-info">
                                <h3>Employee Information</h3>
                                <p><strong>Employee ID:</strong> {modalData.employeeId}</p>
                                <p><strong>Name:</strong> {modalData.name}</p>
                                <p><strong>Department:</strong> {modalData.department}</p>
                                <p><strong>Position:</strong> {modalData.position}</p>
                            </div>

                            <div className="earnings-section">
                                <h3>Earnings</h3>
                                <div className="earnings-grid">
                                    <div className="earning-item">
                                        <span>Basic Salary:</span>
                                        <span>${modalData.basicSalary.toLocaleString()}</span>
                                    </div>
                                    <div className="earning-item">
                                        <span>HRA:</span>
                                        <span>${modalData.hra.toLocaleString()}</span>
                                    </div>
                                    <div className="earning-item">
                                        <span>Transport Allowance:</span>
                                        <span>${modalData.transportAllowance.toLocaleString()}</span>
                                    </div>
                                    <div className="earning-item">
                                        <span>Medical Allowance:</span>
                                        <span>${modalData.medicalAllowance.toLocaleString()}</span>
                                    </div>
                                    <div className="earning-item">
                                        <span>Overtime Pay:</span>
                                        <span>${modalData.overtimePay.toLocaleString()}</span>
                                    </div>
                                    <div className="earning-item">
                                        <span>Bonus:</span>
                                        <span>${modalData.bonus.toLocaleString()}</span>
                                    </div>
                                    <div className="earning-item total">
                                        <span><strong>Total Earnings:</strong></span>
                                        <span><strong>${modalData.totalEarnings.toLocaleString()}</strong></span>
                                    </div>
                                </div>
                            </div>

                            <div className="deductions-section">
                                <h3>Deductions</h3>
                                <div className="deductions-grid">
                                    <div className="deduction-item">
                                        <span>Provident Fund:</span>
                                        <span>${modalData.providentFund.toLocaleString()}</span>
                                    </div>
                                    <div className="deduction-item">
                                        <span>Tax:</span>
                                        <span>${modalData.tax.toLocaleString()}</span>
                                    </div>
                                    <div className="deduction-item">
                                        <span>Insurance:</span>
                                        <span>${modalData.insurance.toLocaleString()}</span>
                                    </div>
                                    <div className="deduction-item">
                                        <span>Loan:</span>
                                        <span>${modalData.loan.toLocaleString()}</span>
                                    </div>
                                    <div className="deduction-item">
                                        <span>Other:</span>
                                        <span>${modalData.other.toLocaleString()}</span>
                                    </div>
                                    <div className="deduction-item total">
                                        <span><strong>Total Deductions:</strong></span>
                                        <span><strong>${modalData.totalDeductions.toLocaleString()}</strong></span>
                                    </div>
                                </div>
                            </div>

                            <div className="net-salary-section">
                                <h3>Net Salary</h3>
                                <div className="net-salary-amount">
                                    ${modalData.netSalary.toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="payroll-btn" onClick={() => setShowModal(false)}>Close</button>
                            <button
                                className="payroll-btn"
                                style={{ backgroundColor: '#17a2b8', marginLeft: '10px' }}
                                onClick={() => {
                                    setShowModal(false);
                                    handlePayslipPreview(modalData);
                                }}
                            >
                                View Payslip
                            </button>
                            <button
                                className="payroll-btn"
                                style={{ backgroundColor: '#dc3545', marginLeft: '10px' }}
                                onClick={() => {
                                    setShowModal(false);
                                    downloadPayslip(modalData);
                                }}
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payslip Modal */}
            {showPayslipModal && modalData && (
                <div className="payroll-modal-overlay">
                    <div className="payroll-modal payslip-modal">
                        <div className="modal-header">
                            <h2>Payslip Preview</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowPayslipModal(false)}
                                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div ref={payslipRef} className="payslip-content">
                            <div className="payslip-header">
                                <h2>COMPANY PAYSLIP</h2>
                                <p>Pay Period: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                            </div>

                            <div className="payslip-employee-info">
                                <div className="info-row">
                                    <div>
                                        <strong>Employee Name:</strong> {modalData.name}
                                    </div>
                                    <div>
                                        <strong>Employee ID:</strong> {modalData.employeeId}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div>
                                        <strong>Department:</strong> {modalData.department}
                                    </div>
                                    <div>
                                        <strong>Position:</strong> {modalData.position}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div>
                                        <strong>Pay Date:</strong> {new Date().toLocaleDateString()}
                                    </div>
                                    <div>
                                        <strong>Days Worked:</strong> 30
                                    </div>
                                </div>
                            </div>

                            <div className="payslip-breakdown">
                                <div className="earnings-column">
                                    <h3>EARNINGS</h3>
                                    <div className="payslip-item">
                                        <span>Basic Salary</span>
                                        <span>${modalData.basicSalary.toLocaleString()}</span>
                                    </div>
                                    <div className="payslip-item">
                                        <span>HRA</span>
                                        <span>${modalData.hra.toLocaleString()}</span>
                                    </div>
                                    <div className="payslip-item">
                                        <span>Transport Allowance</span>
                                        <span>${modalData.transportAllowance.toLocaleString()}</span>
                                    </div>
                                    <div className="payslip-item">
                                        <span>Medical Allowance</span>
                                        <span>${modalData.medicalAllowance.toLocaleString()}</span>
                                    </div>
                                    <div className="payslip-item">
                                        <span>Overtime Pay</span>
                                        <span>${modalData.overtimePay.toLocaleString()}</span>
                                    </div>
                                    <div className="payslip-item">
                                        <span>Bonus</span>
                                        <span>${modalData.bonus.toLocaleString()}</span>
                                    </div>
                                    <div className="payslip-item total">
                                        <span><strong>Total Earnings</strong></span>
                                        <span><strong>${modalData.totalEarnings.toLocaleString()}</strong></span>
                                    </div>
                                </div>

                                <div className="deductions-column">
                                    <h3>DEDUCTIONS</h3>
                                    <div className="payslip-item">
                                        <span>Provident Fund</span>
                                        <span>${modalData.providentFund.toLocaleString()}</span>
                                    </div>
                                    <div className="payslip-item">
                                        <span>Tax</span>
                                        <span>${modalData.tax.toLocaleString()}</span>
                                    </div>
                                    <div className="payslip-item">
                                        <span>Insurance</span>
                                        <span>${modalData.insurance.toLocaleString()}</span>
                                    </div>
                                    <div className="payslip-item">
                                        <span>Loan Deduction</span>
                                        <span>${modalData.loan.toLocaleString()}</span>
                                    </div>
                                    <div className="payslip-item">
                                        <span>Other Deductions</span>
                                        <span>${modalData.other.toLocaleString()}</span>
                                    </div>
                                    <div className="payslip-item">
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className="payslip-item total">
                                        <span><strong>Total Deductions</strong></span>
                                        <span><strong>${modalData.totalDeductions.toLocaleString()}</strong></span>
                                    </div>
                                </div>
                            </div>

                            <div className="payslip-net-pay">
                                <div className="net-pay-item">
                                    <span><strong>NET PAY</strong></span>
                                    <span><strong>${modalData.netSalary.toLocaleString()}</strong></span>
                                </div>
                            </div>

                            <div className="payslip-footer">
                                <p>This is a computer-generated payslip and does not require a signature.</p>
                                <p>Generated on: {new Date().toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="payroll-btn" onClick={() => setShowPayslipModal(false)}>Close</button>
                            <button
                                className="payroll-btn"
                                style={{ backgroundColor: '#dc3545', marginLeft: '10px' }}
                                onClick={() => downloadPayslip(modalData)}
                            >
                                <i className="fas fa-download"></i> Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Payroll;