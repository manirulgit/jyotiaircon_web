import React, { useState } from 'react'; 
import './Addcustomer.css';
import Header from '../header';
import Footer from '../Footer';

function AddCustomer() {
    const [customerData, setCustomerData] = useState({
        customerName: '',
        companyName: '',
        email: '',
        phone: '',
        alternatePhone: '',
        website: '',
        gstNumber: '',
        panNumber: '',
        customerType: 'Individual',
        billingAddress: '',
        shippingAddress: '',
        city: '',
        state: '',
        country: 'India',
        pincode: '',
        contactPerson: '',
        designation: '',
        notes: '',
        paymentTerms: '30 days',
        creditLimit: '',
        status: 'Active'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create customer object with timestamp
        const newCustomer = {
            id: Date.now(), // Simple ID generation
            ...customerData,
            createdDate: new Date().toISOString().split('T')[0],
            createdBy: 'Current User' // In real app, get from auth context
        };

        // Log the customer data (in real app, send to API)
        console.log('New Customer Data:', JSON.stringify(newCustomer, null, 2));
        
        // Show success message
        alert(`Customer "${newCustomer.customerName}" created successfully!\n\nCustomer ID: ${newCustomer.id}`);
        
        // Reset form
        setCustomerData({
            customerName: '',
            companyName: '',
            email: '',
            phone: '',
            alternatePhone: '',
            website: '',
            gstNumber: '',
            panNumber: '',
            customerType: 'Individual',
            billingAddress: '',
            shippingAddress: '',
            city: '',
            state: '',
            country: 'India',
            pincode: '',
            contactPerson: '',
            designation: '',
            notes: '',
            paymentTerms: '30 days',
            creditLimit: '',
            status: 'Active'
        });
    };

    return (
        <div className="add-customer-page">
            <Header />
            
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow-lg border-0">
                            <div className="card-header bg-primary text-white">
                                <h3 className="mb-0">
                                    <i className="fas fa-user-plus me-2"></i>
                                    Add New Customer
                                </h3>
                            </div>
                            
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {/* Basic Information Section */}
                                        <div className="col-12 mb-4">
                                            <h5 className="section-title">
                                                <i className="fas fa-info-circle me-2"></i>
                                                Basic Information
                                            </h5>
                                        </div>

                                        {/* Customer Name and Company Name */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-user me-2"></i>
                                                Customer Name *
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="customerName"
                                                value={customerData.customerName}
                                                onChange={handleInputChange}
                                                placeholder="Enter customer name..."
                                                required 
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-building me-2"></i>
                                                Company Name
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="companyName"
                                                value={customerData.companyName}
                                                onChange={handleInputChange}
                                                placeholder="Enter company name..."
                                            />
                                        </div>

                                        {/* Customer Type and Contact Person */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-tag me-2"></i>
                                                Customer Type
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="customerType"
                                                value={customerData.customerType}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Individual">Individual</option>
                                                <option value="Business">Business</option>
                                                <option value="Corporate">Corporate</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-user-tie me-2"></i>
                                                Contact Person
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="contactPerson"
                                                value={customerData.contactPerson}
                                                onChange={handleInputChange}
                                                placeholder="Enter contact person name..."
                                            />
                                        </div>

                                        {/* Designation and Status */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-id-badge me-2"></i>
                                                Designation
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="designation"
                                                value={customerData.designation}
                                                onChange={handleInputChange}
                                                placeholder="Enter designation..."
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-toggle-on me-2"></i>
                                                Status
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="status"
                                                value={customerData.status}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>

                                        {/* Contact Information Section */}
                                        <div className="col-12 mb-4 mt-4">
                                            <h5 className="section-title">
                                                <i className="fas fa-phone me-2"></i>
                                                Contact Information
                                            </h5>
                                        </div>

                                        {/* Email and Phone */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-envelope me-2"></i>
                                                Email Address *
                                            </label>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                name="email"
                                                value={customerData.email}
                                                onChange={handleInputChange}
                                                placeholder="Enter email address..."
                                                required 
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-phone me-2"></i>
                                                Phone Number *
                                            </label>
                                            <input 
                                                type="tel" 
                                                className="form-control" 
                                                name="phone"
                                                value={customerData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Enter phone number..."
                                                required 
                                            />
                                        </div>

                                        {/* Alternate Phone and Website */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-phone-alt me-2"></i>
                                                Alternate Phone
                                            </label>
                                            <input 
                                                type="tel" 
                                                className="form-control" 
                                                name="alternatePhone"
                                                value={customerData.alternatePhone}
                                                onChange={handleInputChange}
                                                placeholder="Enter alternate phone..."
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-globe me-2"></i>
                                                Website
                                            </label>
                                            <input 
                                                type="url" 
                                                className="form-control" 
                                                name="website"
                                                value={customerData.website}
                                                onChange={handleInputChange}
                                                placeholder="Enter website URL..."
                                            />
                                        </div>

                                        {/* Address Information Section */}
                                        <div className="col-12 mb-4 mt-4">
                                            <h5 className="section-title">
                                                <i className="fas fa-map-marker-alt me-2"></i>
                                                Address Information
                                            </h5>
                                        </div>

                                        {/* Billing Address */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-file-invoice me-2"></i>
                                                Billing Address
                                            </label>
                                            <textarea 
                                                className="form-control" 
                                                name="billingAddress"
                                                value={customerData.billingAddress}
                                                onChange={handleInputChange}
                                                rows="3"
                                                placeholder="Enter billing address..."
                                            ></textarea>
                                        </div>
                                        {/* Shipping Address */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-shipping-fast me-2"></i>
                                                Shipping Address
                                            </label>
                                            <textarea 
                                                className="form-control" 
                                                name="shippingAddress"
                                                value={customerData.shippingAddress}
                                                onChange={handleInputChange}
                                                rows="3"
                                                placeholder="Enter shipping address..."
                                            ></textarea>
                                        </div>

                                        {/* City and State */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-city me-2"></i>
                                                City
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="city"
                                                value={customerData.city}
                                                onChange={handleInputChange}
                                                placeholder="Enter city..."
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-map me-2"></i>
                                                State
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="state"
                                                value={customerData.state}
                                                onChange={handleInputChange}
                                                placeholder="Enter state..."
                                            />
                                        </div>

                                        {/* Country and Pincode */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-flag me-2"></i>
                                                Country
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="country"
                                                value={customerData.country}
                                                onChange={handleInputChange}
                                                placeholder="Enter country..."
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-mail-bulk me-2"></i>
                                                Pincode
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="pincode"
                                                value={customerData.pincode}
                                                onChange={handleInputChange}
                                                placeholder="Enter pincode..."
                                            />
                                        </div>

                                        {/* Business Information Section */}
                                        <div className="col-12 mb-4 mt-4">
                                            <h5 className="section-title">
                                                <i className="fas fa-briefcase me-2"></i>
                                                Business Information
                                            </h5>
                                        </div>

                                        {/* GST Number and PAN Number */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-receipt me-2"></i>
                                                GST Number
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="gstNumber"
                                                value={customerData.gstNumber}
                                                onChange={handleInputChange}
                                                placeholder="Enter GST number..."
                                                style={{textTransform: 'uppercase'}}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-credit-card me-2"></i>
                                                PAN Number
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="panNumber"
                                                value={customerData.panNumber}
                                                onChange={handleInputChange}
                                                placeholder="Enter PAN number..."
                                                style={{textTransform: 'uppercase'}}
                                            />
                                        </div>

                                        {/* Payment Terms and Credit Limit */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-calendar-check me-2"></i>
                                                Payment Terms
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="paymentTerms"
                                                value={customerData.paymentTerms}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Immediate">Immediate</option>
                                                <option value="15 days">15 days</option>
                                                <option value="30 days">30 days</option>
                                                <option value="45 days">45 days</option>
                                                <option value="60 days">60 days</option>
                                                <option value="90 days">90 days</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-money-bill-wave me-2"></i>
                                                Credit Limit
                                            </label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="creditLimit"
                                                value={customerData.creditLimit}
                                                onChange={handleInputChange}
                                                placeholder="Enter credit limit..."
                                            />
                                        </div>

                                        {/* Notes */}
                                        <div className="col-12 mb-4">
                                            <label className="form-label">
                                                <i className="fas fa-sticky-note me-2"></i>
                                                Notes
                                            </label>
                                            <textarea 
                                                className="form-control" 
                                                name="notes"
                                                value={customerData.notes}
                                                onChange={handleInputChange}
                                                rows="4"
                                                placeholder="Enter additional notes..."
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* Submit Buttons */}
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex gap-3 justify-content-end">
                                                <button 
                                                    type="button" 
                                                    className="btn btn-secondary"
                                                    onClick={() => window.history.back()}
                                                >
                                                    <i className="fas fa-arrow-left me-2"></i>
                                                    Cancel
                                                </button>
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary"
                                                    disabled={!customerData.customerName || !customerData.email || !customerData.phone}
                                                >
                                                    <i className="fas fa-user-plus me-2"></i>
                                                    Add Customer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default AddCustomer;