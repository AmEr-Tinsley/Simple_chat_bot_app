import { useState } from "react";
import axios from 'axios'
function ChatRoom() {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');

    const onEnterPress = (e) => {

        if (e.keyCode == 13 && e.shiftKey == false) {

            axios.get('/' + currentMessage).then(response => {
                setMessages([...messages, { content: currentMessage, isBot: false }, { content: response.data, isBot: true }]);
            })
            setCurrentMessage('')
            e.preventDefault();

        }
    }
    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center h-100">

                <div className="col-md-8 col-xl-6 chat">
                    <div className="card">
                        <div className="card-header msg_head">
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <img src="./_D.jpg" className="rounded-circle user_img" />
                                    <span className="online_icon"></span>
                                </div>
                                <div className="user_info">
                                    <span>Chat with Botti</span>
                                    <p>{messages.length} Message(s)</p>
                                </div>

                            </div>

                        </div>
                        <div className="card-body msg_card_body">
                            {
                                messages.map(message => {
                                    return (
                                        message.isBot ? <div className="d-flex justify-content-start mb-4">
                                            <div className="img_cont_msg">
                                                <img src="./_D.jpg" className="rounded-circle user_img_msg" />
                                            </div>
                                            <div className="msg_cotainer">
                                                {message.content}
                                            </div>
                                        </div> : <div className="d-flex justify-content-end mb-4">
                                                <div className="msg_cotainer_send">
                                                    {message.content}
                                                </div>
                                                <div className="img_cont_msg">
                                                    <img src="" />
                                                </div>
                                            </div>
                                    )
                                })
                            }



                        </div>
                        <div className="card-footer">
                            <div className="input-group">

                                <textarea onKeyDown={onEnterPress} className="form-control type_msg" onChange={(e) => setCurrentMessage(e.target.value)} value={currentMessage} name="" placeholder="Type your message..." />

                                <div className="input-group-append">
                                    <span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
