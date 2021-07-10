import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row , Button, Spinner, Image} from 'react-bootstrap';

export default class SideBar extends Component {
    render() {
        return (
            <div lg={12} md={12} sm={12}  className = "my-3" onClick={() => {
                this.props.selectedUrl(this.props.element.src.large)   // state lifting props on click
            }}>
                <img className="img-thumbnail" src={this.props.element.src.small} alt="" fluid/>
            </div>
        )
    }
}
