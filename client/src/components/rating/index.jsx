import { useContext } from "react";
import { DefaultContext } from "../../Context";

export const Rating = () => {

    const {users} = useContext(DefaultContext);

    return (
        <div className="reg block">
            <h1>Rating of volunteers</h1>
            <div style={{alignSelf: "center"}}>
                <table>
                    {users
                        ?  users.sort((a, b) => b.volunteeringHours - a.volunteeringHours).map((item, index) => 
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td style={{textAlign: "center"}}>{item.volunteeringHours}</td>
                            </tr>
                        )
                        : <></>
                    }
                </table>
            </div>
        </div>
    );
}