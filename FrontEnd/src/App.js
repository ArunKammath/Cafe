import "./style/App.css";
import "./style/reservation.css"
import "./style/onlineMenu.css"
import "./style/registration.css"
import { Routes, Route } from "react-router-dom";
import {
  TopNav,
  HomePage,
  About,
  Contact,
} from "./components/main";
import { Reservations } from "./components/reservation";
import { OrderOnline } from "./components/onlineMenu";
import { Login } from "./components/login";
import { Registration } from "./components/registration";
function App() {
  return (
    <body id="pageLayout">
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/orderonline" element={<OrderOnline />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </body>
  );
}

export default App;
