const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const { errorMiddleware } = require("./utils/errorHandler");
const dotenv = require("dotenv");
const { hashPassword, comparedPassword } = require("./utils/hashPassword");
const { createJwtToken, checkJwtToken } = require("./utils/jwtHelper");


dotenv.config();

let port = process.env.PORT

const app = express();


app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use("/files", express.static("uploads"));

app.use(errorMiddleware)

// hashPassword("test1234")

// comparedPassword(
//     "test1234",
//     "$2b$10$WO/UIsXh.ixf.p45bYeRje9EATz/ZYqakfGCuv.QuLj5uM2dwqYPi"
// )
// console.log(createJwtToken({name : " mobina "}))

// console.log(checkJwtToken(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiIG1vYmluYSAiLCJpYXQiOjE3ODkwOTI0ODUsImV4cCI6MTc4OTA5NjA4NX0.d3oXmeMhzLlq-HgUB8pHhH7J0YrTchsLMdj-vlq6a_g"
// ))

app.listen(port, () => {
    console.log(`server is running on PORT ${port}`);
});