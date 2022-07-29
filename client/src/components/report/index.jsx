import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { report } from "../../actions/add";
import { DefaultContext } from "../../Context";
import "./report.css";

export const Report = () => {

    const {events, users} = useContext(DefaultContext);
    const [type, setType] = useState('Cleaning day');
    const [eventid, setEventId] = useState(0);
    const [bags, setBags] = useState(0);
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [distance, setDistance] = useState(0);
    const [addInf, setAddInf] = useState('');
    const [attended, setAttended] = useState(users);
    const types = ["Cleaning day", "Tree planting", "Shelter visiting"];
    const [search, setSearch] = useState('');

    useEffect(() => {
        setFilteredEvents(events ? events.filter(item => item.type === type) : []);
    }, [events, type]);

    useEffect(() => {
        setAttended(users)
    }, [users]);

    const handleItemCame = (index) => {
        attended[index].came = !attended[index].came;
    }

    const handleSendReport = () => {
        report(bags, type, filteredEvents[eventid]._id, addInf, attended.filter(user => user.came === true), distance, filteredEvents[eventid].coordinator);
    }

    const searchArray = users ? users.filter(item => item.name.substring(0, search.length).toLowerCase() === search.toLowerCase()) : [];
    
    const arraySF = !search ? users : searchArray;

    return (
        <div className="reg block">
            <h1>Report of the event</h1>
            <div className="inf" style={{alignItems: "normal"}}>
                <div className="eventinfo" style={{gap: "30px"}}>
                    <div className="inf" style={{alignItems: "normal", justifyContent: "left"}}>
                        <div className="data" style={{gap: "57px", paddingTop: "16px", marginRight: "40px"}}>
                            <span>Type:</span>
                            <span>Location:</span>
                            <span>Number of plastic bags used:</span>
                            <span>Distance cleaned:</span>
                            <span>Coordinator:</span>
                        </div>
                        <div className="data" style={{marginRight: "0px"}}>
                            <select
                                onChange={(event) => setType(event.target.value)}
                            >
                                {types.map((item, index) =>
                                    <option
                                        key={index}
                                        value={item}
                                    >{item}</option>
                                )}
                            </select>
                            <select
                                onChange={(event) => {
                                    setEventId(event.target.value);
                                }}
                            >
                                {filteredEvents 
                                    ? filteredEvents.map((item, index) => 
                                        <option
                                            key={index}
                                            value={index}
                                        >{item.location}</option>)
                                    : <></>}
                            </select>
                            <input type="text" value={bags} onChange={(event) => setBags(event.target.value)} maxLength="5"/>
                            <input type="text" value={distance} onChange={(event) => setDistance(event.target.value)} maxLength="5"/>
                            <span style={{marginTop: "12px"}}>{filteredEvents ? filteredEvents[eventid] ? filteredEvents[eventid].coordinator : "" : ""}</span>
                        </div>
                    </div>
                    <div className="data" style={{marginRight: "0px"}}>
                        <span>Additional information:</span>
                        <textarea name="Text1" rows="10" onChange={(event) => setAddInf(event.target.value)} style={{padding: "15px", fontSize: "18px"}}/>
                    </div>
                    <button className="cert btn" onClick={() => handleSendReport()}>SEND EVENT</button>
                </div>
                <div className="eventinfo table">
                    <input type="text" placeholder="Search for the volunteer" style={{margin: "0px"}} onChange={(event) => setSearch(event.target.value)}/>
                    <table>
                        <tr>
                            <th>№</th>
                            <th style={{textAlign: "left"}}>Name of volunteer</th>
                            <th>Came</th>
                        </tr>
                        {arraySF
                            ? arraySF.map((item, index) =>
                                <tr key={index} /*/</table>style={{backgroundColor: eventid ? filteredEvents[eventid].attended.filter(user => user.email === item.email) ? "red" : "#E5E8FF" : "#E5E8FF"}}/*/>
                                    <td>{index + 1}</td>
                                    <td style={{textAlign: "left"}}>{item.name}</td>
                                    <td><input type="checkbox" style={{margin: "0px", width: "auto"}} onChange={() => handleItemCame(index)}/></td>
                                </tr>
                            )
                            : <></>
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}