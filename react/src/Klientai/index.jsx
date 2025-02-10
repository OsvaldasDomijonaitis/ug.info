import PropTypes from "prop-types";
import Klientas from "./Klientas";

const Klientai = ({ klientai }) => {
  return (
    <div className="flex w-full flex-col">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-3 md:px-6 py-3">
              #
            </th>
            <th scope="col" className="px-3 md:px-8 py-3">
              Foto
            </th>
            <th scope="col" className="px-3 md:px-6 py-3">
              Vardas
            </th>
            <th scope="col" className="px-3 md:px-6 py-3">
              Nuoroda
            </th>
            <th scope="col" className="px-3 md:px-6 py-3">
              Aprašymas
            </th>
            <th scope="col" className="px-3 md:px-6 py-3">
              Valdymas
            </th>
          </tr>
        </thead>
        <tbody>
          {klientai.map((klientas) => (
            <Klientas klientas={klientas} key={klientas.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Klientai.propTypes = {
  klientai: PropTypes.array,
};

export default Klientai;
