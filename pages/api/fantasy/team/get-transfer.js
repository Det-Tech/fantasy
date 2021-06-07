import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

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