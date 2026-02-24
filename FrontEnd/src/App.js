import { lazy, Suspense } from "react";
import "./style/App.css";
import "./style/reservation.css"
import "./style/onlineMenu.css"
import "./style/registration.css"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { TopNav } from "./components/main";
import Loading from "./components/Loading";

const HomePage = lazy(() =>
  import("./components/main").then((m) => ({ default: m.HomePage }))
);
const About = lazy(() =>
  import("./components/main").then((m) => ({ default: m.About }))
);
const Contact = lazy(() =>
  import("./components/main").then((m) => ({ default: m.Contact }))
);
const Reservations = lazy(() =>
  import("./components/reservation").then((m) => ({ default: m.Reservations }))
);
const OrderOnline = lazy(() =>
  import("./components/onlineMenu").then((m) => ({ default: m.OrderOnline }))
);
const Login = lazy(() =>
  import("./components/login").then((m) => ({ default: m.Login }))
);
const Registration = lazy(() =>
  import("./components/registration").then((m) => ({ default: m.Registration }))
);
const ReservationList = lazy(() => import("./components/reservationList"));
const OrderList = lazy(() => import("./components/OrderList"));

function App() {
  return (
    <BrowserRouter>
      <div id="pageLayout">
        <TopNav />
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
