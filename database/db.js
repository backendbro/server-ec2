const mysql2 = require('mysql2')

const pool = mysql2.createPool({
    host: process.env.mysql_host, 
    user:process.env.mysql_user, 
    password:process.env.mysql_password, 
    database:process.env.mysql_database
}).promise()

const getTodoDb = async () => {
    const [todos] =  await pool.query("SELECT * from todo"); 
    return todos;  
}

const getSingleTodo = async (id) => {
    const [todos] = await pool.query(`SELECT * FROM todo WHERE id = ?`, [id]) 
    return todos 
}

const addTodoDb = async (descrip) => {
    const [todo] = await pool.query(`INSERT INTO todo (descrip) VALUES (?)`, [descrip]);  
    const insertedTodo = getSingleTodo(todo.insertId)
    return insertedTodo; 
}   

const deleteTodoDb =  async (id) => {
    await pool.query(`DELETE FROM todo WHERE id = ?`, [id]) 
}

const clearTodoDb = async (req,res) => {
    await pool.query(`DELETE FROM todo`) 
}

module.exports = {
    getTodoDb, 
    addTodoDb, 
    clearTodoDb, 
    deleteTodoDb 
} 

