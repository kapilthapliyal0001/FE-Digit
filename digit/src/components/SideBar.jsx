import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row , Button, Spinner, Image} from 'react-bootstrap';

export default class SideBar extends Component {
    render() {
        return (
            <Row onClick={() => {
                this.props.selectedUrl(this.props.element.src.large)
            }}>
                <img src={this.props.element.src.small} alt="" fluid/>
            </Row>
        )
    }
}
