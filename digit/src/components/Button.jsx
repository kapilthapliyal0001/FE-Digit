import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row , Button, Spinner, Image} from 'react-bootstrap';


export default class ImgButton extends Component {
    render() {
        return (
            <div className="d-flex justify-content-around">
                <Button variant="light" onClick={(e) => this.props.selectIndex(0)}>Image 1</Button>
                <Button variant="light" onClick={(e) => this.props.selectIndex(1)}>Image 2</Button>
                <Button variant="light" onClick={(e) => this.props.selectIndex(2)}>Image 3</Button>
            </div>
        )
    }
}
