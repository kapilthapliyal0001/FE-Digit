import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row , Button, Spinner, Image} from 'react-bootstrap';

export default class Card extends Component {
    componentDidMount() {
        console.log(this.props.element)
    }
    
    render() {
        return (
            <Col lg={4} md={4} sm={12} onClick={() => {
                this.props.selectedUrl(this.props.element.src.large)  // State lifting props on Click
            }}>
                <img className="img-thumbnail" src={this.props.element.src.small} alt="" fluid/>
            </Col>
        )
    }
}
