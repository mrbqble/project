import { useState } from "react";
import { check } from "../../actions/add";

export const Verificator = () => {

    const [code, setCode] = useState('');
    const [data, setData] = useState();
    const [year, setYear] = useState('');

    const handleCheck = () => {
        if (code) {
            check(code).then(response => {
                setData(response);
                console.log(data);
                setYear(code.split('-')[1]);
            });
        } else {
            alert("Введите сначала код!");
        }
    }

    return (
        <div className="reg block">
            <h1>Verify certificates</h1>
            <div className="inf">
                <div className="data">
                    <p>Code on your certificate</p>
                    <input
                        type="text"
                        value={code}
                        placeholder="CRTF-2022-KZ-VOL-0001-NEW"
                        onChange={(event) => setCode(event.target.value)}
                        style={{width: "400px", textAlign: "left"}}
                    />
                    <a className="cert btn" onClick={() => handleCheck()}>CHECK THE CODE</a>
                </div>
                <div>
                    <h3>Recepient</h3>
                    <div className="inf">
                        <div className="data">
                            <p>Name:</p>
                            <p>Year:</p>
                            <p>Country:</p>
                            <p>Volunteering hours:</p>
                            <p>Type of certification:</p>
                        </div>
                        {data
                            ? <div className="data">
                                <p>{data.name}</p>
                                <p>{year}</p>
                                <p>{data.country}</p>
                                <p>{data.volunteeringHours}</p>
                                <p>{data.type}</p>
                            </div>
                            : <p className="text" style={{textAlign: "center"}}>There is no certificate<br/>with such code.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};