import PropTypes from "prop-types";

function TaskLink({task, pasirinktaUzduotis, setPasirinktaUzduotis }) {
  let className =
    "border-transparent inline-flex items-center p-1 text-sm w-full text-center leading-5 border-b-2 group hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out focus:outline-none";

  if (pasirinktaUzduotis && task.id == pasirinktaUzduotis.id) {
    className =
      "border-transparent inline-flex items-center p-1 text-sm w-full text-center leading-5 border-b-2 font-medium group bg-blue-500 text-white transition duration-200 ease-in-out focus:outline-none";
  }

  const handleClick = () => {
    setPasirinktaUzduotis(task)
  }
  
  return (
    <button className={className} onClick={handleClick}>
      <span className="w-full text-center">{task.title}</span>
    </button>
  );
}

TaskLink.propTypes = {
  task: PropTypes.object,
    pasirinktaUzduotis: PropTypes.object,
    setPasirinktaUzduotis: PropTypes.func,
};

export default TaskLink;
