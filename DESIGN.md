# Task Manager API - Design

## Resource 

The main resource of this API is tasks.

Each task will have the following fields:

-id
-title
-completed
-createdAt


## API Routes

Method | Path | Purpose 

GET | `/api/tasks` | Get all tasks
GET | `/api/tasks/:id` | Get a single task 
POST | `/api/tasks` | Create a new task
PATCH | `/api/tasks/:id` | Update a task
DELETE | `api/tasks/:id` | Delete a task

## Status Codes

Status Code | Meaning | When to use

200 | OK | Request was successful
201 | Created | A new task was created successfully
400 | Bad Request | Invalid or missing input
404 | Not Found | Task was not found

## Folder Structure

- `server.js` for the main Express server
- `routes/` for task routes
- `data/` for storing task data
- `uploads/` for task attachments
- `DESIGN.md` for the API design
- `RETRO.md` for the final project review
