import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employee from './component/jadmin/EmployeeWorking';
import Login from './component/jadmin/login';
import Ticket from './component/jadmin/Ticket';
import 'bootstrap/dist/css/bootstrap.min.css';
import LiveStatus from './component/jadmin/LiveStatus';
import Dashboard from './component/jadmin//dashboard';
import Home from './component/Home';
import Contact from './component/Contact';
import  Payroll from './component/jadmin/payroll';
import  Attendance from './component/jadmin/Attendance';
import Location from './component/jadmin/Location';
import Customer from './component/jadmin/Customer';
import Products from './component/Products';
import ListTicket from './component/jadmin/ListTicket';
import ListProduct from './component/jadmin/ListProduct';
import ExpenseList from './component/jadmin/ExpenceList';
import Setting from './component/jadmin/Setting';
import Video from './component/jadmin/Video';
import AddCustomer from './component/jadmin/Addcustomer';

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/dashboard" exact={true} element={<Dashboard />}></Route>
        <Route path="/employee" exact={true} element={<Employee />}></Route>
        <Route path="/ListTicket" exact={true} element={<ListTicket />}></Route>
        <Route path="/liveStatus" exact={true} element={<LiveStatus />}></Route>
        <Route path="/logout" element={<Login />}></Route>
        <Route path="/jadmin" element={<Login />}></Route>
        <Route path="/payroll" element={<Payroll />}></Route>
        <Route path="/attendance" element={<Attendance />}></Route>
        <Route path="/location" element={<Location />}></Route>
        <Route path="/customer" element={<Customer />}></Route>
        <Route path="/" element={<Products />}></Route>
        <Route path="/listProduct" element={<ListProduct />}></Route>
        <Route path="/expenseList" element={<ExpenseList />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
        <Route path="/video" element={<Video />}></Route>
        <Route path="/addCustomer" element={<AddCustomer />}></Route>
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
