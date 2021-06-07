import nextConnect from 'next-connect';
import Axios from 'axios';

const handler = nextConnect();

handler.post(async (req, res)=>{
    Axios.defaults.headers.common['User-Agent'] = 'PostmanRuntime/7.26.2';
    const resEvent = await Axios({
        method: "GET",
        url: `https://fantasy.premierleague.com/api/bootstrap-static/`
      });
      res.send(resEvent.data);
})

export default handler;