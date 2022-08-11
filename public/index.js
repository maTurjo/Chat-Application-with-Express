//get username and room name from url

const {username,chatroomname}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
console.log(username,chatroomname);

const socket =io();

//join chatroom

socket.emit('joinRoom',{username,chatroomname});
const chatForm=$('#chatform');

socket.on('message',(message)=>{
    let existingText=$('#chatwindow').text();
    $('#chatwindow').text(existingText+'\n'+message.username+": "+message.text);
    $('pre')[0].scrollTop=$('pre')[0].scrollHeight;
})

//emitting msg to server
chatForm.on('submit',(e)=>{
    e.preventDefault();
    if(username && chatroomname){

        const Text=$('#chatText').val();
        if(Text){
            let message={"username":username,"text":Text}
            socket.emit('chatMessage',message);
            $('#chatText').val("");
            console.log(Text);
            
        }
    }
    
})

