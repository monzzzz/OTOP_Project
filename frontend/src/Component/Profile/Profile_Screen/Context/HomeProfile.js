import { useLogout } from "../../../../Hook/Authentication/useLogout";
import "../../../../Assets/style/Profile/Context/Home_Profile.css";
import { useNavigate } from "react-router-dom";
import { useHomeProfile } from "../../../../Hook/Profile/useHomeProfile";
import { useState } from "react";
import { useAuthContext } from "../../../../Hook/Authentication/useAuthContext";
import AddressForm from "./HomeProfileComponent/AddressForm";
export default function HomeProfile() {
  // const [error, setError] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [showSucess, setShowSuccess] = useState(false);

  const { logout } = useLogout();
  const navigate = useNavigate();
  const { homeError, changeName } = useHomeProfile();
  const handleClickLogout = async () => {
    logout();
    navigate("/");
  };
  const { user, method } = useAuthContext();
  const handleChangeUsername = async (e) => {
    e.preventDefault();
    const onSuccess = () => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    };
    await changeName(user.id, method, newUsername, onSuccess);
  };

  return (
    <div className="home-profile-container">
      <h2 className="mb-4">Profile</h2>
      <div className="mb-5">
        <form className="username_form" onSubmit={handleChangeUsername}>
          <label className="profile-subtopic-label mb-2">Username</label>
          <div className="d-flex justify-content-between ">
            <div className="d-flex flex-column col-10">
              <input
                type="text"
                className="username_input"
                onChange={(e) => setNewUsername(e.target.value)}
              />
              {homeError && <p className="error">{homeError}</p>}
              {showSucess && !homeError && (
                <p className="updated-new-name-success">Updated successfully</p>
              )}
            </div>
            <button className="change-name-submit">Change</button>
          </div>
        </form>
      </div>
      <AddressForm />

      {/*render the user information, such as username and email. Allows them to change the username. */}
      <div className="d-flex justify-content-end mt-3">
        <button className="logout-button" onClick={handleClickLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
