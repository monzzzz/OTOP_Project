import { useLogout } from "../../../../Hook/Authentication/useLogout";
export default function Home_Profile() {
  const { logout } = useLogout();

  const handleClickLogout = async () => {
    logout();
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={handleClickLogout}>
        Logout
      </button>
    </div>
  );
}
