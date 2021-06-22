import React from 'react';

function Footer(){
    return(
        <div className = "y-footer">
            <div className = "y-footer-line1 text-center">
                <span className = "float-left"><img src = "/img/logo.png" alt = "logo" width = "150px" /></span>
                <span className = "y-footer-text-el">Fantasy</span>
                <span className = "y-footer-text-el">Video</span>
                <span className = "y-footer-text-el">Communities</span>
                <span className = "y-footer-text-el">Privacy Policy</span>
                <span className = "y-footer-text-el">Terms & Condition</span>
                <span className = "y-footer-text-el">About</span>
            </div>
            <div className = "text-left mt-5 mb-5 d-block">
                <span className = "ml-2 mr-2 p-1 d-inline-block"><img src = "/img/footer/facebook.png" alt = "facebook" width = "30px"/></span>
                <span className = "ml-2 mr-2 p-1 d-inline-block"><img src = "/img/footer/instagram.png" alt = "instagram" width = "30px"/></span>
                <span className = "ml-2 mr-2 p-1 d-inline-block"><img src = "/img/footer/youtube.png" alt = "youtube" width = "30px"/></span>
                <span className = "ml-2 mr-2 p-1 d-inline-block"><img src = "/img/footer/linkedin.png" alt = "linkedin" width = "30px"/></span>
                <span className = "ml-2 mr-2 p-1 d-inline-block"><img src = "/img/footer/twitter.png" alt = "twitter" width = "30px"/></span>
                <span className = "y-font1 float-right">Copyright © 2021 Fantasy. All Rights Reserved.</span>
            </div>
        </div>
    )
}

export default Footer;