const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use("/files", express.static("uploads"));

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
});