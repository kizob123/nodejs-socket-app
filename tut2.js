const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mysql = require('mysql');
const url = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'customerdates'
});


db.connect((err)=>{
    if (err) {
        throw err;
    }
    console.log('connected');
});
app.get("/createdb",(req,res)=>{
    let sql ="create database customerdates";
    db.query(sql, post, (err)=>{
        if(err){
            throw err;
        }
        res.send("Database created");
    })
    
});



app.get('/', (req, res) => { 
     res.sendFile(__dirname + '/tut.html');
    });

app.get('/index.css', (req, res) => { 
     res.sendFile(__dirname + '/index.css');
    });    
   
io.on('connection', (socket) => { 
     console.log('a user connected');
     socket.on('test2', (msg) => {   
          console.log('user sent',msg); 
          let post = {customer_id: msg.ID,customer_name: msg.name,customer_loc:msg.loc,drops_loc:msg.drop,job_date:msg.day};
   
            
        let sql = "insert into customer set ?";
        let query = db.query(sql, post, (err)=>{
        if(err){
            throw err;
        }
        else{
                socket.emit('sent','sent customer '+post.customer_name+' from '+post.customer_loc)
        
        }
        
            
            
    })
         });
     socket.on('disconnect', () => {   
          console.log('user disconnected'); 
         });
    });
server.listen(3000, () => { 
     console.log('listening on *:3000');
    });