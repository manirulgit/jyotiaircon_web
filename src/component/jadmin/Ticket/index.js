import Header from '../header';
import Nabvar from '../navbar';
import './Ticket.css';

function Ticket() {
    return (
        <div>
            <Header />

            <section className="content">
                <div className="box box-default">
                    <div className="box-header with-border">
                        <h3 className="box-title">Add Ticket</h3>
                    </div>
                    <form style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px', fontSize: '13px' }}>
                        <div className="box-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputUsername">First Name <span>*</span></label>
                                        <input name="firstName" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter name' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputMiddlename">Middle Name</label>
                                        <input name="middleName" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter name' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputLastname">Last Name <span>*</span></label>
                                        <input name="lastName" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter name' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Employeetype">Employee Type <span>*</span></label>
                                        <select className="form-control" style={{ marginBottom: '10px' }}>
                                            <option selected="selected">Select One</option>
                                            <option>Admin</option>
                                            <option>Supervisor</option>
                                            <option>Agent</option>
                                            <option>ScheduleAgent</option>
                                            <option>Specialist</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputLoginid">Login Id <span>*</span></label>
                                        <input name="loginId" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter name' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword">Password <span>*</span></label>
                                        <input name="password" type="password" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter password' />
                                    </div>
                                </div>

                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputAddress">Address 1 <span>*</span></label>
                                        <input name="address1" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter address' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputAddress2">Address 2 </label>
                                        <input name="address2" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter address' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input name="city" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter city' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="state">State</label>
                                        <input name="state" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter state' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pin">Pin Code</label>
                                        <input name="pin" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter pin code' />
                                    </div>
                                </div>

                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="country">Country</label>
                                        <input name="country" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter country' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="InputEmail">Email Address <span>*</span></label>
                                        <input name="email" type="email" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter email' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="offphone">Office Phone</label>
                                        <input name="officePhone" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter office phone' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="homephone">Home Phone</label>
                                        <input name="homePhone" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter home phone' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mobile">Mobile No. <span>*</span></label>
                                        <input name="mobile" className="form-control" style={{ marginBottom: '10px' }} placeholder='Enter mobile number' />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group" style={{ marginTop: '20px' }}>
                                <button type="button" className="btn btn-default btn-primary" style={{ marginRight: '10px' }}>
                                    <span className="glyphicon glyphicon-save"></span> Save
                                </button>
                                <button type="button" className="btn btn-default btn-primary">
                                    <span className="glyphicon glyphicon-arrow-left"></span> Back
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Ticket;