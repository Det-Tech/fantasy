import React from 'react';
import Fixture from '../../components/fantasy/fixtures/fixture';
import TopHead from '../../components/fantasy/head';

function Fixtures(){
    return(
        <div>
            <TopHead />
            <div className = "x-Grid3 mt-5">
                <Fixture />
            </div>
        </div>
    )
}

export default Fixtures;