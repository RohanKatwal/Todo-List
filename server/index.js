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

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    // console.log(id);
    TodoModel.findById(id)
        .then(todo => {
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            const updatedDone = !todo.done;

            return TodoModel.findByIdAndUpdate(
                id,
                { done: updatedDone },
                { new: true } 
            );
        })
        .then(updatedTodo => {
            if (updatedTodo) {
                res.json(updatedTodo);
            }
        })
        .catch(error => {
            console.error('Error updating todo:', error);
            res.status(500).json({ message: 'Server error' });
        });
});


app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    // console.log(id);
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(error => console.error('Error deleting todo'))

})

app.listen(3001, ()=>{
    console.log('listening on "http://localhost:3001"')
})