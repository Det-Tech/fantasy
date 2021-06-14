import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../middlewares/middleware';
import { extractUser } from '../../../lib/model/api-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/users
handler.post(async (req, res) => {
    const user = await req.db
    .collection('users')
    .insertOne({
        firstName:req.body.reg_info.firstName,
        lastName: req.body.reg_info.lastName,
        publicKey: req.body.reg_info.publicKey,
        gender: req.body.reg_info.gender,
        birth: req.body.reg_info.birth,
        country: req.body.reg_info.country,
        phoneNumber: req.body.reg_info.phoneNumber,
        club: req.body.reg_info.club,
        transfered: {}
        })
    .then(({ ops }) => ops[0]);
    req.logIn(user, (err) => {
        if (err) throw err;
        // when we finally log in, return the (filtered) user object
        res.status(201).json({
          user: extractUser(req),
        });
      });
})

export default handler;