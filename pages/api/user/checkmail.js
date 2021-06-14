import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/users
handler.post(async (req, res) => {

    const publicKey = req.body.email;
  // check if email existed
  const user = await req.db.collection('users').findOne({ publicKey: publicKey });
  if(user){
    res.status(403).json({error: 403});
  }
  else{
      res.status(200).send("success");
  }
});

export default handler;