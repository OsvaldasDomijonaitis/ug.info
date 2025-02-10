// import PropTypes from "prop-types";
import Logout from "./Logout";

function User() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="max-w-[720px] mx-auto">
      <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
        <div className="relative flex items-center gap-4 pt-0 mx-0 mt-4 text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <h5 className="block font-sans antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {user.email}
              </h5>
            </div>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
              {["", "Vartotojas", "Administratorius"][user.role]}
            </p>
          </div>
        </div>
        <div className="p-0 mb-6">
          <Logout />
        </div>
      </div>
    </div>
  );
}

User.propTypes = {};

export default User;
