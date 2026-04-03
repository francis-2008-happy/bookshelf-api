const express = require("express");
const { passport, isOAuthConfigured } = require("../config/passport");

const router = express.Router();

const requireOAuthSetup = (_req, res, next) => {
  if (isOAuthConfigured()) {
    return next();
  }

  return res.status(500).json({
    success: false,
    message: "OAuth is not configured on this server",
  });
};

/**
 * @swagger
 * /api/auth/github:
 *   get:
 *     summary: Start GitHub OAuth login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to GitHub login
 *       500:
 *         description: OAuth is not configured
 */
router.get("/github", requireOAuthSetup, passport.authenticate("github", { scope: ["user:email"] }));

/**
 * @swagger
 * /api/auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback URL
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to auth status endpoint
 */
router.get(
  "/github/callback",
  requireOAuthSetup,
  passport.authenticate("github", { failureRedirect: "/api/auth/failed" }),
  (_req, res) => {
    res.redirect("/api/auth/me");
  }
);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Not logged in
 */
router.get("/me", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Not logged in",
    });
  }

  return res.status(200).json({
    success: true,
    data: req.user,
  });
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out current user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
});

/**
 * @swagger
 * /api/auth/failed:
 *   get:
 *     summary: OAuth login failure endpoint
 *     tags: [Auth]
 *     responses:
 *       401:
 *         description: Login failed
 */
router.get("/failed", (_req, res) => {
  res.status(401).json({
    success: false,
    message: "GitHub login failed",
  });
});

module.exports = router;
