const http=require("http")
const express=require("express")
const SocketIO=require("socket.io");

const PORT= 4500 || process.env.PORT; 
let users=[{}]
const app=express();
const server=http.createServer(app)

const io=SocketIO(server)

io.on("connection",(socket)=>{
    console.log("New Connection")
    socket.on("joined",({user})=>{
        users[socket.id]=user;
        socket.emit("userJoined",{user:"Admin",message:"Welcome to the chat"})
        socket.broadcast.emit("deshJoined",{user:"Admin" , message:`${users[socket.id]} has joined the chat` , type:"text"})
    })

    socket.on("disconnect",()=>{
        socket.broadcast.emit("leave",{user:"Admin",message:`${users[socket.id]} has left the chat` , type:"text"})
    })
    socket.on("reqmessage",({message , id , user ,src})=>{
        io.emit("sentmessage",{message , id , user , src})
    })
    socket.on("userDiv",(data)=>{
        console.log(data)
        socket.broadcast.emit("checked",{user:"Admin" ,message:`${data.user} is typing...` , type:"text"} )
    })
    
})

server.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT} `)
})