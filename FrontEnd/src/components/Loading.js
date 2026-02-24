import "../style/loading.css";
import logo from "../images/logo.jpg";

function Loading({ message = "Loading..." }) {
  return (
    <div
      className="loading"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="loading__spinner">
        <img
          src={logo}
          alt=""
          className="loading__logo"
        />
      </div>
      <span className="loading__text">{message}</span>
    </div>
  );
}

export default Loading;