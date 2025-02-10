import PropTypes from "prop-types";
import { useState } from "react";

function KomentaroForma({ addComment, uzdID, mokID }) {
  const [komentaras, setKomentaras] = useState("");

  const handleSubmit = () => {
    addComment(mokID, uzdID, komentaras);
    setKomentaras("");
  }

  if (uzdID && mokID){
    return (
      <div className="flex gap-4 my-4">
        <input
          className=" w-full rounded-lg border-blue-500 indent-4 text-blue-900 shadow-lg focus:outline-none focus:ring focus:ring-blue-600"
          type="text"
          placeholder="Komentaro tekstas"
          value={komentaras}
          onChange={e => setKomentaras(e.target.value)}
          onSubmit={handleSubmit}
        />
        <button onClick={handleSubmit} className="min-w-[8rem] rounded-lg border-2 border-blue-600 bg-blue-500 text-blue-50 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-600">
          Pridėti
        </button>
      </div>
    );
  } else {
    return <></>
  }
}

KomentaroForma.propTypes = {
  addComment: PropTypes.func,
  uzdID: PropTypes.number,
  mokID: PropTypes.number,
};

export default KomentaroForma;
