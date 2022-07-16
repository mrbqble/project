import './carousel.css';
import { useState, useEffect } from 'react';
import bluearr from "../imgs/bluearr.png";
import bluearr2 from "../imgs/bluearr2.png";
import { getEvents } from '../../actions/user';

const Carousel = () => {

    const [events, setEvents] = useState();
    const [current, setCurrent] = useState(0);

    const handleNextEvent = () => {
        setCurrent((current + 1) % events.length);
    };

    const handlePrevEvent = () => {
        setCurrent(current ? (current - 1) % events.length : events.length - 1);
    }

    useEffect(() => {
        getEvents().then((response) => {
            setEvents(response);
        })
    }, [])

    return (
        <div className='container'>
            {events ? 
            <><div className='eventinfo'>
                <h1 style={{marginBottom: '40px', textAlign: 'left'}}>{events[current].title}<br/><font>{events[current].subtitle}</font></h1>
                <div style = {{marginLeft: '5vw', marginBottom: '6vh'}}>
                    <p className='text'>{events[current].text}</p>
                    <p style={{marginBottom: '40px'}}>{events[current].subtext}</p>
                    <h2>{events[current].month} <font>{events[current].day}</font></h2>
                </div>
                <a href="/more" className='link'>LEARN MORE <img src={bluearr} alt="blue arrow" className='arr'/></a>
            </div>
            <div className='eventimages'>
                <div style={{marginRight: '10vw'}}>
                    <h2 className='eventnumber'>0{current + 1}</h2>
                    <img src={events[current].image} alt="event" className='image'/>
                    <div>
                        <button
                            className='link'
                            style={{backgroundColor: 'white'}}
                            onClick={() => handlePrevEvent()}    
                        ><img src={bluearr2} alt="blue arr" className='arr'/></button>
                        <button
                            className='link'
                            style={{backgroundColor: '#D0D5FF'}}
                            onClick={() => handleNextEvent()}    
                        >NEXT <img src={bluearr} alt="blue arr" className='arr' style={{marginLeft: '10px'}}/></button>
                    </div>
                </div>
                <div>
                    <h2 className='eventnumber'>0{(current + 2) <= events.length ? current + 2 : 1}</h2>
                    <img src={events[(current + 1) % events.length].image} alt="event" className='image'/>
                </div>
            </div></> : <></>}
        </div>
    );
}
 
export default Carousel;