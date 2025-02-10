// import PropTypes from 'prop-types';

import Button from "./Button";
import User from "./User";

function Sidebar() {
  return (
    <div className="flex-0 w-full md:w-48 bg-slate-100 p-4">
      <h3 className="text-center font-bold mb-2">Mokiniai</h3>
      <hr />
      <Button text="Klientai" active={true} />
      <Button text="Meniu 2" active={false} />
      <Button text="Meniu 3" active={false} />
      <hr />
      <User />
    </div>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
