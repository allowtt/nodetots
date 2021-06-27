var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as passport from 'passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import User from '../models/user';
export default () => {
    passport.use('local', new Strategy({
        usernameField: 'userId',
        passwordField: 'password',
    }, (userId, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({ where: { userId } });
            if (!user) {
                return done(null, false, { message: '존재하지 않는 사용자입니다!' });
            }
            const result = yield bcrypt.compare(password, user.password);
            if (result) {
                return done(null, user);
            }
            return done(null, false, { message: '비밀번호가 틀립니다.' });
        }
        catch (err) {
            console.error(err);
            return done(err);
        }
    })));
};
