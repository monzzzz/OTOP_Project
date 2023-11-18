import { useLogout } from "../../../../Hook/Authentication/useLogout";
import "../../../../Assets/style/Profile/Context/Home_Profile.css";
export default function Home_Profile() {
  const { logout } = useLogout();

  const handleClickLogout = async () => {
    logout();
  };
  return (
    <div className="home-profile-container">
      <h2>Profile</h2>
      <form className="username_form">
        <label className="mb-1">Username</label>
        <div className="d-flex d-inline">
          <input type="text" className="username_input" />

          <button className="btn btn-primary ">Submit</button>
        </div>
      </form>

      {/*render the user information, such as username and email. Allows them to change the username. */}
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-primary" onClick={handleClickLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
