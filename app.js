import express from "express";

const app = express();
let port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  try {
    return res.status(200).json("success");
  } catch (error) {
    throw error;
  }
});

app.listen(port, () => {
  console.log(`Server listning on at http://localhost:${port}`);
});

export default app;
