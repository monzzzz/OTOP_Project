import "../../Assets/style/Sell/Sell_SmallDevice.css";
import { province_eng } from "../../Data/Sell/Sell";
import { category_eng } from "../../Data/Sell/Sell";
import { useState } from "react";
import useOffer from "../../Hook/Offer/useOffer";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
export default function Sell_SmallDevice() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [province, setProvince] = useState("");
  const [history, setHistory] = useState("");
  const [file, setFile] = useState();
  const { user } = useAuthContext();
  const { offer, isLoading } = useOffer();
  const id = user.id;
  const handleSubmit = (e) => {
    e.preventDefault();
    offer(title, id, price, category, province, history, file);
  };
  return (
    <div className="Sell_Small_Device_Container">
      <h2>Product Details</h2>
      <form className="px-3 py-2" onSubmit={handleSubmit}>
        <label className="mb-1">Title</label>
        <input
          type="text"
          className="form-control mb-3"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          required
        />
        <label className="mb-1">Price</label>
        <input
          type="number"
          className="form-control mb-3"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
          required
        />
        <label className="mb-1">Category</label>
        <select
          className="form-select mb-3"
          aria-label="Default select example"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
        >
          <option value>-</option>
          {category_eng.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </select>
        <label className="mb-1">Province</label>
        <select
          className="form-select mb-3"
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
        <label className="mb-1">History</label>
        <textarea
          type="text"
          className="form-control mb-3"
          onChange={(e) => {
            setHistory(e.target.value);
          }}
          value={history}
          maxLength={2000}
          required
        />
        <div className="mb-3">
          <label className="form-label">Picture</label>
          <input
            className="form-control"
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>
        <button disabled={isLoading} className="sell_submit_button">
          Submit
        </button>
      </form>
    </div>
  );
}
