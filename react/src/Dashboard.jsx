// import PropTypes from "prop-types";
import Sidebar from "./Sidebar/Sidebar";
import Klientai from "./Klientai";
import Footer from "./Footer";
import { useContext, useEffect, useState } from "react";

import TokenContext from "./TokenContext";

function Dashboard() {
  const [klientai, setKlientai] = useState([]);

  const [token] = useContext(TokenContext);

  // klientų sąrašo užkrovimas iš API
  const loadKlientai = async () => {
    try {
      const response = await fetch("/api/v1/clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const masyvas = await response.json();

        setKlientai(masyvas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadKlientai();
    // loadComments();
  }, []);

  const footer_text = "Footer elemento tekstas";

  return (
    <div className="md:flex m-0 p-0 gap-3 md:h-screen">
      <Sidebar />
      <div className="flex-1 p-4 flex flex-col gap-3 ">
        <h1 className="text-center font-bold mb-2 flex-0">Klientų sąrašas</h1>
        <div className="flex-1">
          <Klientai klientai={klientai} />
        </div>
        <hr />
        <Footer className="flex-0" text={footer_text} />
      </div>
    </div>
  );
}

Dashboard.propTypes = {
};

export default Dashboard;
