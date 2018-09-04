import React, { Component } from 'react';
import './Chat.css';
import Messages from "../Messages/Messages"
import firebase from "../../firebase"

const messagesRef = firebase.database().ref('/Messages');

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
            list: [],
            curTime: new Date().toLocaleTimeString(),
        }
    }
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            message: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.message.length > 0) {
        this.setState ({
            curTime: new Date().toLocaleTimeString(),
        })
        this.addtoMessages(this.props.user.name, this.state.message, this.state.curTime);
        this.setState ({
            message: '',
        })
        }
    }
    addtoMessages = (name, message, curTime) => {
        messagesRef.push({name: name, message: message, curTime: curTime})
    }
    componentDidMount() {
        messagesRef.on('value', (snapshot) => {
            this.setState({
                list: snapshot.val(),
            })
        })
        this.scrollToBottom();
    }
    scrollToBottom() {
        this.formMessages.scrollTop = this.formMessages.scrollHeight;
    }
    render() {
        return (
            <div className="chatContainer">
                <div ref={div => { this.formMessages = div; }} className="formMessage">
                    <Messages list={this.state.list} />
                </div>
                <form onSubmit={this.handleSubmit} action="" className="forms">
                    <input type="text" onChange={this.handleChange} value={this.state.message} rows="6" name="message" id="message" placeholder="Type Message Here" className="textMessage" />
                    <input type="submit" value="Send Message" className="submitMessage"/>
                </form>
            </div>
        )
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
}

export default Chat