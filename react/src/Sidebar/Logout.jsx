// import PropTypes from "prop-types";
import { useContext } from "react";

import TokenContext from "../TokenContext";

function Logout() {
  const [, setToken] = useContext(TokenContext);

   const doLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken("");
  };

  return (
    <button onClick={doLogout} className="mt-2 px-2 py-1 w-full rounded-lg hover:bg-gray-500 hover:text-white transition duration-200 ease-in-out focus:outline-none" >
      Atsijungti
    </button>
  );
}

Logout.propTypes = {
};

export default Logout;
