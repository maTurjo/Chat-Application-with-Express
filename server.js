// import express from express;
const express = require('express');
const path=require('path');
const app=express();
const http=require('http');
const socketio=require('socket.io');


const formatMessage=require("./util/message");

const PORT=3333||process.env.PORT;
const server=http.createServer(app);
const io=socketio(server);

//set static folder
app.use(express.static(path.join(__dirname,'public')));

    io.on('connection',(socket)=>{
        //Code on connect
        console.log(`A request has connected`);
        //define username & room
        let user="";
        let room=""

        //catch username and chatroom
        socket.on("joinRoom",({username,chatroomname})=>{
            if(username && chatroomname){
                user=username;
                room=chatroomname;
                socket.broadcast.emit(`message`,formatMessage("SYSTEM",`${username}  has joined`));
            }
        })

    
            //add event handler to disconnect
            socket.on('disconnect',()=>{
                socket.broadcast.emit(`message`,formatMessage("SYSTEM",`${user} has Left the chat`));
            })
            //listen for chat message
            socket.on('chatMessage',(msg)=>{
                io.emit('message',formatMessage(msg.username,msg.text));
            })
        
    })


app.get("/",(req,res)=>{
    console.log(__dirname);
    console.log(path);
    res.sendFile(__dirname+"/public/first.html");
});
app.get("/chat",(req,res)=>{

    res.sendFile(__dirname+"/public/chat.html");
})
//rubn when client connects

server.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})