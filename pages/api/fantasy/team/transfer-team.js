import nextConnect from 'next-connect';

const handler = nextConnect();

// POST /api/users
handler.post(async (req, res) => {

    const user = await req.db
    .collection('users')
    .updateOne({_id:ObjectId(req.body.id)},{$set:{
        transfered: req.body.players,
        main: req.body.main,
        candidate: req.body.candidate}
        },{ upsert: true })
    .then((data) =>
            res.json(data) 
    );
})

export default handler;