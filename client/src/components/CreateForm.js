
import React, {Component} from "react";
import io from "socket.io-client";


let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);


class CreateForm extends Component{
  constructor(props){
    super(props)
    this.state = { type:'',id:'', x:'', y:'', color:''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Form submitting logic, prevent default page refresh
  handleSubmit(event){
    const {id, x, y } = this.state
    event.preventDefault()
    socket.emit("message", "update", id, x, y);

  }

  // Handle change in form entry
  handleChange(event){
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name] : event.target.value
    })
  }

  // Return controlled form
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='id'>Object ID</label>
          <input
            name='id'
            placeholder='Object ID'
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='x'>X Location</label>
          <input
            name='x'
            placeholder='X Location'
            value={this.state.x}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='y'>Y Location</label>
          <input
            name='y'
            placeholder='Y Location'
            value={this.state.y}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button>Create/Update Object</button>
        </div>
      </form>
    )
  }
}

export default CreateForm