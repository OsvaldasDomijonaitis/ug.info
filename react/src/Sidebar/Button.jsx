import PropTypes from "prop-types";

function Button({ text, active}) {
  let className =
    "mt-2 px-2 py-1 w-full rounded-lg hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out focus:outline-none";

  if (active) {
    className =
      "mt-2 px-2 py-1 w-full rounded-lg font-medium bg-blue-500 text-white transition duration-200 ease-in-out focus:outline-none";
  }

  return (
    <button className={className} >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
};

export default Button;
