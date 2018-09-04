import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
    constructor() {
        super();
        this.state = {
            age: '',
            sex: '',
            color: '',
            hobbies: '',
            user: '',
        }
    }
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.color);
        console.log(this.state.hobbies);
        this.props.addToList(this.state.color, this.state.hobbies);
        this.setState({
            color: '',
            hobbies: '',
        })
        this.onClose();
    }
    render() {
        if (!this.props.show) {
            return null;
        }
        return(
            <div className="modalBackground">
                <div className="modalContainer">
                    <h1>Your Profile</h1>
                    <form onSubmit={this.handleSubmit} className="modalProfile" action="">
                        <div className="inputs">
                            <label for="age">Age:</label>
                            <input onChange={this.handleChange} type="text" name="age" id="age" />
                        </div>
                        <div className="inputs">
                            <label for="sex">Sex: </label>
                            <label for="male">Male</label>
                            <input type="radio" name="sex" value="male" id="male" />
                            <label for="female">Female</label>
                            <input type="radio" name="sex" value="female" id="female" />
                            <label for="Other">Other</label>
                            <input type="radio" name="sex" value="other" id="other" />
                        </div>
                        <div className="inputs">
                            <label for="color">Favourite Colour:</label>
                            <input maxlength="10" onChange={this.handleChange} type="text" name="color" id="color" />
                        </div>
                        <div className="inputs">
                            <label for="hobbies">Favourite Things To Do:</label>
                            <input maxlength="15" onChange={this.handleChange} type="text" name="hobbies" id="hobbies" />
                        </div>
                        <input className="submitButton" type="submit" value="Update" />
                    </form>
                    <span className="theEx" onClick={(e) => {this.onClose(e)}}>&#10060;</span>
                </div>
            </div>
        )
    }
}

export default Modal