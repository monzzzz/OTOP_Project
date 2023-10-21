export default function Sell_SmallDevice() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="Sell_Small_Device_Container">
      <form onSubmit={handleSubmit}>
        <input></input>
      </form>
    </div>
  );
}
