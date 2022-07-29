import './navbar.css';
import { useContext } from "react";
import { DefaultContext } from "../../../Context";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    
    const navigate = useNavigate();
    const {isAuth, handleSetIsAuth, setUser, setToken} = useContext(DefaultContext);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken('');
        handleSetIsAuth();
        setUser([]);
        navigate('/')
    }

    return (
        <div className="navbar">
            <a
                className="logo"
                onClick={() => navigate("/")}
            >NEW WAVE</a>
            <div className="links">
                <a onClick={() => navigate("/")} href="#about">ABOUT US</a>
                <a onClick={() => navigate("/")} href="#takeaction">TAKE ACTION!</a>
                <a onClick={() => navigate("/")} href="#community">COMMUNITY</a>
                <a
                    onClick={() => navigate("/projects")}
                    style={{
                        color: "#0013BC"
                }}>OUR PROJECTS</a>
            </div>
            <div className="links">
                {isAuth
                    ? <><a onClick={() => navigate("/profile")}>PROFILE</a>
                    <a onClick={() => handleLogOut()}>LOG OUT</a></>
                    : <a onClick={() => navigate("/signin")}>LOGIN</a>}
                <a
                    className="button"
                    onClick={() => navigate("/donate")}
                >DONATE</a>
            </div>
        </div>
    );
};