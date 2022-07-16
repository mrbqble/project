import TiktokIcon from "../imgs/tiktok.png";
import InstagramIcon from "../imgs/instagram.png";
import { useNavigate } from 'react-router-dom';

import './footer.css';

const Footer = () => {

    const links = [
        [
            {
                title: 'Get to know us',
            },     
            {
                title: 'About us',
                href: '/'
            },
            {
                title: 'Contact us',
                href: '/'
            },
            {
                title: 'See our financials',
                href: '/'
            },
        ],
        [
            {
                title: 'Take action!',
            },
            {
                title: 'Donate',
                href: '/'
            },
            {
                title: 'Shop our store',
                href: '/'
            },
            {
                title: 'Join the evergreen!',
                href: '/'
            },
        ],
        [
            {
                title: 'Our community',
            },
            {
                title: 'Our projects',
                href: '/'
            },
            {
                title: 'Upcoming events',
                href: '/'
            },
            {
                title: 'Become a volunteer',
                href: '/reg'
            },
        ],
    ];

    const message = 'made with love <3';

    const navigate = useNavigate();

    return (
        <div>
            <hr/>
            <div className="footer">
                {links.map((item, index) => 
                    <ul key = {index}>
                        {item.map((link, index) => 
                            <li key = {index} style = {{fontWeight: index ? '' : 'bold'}}>{index ? <a onClick={() => navigate(link.href)}>{link.title}</a> : <span>{link.title}</span> }</li>
                        )}
                    </ul>
                )}
                <ul className="last">
                    <li style={{fontWeight: 'bold'}}><p>NEW WAVE</p></li>
                    <li>© 2020</li>
                    <li>{message}</li>
                </ul>
                <ul>
                    <li>
                        <a href="/tiktok" target="_blank"><img src={TiktokIcon} alt="tiktok icon"/></a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/newwave_club"><img src={InstagramIcon} alt="instagram icon"/></a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Footer;