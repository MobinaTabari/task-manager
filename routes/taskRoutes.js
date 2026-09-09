
const express = require("express");
const uuid = require("uuid");
const { format } = require("date-fns");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const dataPath = path.join(__dirname, "../data/tasks.json");

let tasks = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const saveTasks = () => {
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
}


router.get("/", (req, res) => {
    const { completed, search } = req.query;

    let result = tasks;

    if (completed === "true") {
        result = result.filter((task) => task.completed === true);
    }

    if (completed === "false") {
        result = result.filter((task) => task.completed === false);
    }

    if (search) {
        result = result.filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
        );
    }
    res.status(200).json(result);
});

router.post("/", (req, res) => {
    const {title} = req.body;
    if (!title){
        return res.status(400).json({
            massage : "title is required"
        })
    }
    const newTask = {
        id: uuid.v4(),
        title: title,
        completed: false,
        createdAt: format(new Date(), "yyyy-MM-dd"),
        attachmentPath: "/files/test.txt"
    };
    tasks.push(newTask);
    saveTasks();
    res.status(201).json(newTask)
});

router.get("/:id", (req,res) => {

    const task = tasks.find((task) => task.id === req.params.id);
    if (!task){
        return res.status(404).json({
            massage : "Task not found"
        });
    }
    res.status(200).json(task)
});

router.patch("/:id", (req,res) => { 
    const task = tasks.find((task) => task.id === req.params.id);
    if (!task){
        return res.status(404).json({
            message : "Task not found"
        });
    }
    const {title, completed} = req.body;

    if (title !== undefined){
        task.title = title;
    }
    if (completed !== undefined){
        task.completed = completed;
    }
    saveTasks();
    res.status(200).json(task)
})

router.delete("/:id", (req, res) => {
    const taskIndex = tasks.findIndex((task) => task.id === req.params.id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    tasks.splice(taskIndex,1);
    saveTasks();

    res.status(200).json({
        message: "Task deleted successfully",
    });
});

module.exports = router;