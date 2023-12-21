import { useLogout } from "../../../../Hook/Authentication/useLogout";
import "../../../../Assets/style/Profile/Context/Home_Profile.css";
import { useNavigate } from "react-router-dom";
import { useHome } from "../../../../Hook/Profile/useHome";
import { useState } from "react";
import { useAuthContext } from "../../../../Hook/Authentication/useAuthContext";
import { province_eng } from "../../../../Data/Sell/Sell";
export default function HomeProfile() {
  // const [error, setError] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [showSucess, setShowSuccess] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { homeError, changeName } = useHome();
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
      <h2 className="mb-4">Address</h2>
      <form className="mb-5">
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-3">
            <div className="col-5">
              <label className="profile-subtopic-label">First Name</label>
              <input
                type="text"
                className="username_input"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column col-5">
              <label className="profile-subtopic-label">Last Name</label>
              <input
                type="text"
                className="username_input"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <label className="profile-subtopic-label">Address</label>
          <input
            type="text"
            className="username_input"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between mb-3">
          <div className="col-3">
            <label className="profile-subtopic-label">City</label>
            <input
              type="text"
              className="username_input"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="d-flex flex-column col-4">
            <label className="profile-subtopic-label">Province</label>
            <select
              className=" sell-large-device-input mb-3"
              aria-label="Default select example"
              onChange={(e) => {
                setProvince(e.target.value);
              }}
              value={province}
            >
              <option value>-</option>
              {province_eng.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className="col-3">
            <label className="profile-subtopic-label">Postal Code</label>
            <input
              type="text"
              className="username_input"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button className="profile-address-add-button">Add</button>
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
