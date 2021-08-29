import React, { useState, useEffect } from 'react';
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';

function Navigation(){
    const [mobileView, setMobileView] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");

    useEffect(() => {
        const setResponsiveness = () => {
          return window.innerWidth < 1000
            ? setMobileView(true)
            : setMobileView(false)
        };
    
        setResponsiveness();
    
        window.addEventListener("resize", () => setResponsiveness());
      }, []);

      useEffect(()=>{
          console.log(window.ethereum.selectedAddress)
          if(window.ethereum.selectedAddress!==null){
              setWalletAddress(window.ethereum.selectedAddress);
          }
      })

      const handleConnect = (e) =>{
          e.preventDefault();
        if (typeof window !== "undefined") {
            try {
              window.ethereum.enable().then(async()=> {
                setWalletAddress(window.ethereum.selectedAddress);
              })
            }
            catch(e){
                alert("please install metamask!");
            }
      }
    }

    return(
        <div className = "mt-2">
            <div className = "text-center mb-5">
                <a href = "https://www.arsenal.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"><img src = '/img/clubs/team1.png' alt = "team1" className = "x-margin3"/></a>
                <a href = "https://www.avfc.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"><img src = '/img/clubs/team2.png' alt = "team2" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team3.png' alt = "team3" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team4.png' alt = "team4" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team5.png' alt = "team5" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team6.png' alt = "team6" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team7.png' alt = "team7" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team8.png' alt = "team8" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team9.png' alt = "team9" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team10.png' alt = "team10" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team11.png' alt = "team11" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team12.png' alt = "team12" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team13.png' alt = "team13" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team14.png' alt = "team14" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team15.png' alt = "team15" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team16.png' alt = "team16" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team17.png' alt = "team17" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team18.png' alt = "team18" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team19.png' alt = "team19" className = "x-margin3"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team20.png' alt = "team20" className = "x-margin3"/></a>
            </div>
            <Navbar style = {mobileView?{backgroundColor: "#17234D"}:{backgroundColor: "#17234D",height:"60px", marginBottom: "65px" }} expand="lg">
            <Navbar.Brand href="/"><img src = "/img/logo.png" alt = "logo" style = {mobileView?{width: "80px"}:{width: "220px"}}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                    <Nav.Link href="#action1" className = "y-font1">Fantasy</Nav.Link>
                    <Nav.Link href="#action2" className = "y-font1">Video</Nav.Link>
                    <NavDropdown title="Communities" id="navbarScrollingDropdown" className = "y-font1">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/profile/personal"  className = "y-font1"><img src = "/img/fantasy/userCircle.png" alt = "profile"/> Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Button variant="outline-success" style = {{position: "absolute", right: "100px", fontSize: "20px"}} onClick = {handleConnect}>{typeof window !== "undefined"?window.ethereum?window.ethereum.selectedAddress!==null?`${walletAddress.slice(0,6)}...`:"Connect":"please install metamask":null}</Button>
            </Navbar>
        </div>
    )
}
export default Navigation;