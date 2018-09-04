import React, { Component } from 'react';
import './Nav.css';
import Modal from '../Modal/Modal';
import Friends from '../Friends/Friends';

class Nav extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            friends: false
        }
    }
    showModal = () => {
        this.setState({
            open: !this.state.open
        });
    }
    showFriends = () => {
        this.setState({
            friends: !this.state.friends
        });
    }
    handleAnchor = (e) => {
        e.preventDefault();
        this.showModal();
    }
    render() {
        return (
            <div className="navBar">
                <nav>
                    <h1>Welcome, {this.props.user.name}</h1>
                    <p className="icon">
                        <i onClick={this.showfriends} class="fas fa-user-friends"></i>
                        <Friends show={this.state.friends}/>
                    </p>
                    <ul className="nav">
                        <li><a href="" onClick={this.handleAnchor}>Profile</a></li>
                        <li><a onClick={() => this.props.googleLogout()} href="">Signout</a></li>
                    </ul>
                </nav>  
                <Modal show={this.state.open} onClose={this.showModal} addToList={this.props.addToList} user={this.props.user} />
            </div>
        )
    }
}

export default Nav