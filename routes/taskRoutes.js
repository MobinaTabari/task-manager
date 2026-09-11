
const express = require("express");
const uuid = require("uuid");
const { format } = require("date-fns");
const fs = require("fs");
const path = require("path");
const validator = require("express-validator");
const { customError } = require("../utils/errorHandler");

const router = express.Router();

const dataPath = path.join(__dirname, "../data/tasks.json");

let tasks = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const saveTasks = () => {
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
}


router.get("/",[
    validator.query("search").optional().isString().withMessage("search must be a string").isLength({max : 8}).withMessage("search can't be more than 8 character "),
    validator.query("completed").optional().isBoolean().withMessage("completed must be a boolean")
], (req, res) => {
    customError("validation issue", 422)
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send(errors)
    }
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

router.post("/", [
    validator.body("tittle").isString().withMessage("your tittle is not string").isLength({min: 4, max: 15}).withMessage("your name is less than 4 or more than 15")
], (req, res) => {
    const {title} = req.body;
    
    const error = validator.validationResult(req)
    if (! error.isEmpty()){
        res.status(422).send(error)
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