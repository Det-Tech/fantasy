import Carousel from "react-multi-carousel";
import { useState,useEffect } from "react";
import Axios from "axios";
import {useDispatch, useSelector, connect} from 'react-redux';



const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

const playerArrange = (a,b) =>{
    if (a.total_points === b.total_points) {
      return 0;
  }
  else {
      return (a.total_points > b.total_points) ? -1 : 1;
  }
  }

export default function PlayerCarousel(props){
    const dispatch = useDispatch();
    const playerData = useSelector(state=>state.playerList);
    const [flag, setFlag] = useState(true);
    const [currentPlayerList, setCurrentPlayerList] = useState(playerData.playerList);
    const [topList, setTopList] = useState([]);
    useEffect(()=>{
        if(flag){
            setFlag(false);
            Axios.post("/api/fantasy/bootstrap-api")
            .then(async(res)=>{
                var temp1 = [];
                var temp2 = [];
                var temp3 = [];
                var temp4 = [];
                res.data.elements.map((el)=>{
                    if(el.element_type==1){
                        temp1.push(el);
                    }
                    if(el.element_type==2){
                        temp2.push(el);
                    }
                    if(el.element_type==3){
                        temp3.push(el);
                    }
                    if(el.element_type==4){
                        temp4.push(el);
                    }
                })
                var totalApi = {
                    goalKeepers:temp1.sort(playerArrange),
                    defenders:temp2.sort(playerArrange),
                    midFielders:temp3.sort(playerArrange),
                    forwarders: temp4.sort(playerArrange)
                }
                dispatch({type: "SET_PLAYERLIST", payload: totalApi})
                setCurrentPlayerList(totalApi)
            })
        }
    })

    useEffect(()=>{

        const getTopList = async () =>{
            var tempList = [];
                await Axios({
                    method: "POST",
                    url: "/api/fantasy/bootstrap-api"
                }).then((res)=>{
                    res.data.events.map((top)=>{
                        currentPlayerList.goalKeepers.map((el)=>{
                            if(el.id==top.top_element_info.id){
                                el.pts = top.top_element_info.points;
                                tempList.push(el);
                            }
                        })
                        currentPlayerList.defenders.map((el)=>{
                            if(el.id==top.top_element_info.id){
                                el.pts = top.top_element_info.points;
                                tempList.push(el);
                            }
                        })
                        currentPlayerList.midFielders.map((el)=>{
                            if(el.id==top.top_element_info.id){
                                el.pts = top.top_element_info.points;
                                tempList.push(el);
                            }
                        })
                        currentPlayerList.forwarders.map((el)=>{
                            if(el.id==top.top_element_info.id){
                                el.pts = top.top_element_info.points;
                                tempList.push(el);
                            }
                        })
                    })
                    
                    // tempList.push()
                    // dispatchEvent({type: "SET_TOP_WEEK", payload: res.data})
                }) 
            
            console.log("tempList",tempList);
            setTopList(tempList);
        }
        getTopList();
        
    }, [currentPlayerList])
    return(
        <div className = "x-home-player-carousel">
            <div className = "x-home-player-carousel-title x-font8">
                2020/21 KINGS OF THE GAMEWEEK
            </div>
            <div className = "p-2">
                <Carousel responsive={responsive}>
                {topList.map((el, idx)=>(
                    <div className = "text-center">
                        <img src={`/img/shirts/${el.team}/other.png`} className = "x-player-body" width = "40px"/>
                        <div className = "x-transfer-player-info-name" style = {{fontSize: "15px"}}>
                            {el.second_name}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {{fontSize: "15px"}}>
                            <span className = "x-font14">{`GW${idx+1} `}</span>
                            {el.pts+" pts"}
                        </div>
                    </div>
                ))
                }
                </Carousel>
            </div>
        </div>
    )
}