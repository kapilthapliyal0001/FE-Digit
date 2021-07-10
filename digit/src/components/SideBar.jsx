import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image} from 'react-bootstrap';

export default class SideBar extends Component {
    render() {
        return (
            <Container lg={12} md={12} sm={12}  className = "my-3 ease-in-out" onClick={() => {
                this.props.selectedUrl(this.props.element.src.large)   // state lifting props on click
            }}>
                <Image className="img-thumbnail" src={this.props.element.src.small} alt="" fluid/>
            </Container>
        )
    }
}
