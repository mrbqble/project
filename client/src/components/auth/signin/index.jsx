import { useContext } from "react";
import { login, profile } from "../../../actions/user";
import { useNavigate } from "react-router-dom";
import { DefaultContext } from "../../../Context";

export const Signin = () => {

  const {
    email,
    password,
    setUser,
    token,
    user,
    users,
    setEmail,
    setPassword,
    handleSetIsAuth,
  } = useContext(DefaultContext);
  const navigate =  useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnClick = () => {
    if (users.find(item => item.email === email)){
      login(
        email,
        password,
        handleSetIsAuth
      ).then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          profile(email, token).then(response => {
            setUser(response);
            localStorage.setItem('user', user);
            navigate('/');
          });
        }
      });
    } else {
      alert("User not found");
    }
  };

  return (
    <div className="reg">
      <h1>Sign in</h1>
      <form action="post">
        <div>
          <p>E-mail</p>
          <input
            type="text"
            onChange={handleEmail}
            placeholder="example@mail.com"
          />
          <p>Enter a password</p>
          <input
            type="password"
            onChange={handlePassword}
            placeholder="Your password"
          />
        </div>
        <a
          className="button"
          onClick={() => handleOnClick()}
        >SIGN IN</a>
      </form>
    </div>
  );
};
