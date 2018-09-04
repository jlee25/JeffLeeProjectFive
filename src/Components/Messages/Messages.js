import React, { Component } from 'react';
import './Messages.css';

class Messages extends Component {
    render() {
        console.log(this.props)
        return(
            <div className="message">
                <ul className="messageUser">
                    {Object.keys(this.props.list).map((key) => {
                        return (
                        <div className="totalMessages">
                            <li className="listName" key={key} >{this.props.list[key].name} <span class="time">{this.props.list[key].curTime}</span></li>
                            <li className="listMessage" key={key} >{this.props.list[key].message}</li>
                        </div>
                        )
                    })}
                </ul>    
            </div>
        )
    }
}

export default Messages