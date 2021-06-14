import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { extractUser } from '../../../lib/model/api-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/users
handler.post(async (req, res) => {
    const user = await req.db.collection('users').findOne({ publicKey: req.body.email });
    if(user){
        console.log("wowow")
        // res.json({ user: user });
        req.logIn(user, (err) => {
            if (err) throw err;
            // when we finally log in, return the (filtered) user object
            res.status(201).json({
              user: extractUser(req),
            });
          });
    }
    else{
        res.json("error");
    }
})

export default handler;