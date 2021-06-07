const express = require('express');

const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/join', async (req, res, next) => {
    console.log(User);
    console.log('회원가입 url');
    const {email, nick, password} = req.body;
    // console.log(email);
    // console.log(nick);
    // console.log(password);
    try {
        console.log(email);
        const exUser = await User.findOne({where : {email}});
        console.log('exUser: ', exUser);
        if(exUser) {
            return res.json({
                code: '500',
                message: '이미 가입된 사용자입니다.',
            });
        } else {
            console.log('가입시작');
            const hash = await bcrypt.hash(password, 10);

            await User.create({
                email,
                nick,
                password: hash,
            });

            return res.status(200).json({
                code: 200,
                message: '회원가입 성공!',
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '회원가입실패',
        });  
    }

});

module.exports = router;

