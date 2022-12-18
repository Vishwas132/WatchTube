import express from "express";
import route from "./routes/index.js";
import db from "./models/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import cons from "consolidate";
import webpush from "web-push";
import config from "./config/default.json" assert { type: "json" };

const subject = config.vapidKey.subject;
const publicKey = config.vapidKey.publicKey;
const privateKey = config.vapidKey.privateKey;

webpush.setVapidDetails(subject, publicKey, privateKey);

const app = express();
let port = 3000;

const corsOptions = {
  origin: "http://127.0.0.1:5500",
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route);

app.use(express.static(process.cwd() + "/view/"));
app.set("view engine", "handlebars");
app.set("views", "./view/pages/");
app.engine("handlebars", cons.handlebars);

db.sequelize
  // .sync({alter: true})
  // .sync({force: true})
  .authenticate()
  .then(() => {
    return app.listen(port, () => {
      console.log(`Server listning on at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.trace("Server Error: ", err);
  });

export default app;
