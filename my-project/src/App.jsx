import Home from "./component/Home";
import Login from "./component/Login";
import EmployeeList from "./component/EmployeeList";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateEmployee from "./component/CreateEmployee";
import EditEmployee from "./component/EditEmployee";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/employee-edit/:id" element={<EditEmployee />} /> {/* Updated route */}
        <Route path="/create-employee" element={<CreateEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
