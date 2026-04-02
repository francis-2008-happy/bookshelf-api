const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const { ObjectId } = require("mongodb");
const { getUsersCollection } = require("./database");

let oauthConfigured = false;

const initPassport = () => {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } = process.env;

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !GITHUB_CALLBACK_URL) {
    console.warn("OAuth is not fully configured. Set GitHub OAuth env vars to enable login routes.");
    return;
  }

  oauthConfigured = true;

  passport.serializeUser((user, done) => {
    done(null, user._id.toString());
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUsersCollection().findOne({ _id: new ObjectId(id) });
      done(null, user || null);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const users = getUsersCollection();
          const now = new Date();

          await users.updateOne(
            { githubId: profile.id },
            {
              $set: {
                githubId: profile.id,
                username: profile.username || "",
                displayName: profile.displayName || "",
                profileUrl: profile.profileUrl || "",
                avatarUrl: profile.photos?.[0]?.value || "",
                updatedAt: now,
              },
              $setOnInsert: {
                createdAt: now,
              },
            },
            { upsert: true }
          );

          const savedUser = await users.findOne({ githubId: profile.id });
          return done(null, savedUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const isOAuthConfigured = () => oauthConfigured;

module.exports = {
  passport,
  initPassport,
  isOAuthConfigured,
};
