import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/middleware';
var ObjectId = require('mongodb').ObjectID;

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/users
handler.post(async (req, res) => {

    const user = await req.db
    .collection('users')
    .updateOne({_id:ObjectId(req.body.id)},{$set:{
        transfered: req.body.players}
        },{ upsert: true })
    .then((data) =>
            res.json(data) 
    );
})

export default handler;