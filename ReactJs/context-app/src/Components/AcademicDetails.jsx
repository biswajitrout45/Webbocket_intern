import { useContext } from "react";
import { AppContext } from "../App";

const AcademicDetails = () => {
    const data = useContext(AppContext);
    console.log(data);
    return (
        <div>
            <h2>Academic Details</h2>
            <p>{data.name}</p>
        </div>
    );
};

export default AcademicDetails