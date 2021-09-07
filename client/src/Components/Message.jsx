import React from 'react'

const Message = ({message , user , classs , src}) => {
    if(user){


        if(user=="Admin"){
            return (
                <div className={`chatmessage`} style={{backgroundColor:"blue",margin:"0 auto",width:"45%",textAlign:"center",marginBottom:"5px"}}>
                {`${user}: ${message}`}
            </div>  
            )  
        }
        if(src){
            return(
                <div className={`chatmessage ${classs}`}>
                      {message && src ? <div>  <img src={src} width="200" height="150" /> <br />
                 {`${user}: ${message}`}</div>
                :
                <span>{`${user}:`} <span><img src={src} width="200" height="150" /></span></span> 
                }
                </div>
            )
        }
        return (
            <div className={`chatmessage ${classs}`}>
            {`${user}: ${message}`}
        </div>
    )
}else{
    if(src){
        return(
            <div className={`chatmessage ${classs}`}>
                {message && src ? <div>  <img src={src} width="200" height="150" /> <br />
                 {`You: ${message}`}</div>
                :
                <span>{`You:`} <img src={src} width="200" height="150" /></span> 
                }
               
                 
            </div>
        )
    }
    return (
        <div className={`chatmessage ${classs}`}>
        {`You: ${message}`}
    </div>
)

}
}

export default Message
