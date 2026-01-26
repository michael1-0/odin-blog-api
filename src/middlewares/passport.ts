import passport from "passport";
import { prisma } from "../db/prisma.ts";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || "secret",
    },
    async (jwtPayload: any, done: any) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: jwtPayload.sub },
        });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false)
        }
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

export default passport;
