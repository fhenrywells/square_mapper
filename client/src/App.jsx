import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Square from './components/Square';
import CreateForm from './components/CreateForm'
import DeleteForm from './components/DeleteForm'
import MemoizedMap from './components/Map'


let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

const App = () => {

  const [objects, setObjects] = useState([]);
  const [messages, setMessages] = useState([""]);

  useEffect(() => {
    handleMessage();
  }, [objects.length]);

  const handleMessage = () => {
    socket.on("message", msg => {
      let new_objects = msg.map((string) => {
        string = string.split(',')
        string = string.map((elem) => {
          elem = elem.replace(/\W/g, '');
          return elem
        });
        return string
      });

      console.log(new_objects);
      

      let parsed_objects = new_objects.map((object) => {
        let [id, x, y] = object;
        return {"object_id": id, 'x': parseInt(x), 'y': parseInt(y)}
      });

      let parsed_ids = parsed_objects.map((object) => {
        return object["object_id"]
      });
      setObjects(parsed_objects);
      setMessages(parsed_ids)

    });
  };


  return (
    <div>
      <CreateForm /> 
      <DeleteForm />
      {
        // Show user what object IDs are displayed
        <p>Stored object IDs:  {messages.join(', ')} </p> 
      }
      {
        // Render each object as objects is populated
        objects.map(object => (
          <div>
            <Square object_id={object.object_id} left={object.x} top={object.y}></Square>
          </div>
        ))} 
     < MemoizedMap />
    </div>
  );
};

export default App;