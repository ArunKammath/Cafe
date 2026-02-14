import "./style/App.css";
import "./style/reservation.css"
import "./style/onlineMenu.css"
import "./style/registration.css"
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import ReservationList from "./components/reservationList";
import OrderList from "./components/OrderList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setMenu } from "./components/menu";
import { fetchMenu } from "./components/onlineMenu";

function AppRoot(){
  const dispatch = useDispatch(); 
  const isInitialized = useSelector((state) => state.menu.isInitialized);
  useEffect(() => {
    if(!isInitialized){
      fetchMenu().then(menu => {
        dispatch(setMenu(menu));
      });
    }
  }, [dispatch, isInitialized]);

  if(!isInitialized){
    return <div>Loading...</div>;
  }

  return <App />
}

function App() {
  return (
    <BrowserRouter>
      <div id="pageLayout">
        <TopNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/orderonline" element={<OrderOnline />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/ReservationList" element={<ReservationList />} />
          <Route path="/OrderList" element={<OrderList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoot;
