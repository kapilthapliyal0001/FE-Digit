import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';


export default class ImgButton extends Component {
    render() {
        return (
            <div>
                <Button lg={4} md={4} sm={12} className="m-2 ease-in-out" variant="light" onClick={(e) => this.props.selectIndex(0)}>Image 1</Button>
                <Button lg={4} md={4} sm={12} className="m-2 ease-in-out" variant="light" onClick={(e) => this.props.selectIndex(1)}>Image 2</Button>
                <Button lg={4} md={4} sm={12} className="m-2 ease-in-out" variant="light" onClick={(e) => this.props.selectIndex(2)}>Image 3</Button>
            </div>
        )
    }
}
