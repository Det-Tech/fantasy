import React , {useState, useEffect} from 'react';

function Header(props){
    const [imgHeight, setImgHeight] = useState();
    useEffect(() => {
        const setResponsiveness = () => {
          setImgHeight(window.innerWidth*260/1440);
        };
    
        setResponsiveness();
    
        window.addEventListener("resize", () => setResponsiveness());
      }, []);
    return(
        <div className = "mb-5">
            <div className = "x-profile-cover-img" style = {{height: `${imgHeight}px`}}>
                <span className = "x-user-cover-text x-font2">Your  Account</span>
            </div>
        </div>
    )
}

export default Header;