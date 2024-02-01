const express = require('express');
const CreateUser = require('../Controller/CreateUser');
const CreateTask = require('../Controller/CreateTask');
const CreateSubtask = require('../Controller/CreateSubTask');
const LoginUser = require('../Controller/LoginUser');
const { jwtAuth } = require('../Middlewares/jwtAuth');
const UpdateTask = require('../Controller/UpdateTask');
const UpdateSubtask = require('../Controller/UpdateSubtask');
const DeleteTask = require('../Controller/DeleteTask');
const DeleteSubTask = require('../Controller/DeleteSubTask');
const AllUserTask = require('../Controller/AllUserTask');
const AllUserSubtask = require('../Controller/AllUserSubtask');

const routes = (app)=>{
  const router = express.Router();
  app.use('/api/v1/', router);

  // --------- User Routes -------------
  router.post('/register', CreateUser);
  router.post('/login', LoginUser);

  // ---------- User Task Routes -----------
  router.get('/all-task', jwtAuth, AllUserTask);
  router.get('/all-subtask', jwtAuth, AllUserSubtask);


  // --------- Task Routes -------------
  router.post('/create-task', jwtAuth, CreateTask)
  router.put('/update-task/:id', jwtAuth, UpdateTask);
  router.put('/delete-task/:id', jwtAuth, DeleteTask);
  
  // --------- Subtask Routes ----------
  router.post('/create-subtask/', jwtAuth, CreateSubtask);
  router.put('/update-subtask/:id', jwtAuth, UpdateSubtask);
  router.put('/delete-subtask/:id', jwtAuth, DeleteSubTask);

}

module.exports = routes;