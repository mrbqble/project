import "./event.css"
import { useContext } from "react";
import { DefaultContext } from "../../../Context";
import { getEvents } from '../../../actions/add';
import { attend, leave } from "../../../actions/add";
import { useState } from "react";
import bluearr from "../../imgs/bluearr.png";
import { useEffect } from "react";

export const Event = () => {

    const {user, setEvents, events, current, setCurrent} = useContext(DefaultContext);
    const [isAttended, setIsAttended] = useState(events[current].attended.find(item => item.email === user.email) ? true : false);

    const handleAttend = () => {
        if (user.email && !isAttended) {
            attend(user.email, user.name, events[current]._id).then(() => {
                setIsAttended(true);
                getEvents().then(response => setEvents(response));
            }
            );
        } else {
            alert("Для регистрации на мероприятия вам нужно войти в свою учетную запись. Пожалуйста, повторите попытку после того как выполните вход.")
        }
    }

    const handleNextEvent = () => {
        setCurrent((current + 1) % events.length);
    };

    const handlePrevEvent = () => {
        setCurrent(current ? (current - 1) % events.length : events.length - 1)
    };

    const handleLeave = () => {
        leave(user.email, events[current]._id).then(() => {
            setIsAttended(false);
            getEvents().then(response => setEvents(response));
        });
    }

    useEffect(() => {
        setIsAttended(events[current].attended.find(item => item.email === user.email) ? true : false);
    }, [current])

    return (
        <div className="reg">
            {events
                ? <div className="container event block" style={{justifyContent: "space-between", marginLeft: "0px"}}>
                    <div style={{height: "90vh"}} className="inf">
                        <a onClick={() => handlePrevEvent()}>
                            <img
                                src={bluearr}
                                alt="blue arr"
                                className='arr'
                                style={{
                                    transform: "rotate(180deg)"
                            }}/>
                        </a>
                    </div>
                    <div className="eventinfo" style={{gap: "40px"}}>
                        <h1>
                            {events[current].title}<br/>
                            <font>{events[current].subtitle}</font>
                        </h1>
                        <div>
                            <p className='text'>{events[current].text}</p>
                            <p>{events[current].subtext}</p>
                        </div>
                        <div>
                            <p className="text">City: <font>{events[current].city}</font></p>
                            <p className="text">Date: <font>{events[current].date}</font></p>
                            <p className="text" style={{marginBottom: "0px"}}>Volunteering hours: <font>{events[current].hours}</font></p>
                        </div>
                        <div>
                            <p className="text">Volunteers needed: <font>{events[current].places}</font></p>
                            <p className="text" style={{marginBottom: "0px"}}>Available places: <font>{events[current].places - events[current].attended.length}</font></p>
                        </div>
                        {isAttended
                            ? <a className="join btn" onClick={() => handleLeave()}>LEAVE EVENT</a>
                            : <a className="cert btn" onClick={() => handleAttend()}>ATTEND EVENT</a>
                        }
                        <div>
                            <p className="text">List of volunteers attending the event:</p>
                            <div className="list">
                                {events[current].attended.map((item, index) => 
                                    <div key={index}>
                                        <p className="text" style={{marginBottom: "0px"}}>{index + 1}. {item.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="eventinfo">
                        <img src={events[current].image} alt="event" style={{height: '770px', width: "770px"}}/>
                    </div>
                    <div style={{height: "90vh"}} className="inf">
                        <a onClick={() => handleNextEvent()}>
                            <img src={bluearr} className="arr" alt="blue arr"/>
                        </a>
                    </div>
                </div>
                : <></>
            }
        </div>
    );
};