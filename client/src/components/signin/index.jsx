import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/user";
import { DefaultContext } from "../../Context";

const Signin = () => {

  const navigate =  useNavigate();
  const {handleSetIsAuth, setEmail, setPassword, email, password, setUser} = useContext(DefaultContext);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnClick = () => {
    login(email, password, handleSetIsAuth);
    navigate('/')
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
          onClick={() => handleOnClick()}>
          SIGN IN
        </a>
      </form>
    </div>
  );
};

export default Signin;
