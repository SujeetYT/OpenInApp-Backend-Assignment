require('dotenv').config();
const express = require('express');
const { DatabaseConnection } = require('./Config/DatabaseConnection');
const app = express();
const port = process.env.PORT || 8000;
const routes = require('./Routes/routes');
const { errorMiddleware } = require('./Middlewares/errorMiddleware');
const schedule = require('node-schedule');
const Task = require('./Model/Task');
const { calculatePriority } = require('./Utils/CalculatePriority');
const User = require('./Model/User');
const { callUser } = require('./Config/twilioConf');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
DatabaseConnection();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up!'});
});

routes(app);

// Cron Job for changing task priority
schedule.scheduleJob('0 0 * * * *', async () => {
  try {
    console.log('Running cron job to update task priority');
    // Find tasks with due_date greater than or equal to the current date
    const overdueTasks = await Task.find({ due_date: { $gte: Date.now() }, isDeleted: false});
    
    // Update priority based on due_date
    overdueTasks?.forEach(async (task) => {
      const priority = calculatePriority(task.due_date);

      // Update the task with the new priority
      await Task.findByIdAndUpdate(task._id, { priority });
      console.log(`Updated task ${task._id} priority to ${priority}`);
    });

    
  } catch (error) {
    console.error('Error updating task priority:', error);
  }
});

// Cron Logic for voice call using twilio
schedule.scheduleJob('0 0 * * * *', async () => {
  try {
    console.log('Running cron job to make Twilio voice call');
    // Get tasks that have passed their due_date and are not marked as done
    const overdueTasks = await Task.find({ due_date: { $lte: Date.now() }, status: 'TODO' })
      .populate('user', 'phoneNumber priority')
      .sort({'user.priority': 1});

    console.log(overdueTasks);

    for (const task of overdueTasks) {
      const user = task.user;
      console.log({user});

      // Make Twilio voice call to the user with the highest priority
      await callUser(user, task.name)
    }


  } catch (error) {
    console.error('Error making Twilio voice call:', error);
  }
});




app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});