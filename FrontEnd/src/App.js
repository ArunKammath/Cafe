import "./style/App.css";
import "./style/reservation.css"
import "./style/onlineMenu.css"
import { Routes, Route } from "react-router-dom";
import {
  TopNav,
  HomePage,
  About,
  Contact,
} from "./components/main";
import { Reservations } from "./components/reservation";
import { OrderOnline } from "./components/onlineMenu";
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
      </Routes>
    </body>
  );
}

export default App;
