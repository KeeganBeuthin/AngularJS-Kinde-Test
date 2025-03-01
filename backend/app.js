import dotenv from "dotenv";
dotenv.config();

import { setupKinde, protectRoute, getUser, GrantType } from "./kinde-wrapper.mjs";
import express from "express";
import cors from "cors";

const app = express();
const port = 4044;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.static("public"));

const config = {
  grantType: GrantType.AUTHORIZATION_CODE,
  clientId: process.env.KINDE_CLIENT_ID,
  issuerBaseUrl: process.env.KINDE_ISSUER_URL,
  siteUrl: process.env.KINDE_SITE_URL,
  secret: process.env.KINDE_CLIENT_SECRET,
  redirectUrl: process.env.KINDE_REDIRECT_URL,
  unAuthorisedUrl: process.env.KINDE_SITE_URL,
  postLogoutRedirectUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
};

app.set("view engine", "pug");
const client = setupKinde(config, app);

app.get("/", async (req, res) => {
  if (await client.isAuthenticated(req)) {
    res.redirect("/admin");
  } else {
    res.render("index", {
      title: "Hey",
      message: "Hello there! what would you like to do?",
    });
  }
});

app.get("/admin", protectRoute, getUser, (req, res) => {
  res.render("admin", {
    title: "Admin",
    user: req.user,
  });
});

app.listen(port, () => {
  console.log(`Kinde Express Starter Kit listening on port ${port}!`);
});
