import {Grid} from '@material-ui/core';

function Card(props){
    const {img, title, content} = props;
    return(
        <Grid container spacing = {3} className = "x-home-card-container">
            <Grid item xs = {12} sm = {12} md = {6}>
                <img src = {img} width = "100%"/>
            </Grid>
            <Grid item xs = {12} sm = {12} md = {6}>
                <h2 className = "mb-4">{title}</h2>
                <h6>{content}</h6>
            </Grid>
        </Grid>
    )
}

export default Card;