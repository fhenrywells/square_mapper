
import React, { Component } from "react";
import io from "socket.io-client";


let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);


class DeleteForm extends Component{
  constructor(props){
    super(props);
    this.state = {id:''};
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Form submitting logic, prevent default page refresh
  handleSubmit(event){
    const { id } = this.state
    event.preventDefault()
    socket.emit("message", "delete", id);

  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }


  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='id'>Name</label>
          <input
            name='id'
            placeholder='Object ID'
            value={this.state.id}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button>Delete Object</button>
        </div>
      </form>
    )
  }
}

export default DeleteForm