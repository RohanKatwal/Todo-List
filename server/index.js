const express= require('express')
const mongoose= require('mongoose');
const cors= require('cors');
const TodoModel = require('./Models/Todo')

const app = express();
app.use(cors());
app.use(express.json())

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));


app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result =>res.json(result))
    .catch(error =>console.error('Error while getting todolist'))
})
app.post('/add',(req, res) => {
    const task= req.body.task
    console.log(task)
    TodoModel.create({
        task:task
    }).then(result => res.json(result))
    .catch(error => console.error('Error aadding todo'))
})
app.listen(3001, ()=>{
    console.log('listening on "http://localhost:3001"')
})