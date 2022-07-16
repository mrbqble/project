import { profile } from '../../actions/user';
import './profile.css';
import { DefaultContext } from "../../Context";
import { useContext, useEffect, useState } from "react";
import logo from "../imgs/nw.png";
import { useNavigate } from 'react-router-dom';
import { certificate } from '../certificate';

const Profile = () => {

    const navigate = useNavigate();
    const { email } = useContext(DefaultContext);
    const [user, setUser] = useState([]);

    useEffect(() => {
        profile(email).then(response => setUser(response));
    }, [])

    const year = new Date().getFullYear();

    const handleCertificate = () => {
        certificate(user.name, user.volunteeringHours, year, user.country, user.city, `CRTF-${year}-KZ-VOL-0078-${user.name.split()[0].toUpperCase()}`);
    }

    return (
        <div className="profile">
            <h1>Profile</h1>
            <div className='inf'>
                <div className='inf'>
                    <div className="data" style={{color: '#757575'}}>
                        <span>Full name: </span>
                        <span>E-mail:</span>
                        <span>City:</span>
                        <span>Country:</span>
                        <span>Affiliation:</span>
                        <span>Date of birth:</span>
                        <span>Grade/Course:</span>
                        <span>Phone number:</span>
                        <span>Instagram account:</span>
                        <span>Telegram username:</span>
                        <span>Volounteering hours:</span>
                    </div>
                    {user ? 
                    <div className='data' style={{color: 'black'}}>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span>{user.city}</span>
                        <span>{user.country}</span>
                        <span>{user.affiliation}</span>
                        <span>{user.dateOfBirth}</span>
                        <span>{user.grade}</span>
                        <span>{user.phoneNumber}</span>
                        <span>{user.instagram}</span>
                        <span>{user.telegram}</span>
                        <span>{user.volunteeringHours}</span>
                    </div> : <></>}
                </div>
                <div className='data' style={{marginLeft: "200px", gap: "10px"}}>
                    <img src={logo} alt="logo"/>
                    <a onClick={() => handleCertificate()} className='cert btn'>GET MY CERTIFICATE</a>
                    <a onClick={() => navigate("/")} className='join btn'>JOIN THE TELEGRAM GROUP</a>
                    <a onClick={() => navigate("/")} className='btn'>EDIT YOUR PROFILE</a>
                </div>
            </div>
        </div>
    );
}

export default Profile;