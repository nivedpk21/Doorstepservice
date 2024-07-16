import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Userprofile from "./pages/Userprofile";
import Login from "./pages/Login";
import Buissnessprofile from "./pages/Buissnessprofile";
import Postjob from "./pages/Postjob";
import Viewjob from "./pages/Viewjob";
import Joblistings from "./pages/Joblistings";
import Verifications from "./pages/admin/Verifications";
import Buissnessverification from "./pages/admin/Buissnessverification";
import Searchservice from "./pages/user/Searchservice";
import Viewbuissnessprofile from "./pages/buissness/Viewbuissnessprofile";
import Jobapprovals from "./pages/admin/Jobapprovals";
import Viewjobapproval from "./pages/admin/Viewjobapproval";
import Buissnessonsearch from "./pages/user/Buissnessonsearch";
import Viewjoblisting from "./pages/buissness/Viewjoblisting";
import Viewapplicantslist from "./pages/user/Viewapplicantslist";
import Applicantprofile from "./pages/user/Applicantprofile";
import Applications from "./pages/buissness/Applications";
import Appointments from "./pages/buissness/Appointments";
import Userappointments from "./pages/user/Userappointments";
import Messages from "./pages/buissness/Messages";
import Viewmessage from "./pages/buissness/Viewmessage";
import Editjob from "./pages/user/Editjob";
import Bookservice from "./pages/user/Bookservice";
import Enquiries from "./pages/buissness/Enquiries";
import Singlejob from "./pages/user/Singlejob";
import Viewjobonsearch from "./pages/buissness/Viewjobonsearch";
import Usermessage from "./pages/user/Usermessage";
import Viewuserchat from "./pages/user/Viewuserchat";
import Viewapplication from "./pages/buissness/Viewapplication";
import Appointmentdetails from "./pages/buissness/Appointmentdetails";
import Bookings from "./pages/buissness/Bookings";
import Bookingdetails from "./pages/buissness/Bookingdetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/userprofile" element={<Userprofile />}></Route>
        <Route path="/searchservice" element={<Searchservice />}></Route>
        <Route path="/postjob" element={<Postjob />}></Route>
        <Route path="/viewjob" element={<Viewjob />}></Route>
        <Route path="/userappointments" element={<Userappointments />}></Route>
        <Route path="/buissnessprofile" element={<Buissnessprofile />}></Route>
        <Route path="/viewjoblistings" element={<Joblistings />}></Route>
        <Route path="/verifications" element={<Verifications />}></Route>
        <Route path="/buissnessverification/:id" element={<Buissnessverification />}></Route>
        <Route path="/viewbuissnessprofile" element={<Viewbuissnessprofile />}></Route>
        <Route path="/jobapprovals" element={<Jobapprovals />}></Route>
        <Route path="/viewjobapproval/:id" element={<Viewjobapproval />}></Route>
        <Route path="/viewbuissnessprofileonsearch/:id" element={<Buissnessonsearch />}></Route>
        <Route path="/viewjobdetails/:id" element={<Viewjoblisting />}></Route>
        <Route path="/viewapplicantslist/:id" element={<Viewapplicantslist />}></Route>
        <Route path="/viewapplicantprofile/:id/:jobid" element={<Applicantprofile />}></Route>
        <Route path="/applications" element={<Applications />}></Route>
        <Route path="/buissnessappointments" element={<Appointments />}></Route>
        <Route path="/buissnessmessages" element={<Messages />}></Route>
        <Route path="/viewmessage/:id" element={<Viewmessage />}></Route>
        <Route path="/editjob/:id" element={<Editjob />}></Route>
        <Route path="/bookservice/:id" element={<Bookservice />}></Route>
        <Route path="/enquiries" element={<Enquiries />}></Route>
        <Route path="/singlejob/:id" element={<Singlejob />}></Route>
        <Route path="/viewjobonsearch/:id" element={<Viewjobonsearch />}></Route>
        <Route path="/usermessages" element={<Usermessage />}></Route>
        <Route path="/viewuserchat/:id" element={<Viewuserchat />}></Route>
        <Route path="/viewapplication/:id" element={<Viewapplication />}></Route>
        <Route path="/appointmentdetalis/:id" element={<Appointmentdetails />}></Route>
        <Route path="/jobbookings" element={<Bookings />}></Route>
        <Route path="/bookingdetalis/:id" element={<Bookingdetails />}></Route>
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;
