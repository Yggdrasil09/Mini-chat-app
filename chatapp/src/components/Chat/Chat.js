import React,{Component} from 'react';
import Pusher from 'pusher-js';

import './chat.css';

class Chat extends Component{
    constructor(props){
        super(props);
        this.state={
            userMessage : '',
            conversation : [],
        };
    }

    componentDidMount(){
        const pusher = new Pusher('d6bf4d0debe54aa28c5b',{
            cluster:'ap2',
            encrypted:true,
        });

        const channel = pusher.subscribe('bot');
        channel.bind('bot-response',data => {
            const msg ={
                text:data.message,
                user:'ai',
            };

            this.setState({
                conversation:[...this.state.conversation,msg],
            });

            var scrolled = false;

            function updateScroll(){
                if(!scrolled){
                    document.getElementById('chatroom').scrollTop = document.getElementById('chatroom').scrollHeight;
                }
            }
    
            document.getElementById('chatroom').addEventListener('scroll',function(){
                scrolled=true;
            })
    
            setInterval(updateScroll,0);
        });
    }

    componentDidUpdate(){
        for(let i=0;i<this.state.conversation.length;i++)
        {
            let str1 = "feedback"+i;
            let str2 = "feedbacks"+i;
            document.getElementById(str1).addEventListener('click',()=>{
                document.getElementById(str2).classList.toggle("active");
            });
        }
    }

    handleChange = event => {
        this.setState({
            userMessage : event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if(!this.state.userMessage.trim())
            return ;
        
        const msg = {
            text : this.state.userMessage,
            user : 'human',
        };

        this.setState({
            conversation:[...this.state.conversation,msg],
        });

        fetch('http://localhost:5000/chat',{
            method:'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({
                message : this.state.userMessage,
            }),
        });

        this.setState({
            userMessage : '',
        });

        var scrolled = false;

        function updateScroll(){
            if(!scrolled){
                document.getElementById('chatroom').scrollTop = document.getElementById('chatroom').scrollHeight;
            }
        }

        document.getElementById('chatroom').addEventListener('scroll',function(){
            scrolled=true;
        })

        setInterval(updateScroll,0);

    }

    render(){
        const ChatBubble = (text,i,className) => {
            return(
                <div key={`${className}-${i}`} className={`${className} chat-bubble`} >
                    <img id={`feedback${i}`} src={require('../../chat-bot_1024.png')} alt="bot"/>
                    <span className="chat-content">{text}</span>
                    <div id={`feedbacks${i}`} className="feedback active">
                        <i className="material-icons thumb_up">thumb_up</i>
                        <i className="material-icons thumb_down">thumb_down</i>
                    </div>
                </div>
            );
        }

        const chat = this.state.conversation.map((e,index)=>
            ChatBubble(e.text,index,e.user)
        );

        return(
            <div className="chat">
                <div className="chat-window">
                    <div className="header">
                        <i className="fas fa-robot fa-3x"></i>
                        <p>Chat-Bot</p>
                    </div>
                    <div className="conversation-view" id='chatroom'>{chat}</div>
                    <div className="message-box">
                        <form onSubmit={this.handleSubmit}>
                            <input value={this.state.userMessage} 
                                onChange={this.handleChange} 
                                className="text-input" 
                                type="text" 
                                autoFocus 
                                placeholder = "Enter the message and hit enter" 
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;