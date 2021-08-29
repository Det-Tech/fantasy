import nextConnect from 'next-connect';

const handler = nextConnect();

// POST /api/users
handler.post(async (req, res) => {

    const user = await req.db
    .collection('transfer')
    .findOne()
    .then((data) =>
            res.json(data)
    );
})

export default handler;