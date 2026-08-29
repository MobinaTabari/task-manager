
const express = require("express");

const router = express.Router();

const tasks = [
    {
        id: 1,
        title: "Learn Express",
        completed: false,
        createdAt: "2026-08-29"
    }
];
router.get("/", (req, res) => {
    res.status(200).json(tasks);
});

router.post("/", (req, res) => {
    const {title} = req.body;
    if (!title){
        return res.status(400).json({
            massage : "title is required"
        })
    }

    const newTask = {
        id : tasks.length + 1,
        title : title,
        completed : false,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    res.status(201).json(newTask)
});

router.get("/:id", (req,res) => {
    const taskId = Number(req.params.id);

    const task = tasks.find((task) => task.id === taskId);
    if (!task){
        return res.status(404).json({
            massage : "Task not found"
        });
    }
    res.status(200).json(task)
});

router.patch("/:id", (req,res) => { 
    const taskId = Number(req.params.id);
    const task = tasks.find((task) => task.id === taskId);
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
    res.status(200).json(task)
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask,
    });
});

module.exports = router;