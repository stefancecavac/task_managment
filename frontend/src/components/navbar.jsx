import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useUserContext();
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (

    user && (
      <header>
        {user.role.includes('manager') && <Link to='/newtask'>
          <span>New task</span>
        </Link>}

        {user.role.includes('manager') && <Link to='/manager'>
          <span>managment</span>
        </Link>}
        


        <Link to='/'>
          <p>{user.email}, {user.role}</p>
        </Link>

        <button className="logout" onClick={handleLogout}> logout </button>

      </header>
    )
  );
};

export default Navbar;
