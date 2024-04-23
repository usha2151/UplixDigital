import { BrowserRouter as Router,  Routes, Route } from "react-router-dom"
import Occasion from "./components/pages/Occasion/Occasion"
import SignUp from "./components/pages/form/SignUp"
import Settings from "./components/pages/form/Settings";
import User from "./components/pages/users/User";
import AddUserInfo from "./components/pages/form/AddUserInfo";
import { SignIn } from "./components/pages/form/SignIn";
import PrivateRoute from "./components/common/Protected";
import UserDashboard from "./components/pages/users/UserDashboad";
function App() {


  return (
    <>
    <Router>
      <Routes>
         <Route element={<PrivateRoute />}>
         <Route path="/user" element={<User />} />
         <Route path="/occasion" element={<Occasion />} />
            </Route>
         <Route path="/" element={<SignUp />} />
         <Route path="/signin" element={<SignIn />} />
         <Route path="/userDashboard" element={<UserDashboard />} />
         <Route path="/addUserInfo" element={<AddUserInfo />} />
         <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
