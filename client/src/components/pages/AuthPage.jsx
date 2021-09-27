import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";

const AuthPage = () => {
  const auth = React.useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  React.useEffect(() => {
    window.M.updateTextFields();
  }, []);

  React.useEffect(() => {
    message(error);
    // clearError();
    setTimeout(clearError, 3000);
    return () => {
      clearTimeout(clearError);
    };
  }, [error, message, clearError]);

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (error) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
      console.log(data.token, data.userId, auth);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten the link</h1>

        <div className="row">
          <div className="card blue darken-1">
            <div className="card-content white-text">
              <span className="card-title">Authenticate</span>
              <div>
                <div className="input-field">
                  <input
                    value={form.email}
                    placeholder="Enter email"
                    id="email"
                    type="text"
                    className="yellow-input"
                    name="email"
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input
                    value={form.password}
                    placeholder="Enter password"
                    id="password"
                    type="password"
                    className="yellow-input"
                    name="password"
                    onChange={changeHandler}
                  />
                  <label htmlFor="password">password</label>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                style={{ marginRight: 10 }}
                onClick={registerHandler}
                disabled={loading}
              >
                Authenticated
              </button>
              <button
                className="btn grey lighten-1 black-text"
                disabled={loading}
                onClick={loginHandler}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
