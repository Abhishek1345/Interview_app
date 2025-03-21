import { io } from "socket.io-client";
import { createContext, useContext, useMemo } from "react";

const SocketContext=createContext(null);
export const useSocket=()=>{
    const socket=useContext(SocketContext);
    return socket;
}
export const SocketProvider=(props)=>{
const socket = useMemo(()=>{io("https://interview-app-7w2o.onrender.com",{
    secure:true,
    withCredentials:true
});
},[]);
return(
    <SocketContext.Provider value={socket}>
        {props.children}
    </SocketContext.Provider>
)
}
export default socket;