import { io } from "socket.io-client";
import { createContext, useContext, useMemo } from "react";

const SocketContext=createContext(null);
export const useSocket=()=>{
    const socket=useContext(SocketContext);
    return socket;
}
export const SocketProvider=(props)=>{
const socket = useMemo(() => {
    return io("/", {                  
        path: "/api/socket.io",       
        secure: true,
        withCredentials: true
    });
}, []);
return(
    <SocketContext.Provider value={socket}>
        {props.children}
    </SocketContext.Provider>
)
}
