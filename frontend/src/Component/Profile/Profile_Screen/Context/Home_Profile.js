import { useLogout } from "../../../../Hook/Authentication/useLogout";
import "../../../../Assets/style/Profile/Context/Home_Profile.css";
import { useNavigate } from "react-router-dom";
export default function Home_Profile() {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleClickLogout = async () => {
    logout();
    navigate("/");
  };
  return (
    <div className="home-profile-container">
      <h2 className="mb-3">Profile</h2>
      <form className="username_form">
        <label className="mb-2">Username</label>
        <div className="d-flex d-inline">
          <input type="text" className="username_input" />

          <button className="change-name-submit">Change</button>
        </div>
      </form>

      {/*render the user information, such as username and email. Allows them to change the username. */}
      <div className="d-flex justify-content-end mt-3">
        <button className="logout-button" onClick={handleClickLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
