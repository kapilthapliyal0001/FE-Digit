import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Image} from 'react-bootstrap';

export default class Card extends Component {
    componentDidMount() {
        console.log(this.props.element)
    }
    
    render() {
        return (
            <Col className="my-2 ease-in-out" lg={4} md={4} sm={12} onClick={() => {
                this.props.selectedUrl(this.props.element.src.large)  // State lifting props on Click
            }}>
                <Image className="img-thumbnail img-fluid" src={this.props.element.src.small} alt="" fluid/>
            </Col>
        )
    }
}
