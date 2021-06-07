import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/users
handler.post(async (req, res) => {

    const email = req.body.email;
  // check if email existed
  if ((await req.db.collection('users').countDocuments({email})) > 0) {
    res.status(403).send('The email has already been used.');
  }
  else{
      res.status(200).send("success");
  }
});

export default handler;