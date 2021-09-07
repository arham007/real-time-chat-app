import React, { useCallback, useEffect, useState } from 'react';
import './Chat.css'
import {user} from './Main'
import Socketio from 'socket.io-client';
import ReactScrollToBottom from "react-scroll-to-bottom"
import Message  from './Message';
import {debounce} from "lodash"
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import Picker from 'emoji-picker-react';
import InsertEmoticonRoundedIcon from '@material-ui/icons/InsertEmoticonRounded';

let socket;

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [id, setid] = useState("")
    const [type, setType] = useState("")
    const [src, setSrc] = useState("")
    const [name, setName] = useState("")
    const [open,setOpen]=useState("")
    const [chosenEmoji, setChosenEmoji] = useState(false);
    // let timerId=null
    // function debounce(func,delay){
    //     if(timerId){
    //         clearTimeout(timerId)
    //     }
    //     return(
        
        //         timerId=setTimeout=()=>{
            //             func()
            //             ,delay}
            //             )
            //         }
           
    const handleChange=(e)=>{
        if(e){
            socket.emit("userDiv", {user})
        
        }

    }


    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
      console.log(chosenEmoji)
      let input=document.getElementById("input");
      if(chosenEmoji){

          input.value+=chosenEmoji.emoji;
      }

    };
  
    
   const Sending=()=>{
       let message=document.getElementById("input").value;
       socket.emit("reqmessage",{message , id , user ,src})
       document.getElementById("input").value=""
       setName("")
       setSrc("")
       setOpen(false)
   }
   const deleteIcon=()=>{
       setName("")
       setSrc("")
   }

   const emojiSend=()=>{
       setOpen(!open)

   }

   const imageWork=(e)=>{
    setSrc(window.URL.createObjectURL(e.target.files[0]))
    setName(e.target.files[0].name)
   }
   
   let ENDPOINT="http://localhost:4500";
   useEffect(() => {
       socket=Socketio(ENDPOINT , { transports : ['websocket']})
       
       socket.on("connect",()=>{
           setid(socket.id)
           // alert("New Connection")
        })
        
        socket.emit("joined",{user})
        
        socket.on("userJoined",(data)=>{
            setMessages([...messages,data])
            // setMessages(data.user, data.message)
        })
        
        
        
        return () => {
            socket.disconnect()
            socket.off()
            
        }
    }, [])
    
    const deb=useCallback(
        debounce(()=> setType("") , 1000),
        []
        )
        
        useEffect(() => {
            
            socket.on("checked",(data)=>{
                if(data){
                    
                    setType(data.message)
                }
                deb()
                
            })
            
            
            return () => {
                
            }
        }, [handleChange])
        
        useEffect(() => {
            socket.on("leave",(data)=>{
                setMessages([...messages,data])
                // setMessages(data.user , data.message)
            })
            
            return () => {
                socket.off()
            }
        }, [messages])
        useEffect(() => {
            socket.on("sentmessage",(data)=>{
                setMessages([...messages,data])
                
                // console.log(data.user ,data.message , data.id)
                
            })
            
            return () => {
                socket.off()
            }
        }, [messages])
        useEffect(() => {
            socket.on("deshJoined",(data)=>{
                setMessages([...messages,data])
                // setMessages(data.user , data.message)
            })
            return () => {
                
            }
        }, [messages])
        // console.log(messages)
        
        
        
        return (
            <div className="main">
            <div className="wrappers">

           <div className="header">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

               <div style={{color:'green'}}>
                   
                    {type}
               </div>
               <div style={{marginTop:"10px"}}><a href="/"><CloseIcon /></a></div>
            </div>
           </div>
           <ReactScrollToBottom className="chatbox" onClick={()=> setOpen(false)}>
               {
                   messages.map((item , i)=>{
                       return (
                           <Message key={i} user={id == item.id ? null : item.user} message={item.message} classs={id==item.id ? "left" : "right"} src={item.src} />
                           )
                        })
                    }
              
              
                
           </ReactScrollToBottom>
           {name ? 
           <div style={{display:"flex",justifyContent:"space-around"}}>
               <div>

                {name}
               </div>
               <div><DeleteIcon color="secondary" style={{cursor:"pointer"}} onClick={deleteIcon} /></div>

           </div>
        :
        <div />    
    }
           <div className="sending" style={{borderTop:"2px solid "}}>
               <div style={{display:"flex"}}>
                <div style={{width:"80%",height:"90%",display:"flex"}}>

                    
               
               
              <span style={{backgroundColor:"white" ,cursor:"pointer"}} onClick={emojiSend}><InsertEmoticonRoundedIcon style={{marginTop:"10px"}} /></span>
               <input onKeyUp={handleChange} onKeyPress={(event)=> event.key=="Enter" ? Sending() : ""} type="text" id="input" style={{width:"100%",padding:"15px",fontSize:"22px",border:"none",outline:"none"}}  />
              
              
              <label style={{backgroundColor:"white"}}>

                
                
                 <AttachFileIcon style={{background:"none",alignItems:"center",marginTop:"10px",cursor:"pointer" ,}} />
                
                
                <input type="file" style={{display:"none",backgroundColor:"white"}}  onChange={imageWork} />
              </label>
            
                </div>
               <div onClick={Sending} className="btn-send" style={{width:"20%",display:"flex",justifyContent:"center",alignItems:"center",height:"auto"}} >
                   <div>

                   <img width="25" src="https://static.thenounproject.com/png/373675-200.png" />
                   </div>
                   </div>

               </div>
            {
                open ? <div onBlur={()=> setOpen(false)} style={{marginTop:"-300px"}} > <Picker  pickerStyle={{ width: '70%' }}  onEmojiClick={onEmojiClick} disableSearchBar={true} /></div> : <div />
            }
    
           </div>
            </div>
            
        </div>  
    )
}

export default Chat;
