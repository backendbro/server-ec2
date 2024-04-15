const {
    getTodoDb,
    addTodoDb, 
    clearTodoDb, 
    deleteTodoDb 
} = require('../database/db')


const getTodo = async (req,res) => {

    try {

        const today = new Date();
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long"
        };
        const day = today.toLocaleDateString("en-US", options);

        const todos = await getTodoDb() 
        
        res.render("layouts/main", {
            listtitle: day,
            newListItems: todos,
        });

    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}



const addTodo = async (req,res) => {
    try {
        const {newItem} = req.body
        const todo = await addTodoDb(newItem)
        if (!todo){
            return res.status(400).json({success:false, message:"Could not create todo"})
        }
       
        res.redirect('/api/v1/todo')
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}

const clearTodo = async (req,res) => {
    try {
        await clearTodoDb()
        res.redirect('/api/v1/todo')
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}

const deleteTodo = async (req,res) => {
    try {
        const {id} = req.params
        await deleteTodoDb(id) 
        res.status(200).json({success:true, message:"Todo deleted"})

    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}


module.exports = {
    getTodo, 
    addTodo,
    clearTodo, 
    deleteTodo 
}
