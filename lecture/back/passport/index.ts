import * as passport from 'passport';

import User from '../models/user';
import local from './local';

export default () => {
//   passport.serializeUser((user: User, done) => {
//     done(null, user.id);
//   });

  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

   
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await User.findOne({
        where: { id },
      });
      if (!user) {
        return done(new Error('no user'));
      }
      return done(null, user); // req.user
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });

  local();
}