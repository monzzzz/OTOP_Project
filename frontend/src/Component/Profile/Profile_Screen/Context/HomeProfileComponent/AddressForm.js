import { useState, useEffect } from "react";
import { province_eng } from "../../../../../Data/Sell/Sell";
import { useHomeProfile } from "../../../../../Hook/Profile/useHomeProfile";
import "../../../../../Assets/style/Profile/Context/HomeProfileComponent/AddressForm.css";
import { useAuthContext } from "../../../../../Hook/Authentication/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import ContentLoader from "react-content-loader";

export default function AddressForm() {
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressCount, setAddressCount] = useState(0);
  const [displayAddAddress, setDisplayAddAddress] = useState(false);
  const {
    addAddress,
    getAddress,
    deleteAddress,
    homeError,
    addressList,
    isLoading,
  } = useHomeProfile();
  const { user } = useAuthContext();
  useEffect(() => {
    /**fetch the userAddress */
    if (user) {
      getAddress(user.id);
    }
  }, [user, addressCount]);
  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (user) {
      await addAddress(
        user.id,
        firstName,
        lastName,
        address,
        province,
        postalCode
      );
      setAddressCount((prevCount) => prevCount + 1);
      setDisplayAddAddress(false);
    }
  };

  const handleDeleteAddress = async (e, productId) => {
    e.preventDefault();
    if (user) {
      await deleteAddress(user.id, productId);
      setAddressCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Address</h2>
      {isLoading ? (
        <div>
          <ContentLoader viewBox="0 0 380 200">
            <rect x="0" y="0" rx="3" ry="3" width="380" height="40" />
            <rect x="0" y="50" rx="3" ry="3" width="380" height="40" />
            <rect x="0" y="100" rx="3" ry="3" width="380" height="40" />
          </ContentLoader>
        </div>
      ) : (
        <div>
          <div>
            {addressList &&
              addressList.map((address, index) => (
                <div className="each-profile-address d-flex" key={index}>
                  <div className="col-11">
                    <div className="profile-number-address">
                      Address {index + 1}
                    </div>
                    <div className="profile-address-name">
                      {address.firstName} {address.lastName}
                    </div>
                    <div>
                      {address.address}, {address.province} {address.postalCode}
                    </div>
                  </div>
                  <div className="py-2 col-1  d-flex justify-content-between">
                    <FontAwesomeIcon
                      className="profile-address-icon"
                      icon={faPencil}
                    />
                    <FontAwesomeIcon
                      className="profile-address-icon"
                      icon={faTrash}
                      onClick={(e) => handleDeleteAddress(e, address._id)}
                    />
                  </div>
                </div>
              ))}
          </div>
          {addressList.length > 0 &&
            addressList.length < 3 &&
            !displayAddAddress && (
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => setDisplayAddAddress(true)}
                  className="profile-add-address-button"
                >
                  Add Address
                </button>
              </div>
            )}
          {(addressList.length == 0 || displayAddAddress) && (
            <div>
              <div className="d-flex justify-content-end mt-5">
                <FontAwesomeIcon
                  className="profile-address-icon"
                  icon={faRemove}
                  onClick={() => setDisplayAddAddress(false)}
                ></FontAwesomeIcon>
              </div>
              <form className="mb-5">
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="col-5">
                      <label className="profile-subtopic-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="address-input"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="d-flex flex-column col-5">
                      <label className="profile-subtopic-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="address-input"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <label className="profile-subtopic-label">Address</label>
                  <input
                    type="text"
                    className="address-input"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between mb-3">
                  {/* <div className="col-3">
            <label className="profile-subtopic-label">City</label>
            <input
              type="text"
              className="address-input"
              onChange={(e) => setCity(e.target.value)}
            />
          </div> */}
                  <div className="d-flex flex-column col-6">
                    <label className="profile-subtopic-label">Province</label>
                    <select
                      className="address-input mb-3"
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
                  <div className="col-4">
                    <label className="profile-subtopic-label">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="address-input"
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={handleAddAddress}
                    className="profile-address-add-button"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
