import React from 'react';

function UserCard(){
    return(
        <div className = "x-pick-user-card">
            <div className = "x-font11">
                Emanuel Carlos
            </div>
            <div className = "x-pick-user-card-content">
                <div>
                    <span className = "x-font12">
                        manchester united
                    </span>
                    <span className = "float-right">
                        <img src="https://www.countryflags.io/ca/flat/64.png"/>
                    </span>
                </div>
                <hr />
                <div className = "x-font3">
                    Points/Ranking
                </div>
                <hr />
                <div>
                    <span className = "x-font4">
                        Overall Points:
                    </span>
                    <span className = "x-font4 float-right">
                        190
                    </span>
                </div>
                <hr />
                <div>
                    <span className = "x-font4">
                        Overall Rank:
                    </span>
                    <span className = "x-font4 float-right">
                        8,171,763
                    </span>
                </div>
                <hr />
                <div>
                    <span className = "x-font4">
                        Total Players:
                    </span>
                    <span className = "x-font4 float-right">
                        8,238,388
                    </span>
                </div>
                <hr />
                <div>
                    <span className = "x-font4">
                        GameWeek Points:
                    </span>
                    <span className = "x-font4 float-right">
                        53
                    </span>
                </div>
                <hr />
                <div className = "text-right">
                    <a href = "/entry/8210250/history">View GameWeek History -></a>
                </div>
            </div>
        </div>
    )
}

export default UserCard;