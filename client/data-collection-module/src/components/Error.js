import { useRouteError } from "react-router-dom";

const Error=()=>{
    const err=useRouteError();
    return(
        <>
        <div>
            <h1>Oops!!!</h1>
            
            <h3>{err.status}:{err.statusText}</h3>
            <h1>Please Try to<div> Reload </div> </h1>
            
            <h1>Something went wrong please inform to AnuvaadKosh Team.
            </h1>
        </div>

        </>
    )
}
export default Error;