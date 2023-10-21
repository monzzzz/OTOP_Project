import { useLogout } from "../../Hook/Authentication/useLogout";

export default function Profile() {
  const { logout } = useLogout();
  const handleClick = async () => {
    await logout();
  };
  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}
