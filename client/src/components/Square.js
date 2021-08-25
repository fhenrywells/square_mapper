'use strict';
import './../App.css'
import square_img from './../square.svg'
import {Image} from 'react';

const React = require('react');
const ReactDOM = require('react-dom');

// Object to display around map
// TODO make this component generalizable to different types of shapes
class Square extends React.Component {

  constructor(props) {
    super(props);
    this.listRef = React.createRef();

  }

  render() {
    var padding = 200 + 'px';
    return (
      <div Image src={square_img} alt="HTML5" id="square" style={{padding:padding, left: this.props.left, top: this.props.top, position:'absolute'}}/>
    )
  }
}

export default Square;