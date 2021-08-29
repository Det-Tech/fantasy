import React, { useEffect, useState} from 'react';
import leagueContract from '../lib/abi/league';
import Axios from 'axios';

export const ApiContext = React.createContext();

export default function({children}){
    const [apiData, setApiData] = useState();

    const value = React.useMemo(() => ({
        apiData
      }), [apiData]);

    useEffect(()=>{
        const getApi = async () =>{
            Axios.post("/api/fantasy/bootstrap-api")
            .then((res)=>{
                setApiData(res.data);
            })
        }
        if(typeof window !== "undefined"){
            if(window.ethereum)
            getApi();
        }
    },[])
    return(
        <ApiContext.Provider value = {value}>
            {children}
        </ApiContext.Provider>
    )
} 