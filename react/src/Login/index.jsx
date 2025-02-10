// import PropTypes from "prop-types";
import Foto from "./Foto";
import { useContext, useState } from "react";
import Alert from "./Alert";
import TokenContext from "../TokenContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerts, setAlerts] = useState([]);

  const [, setToken] = useContext(TokenContext);

  const removeAlert = (text) => {
    setAlerts(alerts.filter(value => value.msg != text));
  }
  // klientų sąrašo užkrovimas iš API
  const doLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(response);
      const data = await response.json();
      console.log(data);

      // klaida iš api serverio
      if (!response.ok) {
        if (data.error) {
          if (data.error.status && data.error.status == 400) {
            setAlerts(
              data.error.messages.map((value) => ({
                msg: value.msg,
                color: "orange",
              }))
            );
          } else {
            setAlerts([{ msg: data.error.messages, color: "red" }]);
          }
        }
      }

      if (data.status == "success") {
        setAlerts([{ msg: data.messages, color: "green" }]);
        
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("token", data.token);

        setTimeout(() => {
          setToken(data.token);
        }, 1000);
      }

      // jei viskas ok
      // log(data)

      // setKlientai(masyvas);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <Foto />
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <form onSubmit={doLogin}>
          {alerts.map((value, index) => (
            <Alert text={value.msg} color={value.color} removeAlert={removeAlert} key={index} />
          ))}

          <h1 className="text-2xl font-semibold mb-4">Prisijungti</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              El. paštas
            </label>
            <input
              type="text"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Slaptažodis
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Prisijungti
          </button>
          <div className="mt-6 text-blue-500 text-center">
            <a href="#" className="hover:underline">
              Užsiregistruoti
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
};

export default Login;
