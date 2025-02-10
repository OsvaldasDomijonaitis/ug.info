import PropTypes from "prop-types";

function Alert({ text, color, removeAlert }) {
  // text-red-900 text-green-900 text-orange-900
  // bg-green-100 bg-red-100 bg-orrange-100
  const classes = `font-regular relative block w-full rounded-lg bg-${color}-100 p-4 mb-2 text-base leading-5  text-${color}-900 opacity-100`;

  return (
    <div className={classes} data-dismissible="alert">
      <div className="mr-12">{text}</div>
      <div
        className="absolute top-2.5 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20"
        data-dismissible-target="alert"
      >
        <div
          role="button"
          className="w-max rounded-lg p-1"
          onClick={() => removeAlert(text)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

Alert.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  removeAlert: PropTypes.func,
};

export default Alert;
