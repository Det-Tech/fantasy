import {useRouter} from 'next/router';
import {Grid} from '@material-ui/core';
import TopHead from '../../../../components/fantasy/head';
import ChildTable from '../../../../components/league/childTable';

function League(){
    const router = useRouter();
    const {id} = router.query;
    return(
        <div>
            <TopHead />
                <div className = "x-Grid5">
                    <Grid container spacing = {3} className = "mb-5">
                        <Grid item xs = {12} sm = {12} md = {6}>
                            <button className = "x-league-button" onClick = {()=>router.push("/fantasy/leagues/create")}>Create new League</button>
                        </Grid>
                        <Grid item xs = {12} sm = {12} md = {6}>
                            <button className = "x-league-button" onClick = {()=>router.push("/fantasy/leagues/join")}>Join to existing League</button>
                        </Grid>
                    </Grid>
                    <ChildTable code = {id}/>
                </div>
                
        </div>
    )
}

export default League;