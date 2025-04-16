import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "@/UserContext";

export function Login() {
  const [user, setUser, token, setToken] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
  } 

  const empty = obj => {
    if (!obj) return true;
    if (Boolean(obj) === false) return true;
    return Object.keys(obj).length === 0;
  };
  
  useEffect(() => {
    // console.log("user", user, empty(user));
    if (!empty(user)) {
      navigateToProfile();
      return;
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("prisijungimo apdorojimas");

    // {
    //   "email": "varyt@gmail.com",
    //   "password": "sssss"
    // }

    // http://localhost/login

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status == "401") {
      console.log("Neteisingi prisijungimo duomenys");
      return;
    }
    if (!response.ok) {
      console.log("Nepavyko prisijungti");
      return;
    }
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (response.status == "400") {
      console.log(data.msg);
      return;
    }

    if (Boolean(data.token) && Boolean(data.user)) {
      console.log(data.token);
      console.log(data.user);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      console.log("Prisijungta");
      setTimeout(() => {
        navigateToProfile();
      }, 1000);
    } else {
      console.log("Nepavyko prisijungti");
    }
  }

  const handleUser = () => {
    setEmail("user@example.com");
    setPassword("password"); 
  }
  const handleAdmin = () => {
    setEmail("admin@example.com");
    setPassword("password"); 
  }

  const alerts = ["gray", "green", "orange", "red"];
  const [showAlerts, setShowAlerts] = useState({
      blue: true,
      green: true,
      orange: true,
      red: true,
    });

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Link to="/">
            <Typography variant="h2" className="font-bold mb-4">UG info</Typography>
          </Link>
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            <Button size="sm" variant="text" className="mx-1" onClick={handleUser}>User</Button>
            <Button size="sm" variant="text" className="mx-1" onClick={handleAdmin}>Admin</Button>
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            {alerts.map((color) => (
                <Alert
                  key={color}
                  open={showAlerts[color]}
                  color={color}
                  onClose={() => setShowAlerts((current) => ({ ...current, [color]: false }))}
                >
                  A simple {color} alert with an <a href="#">example link</a>. Give
                  it a click if you like.
              </Alert>
            ))}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => {
              setPassword(e.target.value);
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth type="submit">
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/register" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default Login;
