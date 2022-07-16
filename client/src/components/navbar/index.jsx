import './navbar.css';
import { DefaultContext } from "../../Context";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    
    const navigate = useNavigate();
    const { isAuth } = useContext(DefaultContext);

    return (
        <div className="navbar">
            <a onClick={() => navigate("/")} className="logo">NEW WAVE</a>
            <div className="links">
                <a onClick={() => navigate("/about")}>ABOUT US</a>
                <a onClick={() => navigate("/takeaction")}>TAKE ACTION!</a>
                <a onClick={() => navigate("/community")}>COMMUNITY</a>
                <a onClick={() => navigate("/projects")} style = {{color: "#0013BC", }}>OUR PROJECTS</a>
            </div>
            <div className="links">
                {isAuth ? <a onClick={() => navigate("/profile")}>PROFILE</a> : <a onClick={() => navigate("/signin")}>LOGIN</a>}
                <a onClick={() => navigate("/donate")} className="button">DONATE</a>
            </div>
        </div>
    );
}
export default Navbar;