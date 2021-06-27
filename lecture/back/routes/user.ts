import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as passport from 'passport';
import { isLoggedIn, isNotLoggedIn } from './middleware';
import User from '../models/user';
import Post from '../models/post';
import Image from '../models/image';
import { json } from 'sequelize/types';

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
    const user = req.user as Partial<User>;
    delete user.password;
    return res.json(user);
});

router.post('/', async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                userId: req.body.userId,
            },
        });
        if (exUser) {
            return res.status(403).send('이미 사용 중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });
        return res.status(200).json(newUser);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err: Error, user: User, info: {message: string}) => {
        if(err) {
            console.error(err);
            return next(err);
        }
        if(info) {
            return res.status(401).send(info.message);
        }
        return req.login(user, async (loginErr: Error) => {
            try {
                if (loginErr) {
                    return next(loginErr);
                }
                const fullUser = await User.findOne({
                    where: { id: user.id },
                    include: [{
                        model: Post,
                        as: 'Posts',
                        attributes: ['id'],
                    }, {
                        model: User,
                        as: 'Followings',
                        attributes: ['id'],
                    }, {
                        model: User,
                        as: 'Followers',
                        attributes: ['id'],
                    }],
                    attributes: {
                        exclude: ['password'],
                    },
                });
                return res.json(fullUser);
            } catch (e) {
                console.error(e);
                return next(e);
            }
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session!.destroy(() => {
        res.send('로그아웃성공');    
    });
    
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: parseInt(req.params.id, 10) },
            include: [{
                model: Post,
                as: 'Posts',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }],
            attributes: ['id', 'nickname'],
        });
        if (!user) {
            return res.status(404).send('no user');
        }
        const jsonUser = user.toJSON() as User;
        jsonUser.PostCount = jsonUser.Posts.length;
        jsonUser.FollowingCount = jsonUser.Followings.length;
        jsonUser.FollowerCount = jsonUser.Followers.length;
        return res.json(jsonUser);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});
export default router;