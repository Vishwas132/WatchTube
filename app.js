import express from "express";
import route from "./routes/index.js";
import db from "./models/index.js";

const app = express();
let port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route);

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
    console.log("Server Error: ", err);
  });

export default app;
