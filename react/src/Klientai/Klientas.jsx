import PropTypes from "prop-types";

function Klientas({ klientas }) {
  const foto = (klientas.img ? klientas.img : "/images/nophoto.png");

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-1 md:p-4">{klientas.id}</td>
      <td className="px-1 md:p-4">
        <img
          src={foto}
          className="w-12 md:w-24 max-w-full max-h-full"
          alt={klientas.name}
        />
      </td>
      <td className="px-1 md:px-6 py-2 font-semibold text-gray-900 dark:text-white">
        {klientas.name}
      </td>
      <td className="px-1 md:px-6 py-2">{klientas.link}</td>
      <td className="px-1 md:px-6 py-2">{klientas.description}</td>
      <td className="px-1 md:px-6 py-2">
        <a
          href="#"
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
        >
          Trinti
        </a>
      </td>
    </tr>
  );
}

Klientas.propTypes = {
  klientas: PropTypes.shape({
    img: PropTypes.string,
    id: PropTypes.number,
    link: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default Klientas;
