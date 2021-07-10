import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Card from './Card';
import { Container, Col, Row , Button, Spinner, Image} from 'react-bootstrap';
export default class MainPage extends Component {
    state={
        searchQuery : "", 
        startQuery : "nature",
        isLoading : true,
        photosArray : null,
        selectedIndex : 0
        
    }

    selectIndex = (e) => {
        this.setState({
            selectedIndex : e
        })
    }

    componentDidMount = async() => {
        try {
            const result = await fetch(`https://api.pexels.com/v1/search?query=${this.state.startQuery}&per_page=3`, {
                headers: {
                    Authorization:
                      "Bearer 563492ad6f917000010000017f488949f5c24f7cb9fc4ad4069c1050",
                  }
            }).then(res => res.json()).then(data => {
                this.setState({
                    photosArray : data.photos,
                    isLoading : false
                })
                console.log(data.photos[0].src);
            })

        } catch (error) {
            console.log(error)
        }
    }
    

 componentDidUpdate = async(prevProps, prevState) => {
     if (prevState.searchQuery !== this.state.searchQuery) {
        try {
            const result = await fetch(`https://api.pexels.com/v1/search?query=${this.state.searchQuery}&per_page=3`, {
                headers: {
                    Authorization:
                      "Bearer 563492ad6f917000010000017f488949f5c24f7cb9fc4ad4069c1050",
                  }
            }).then(res => res.json()).then(data => {
                this.setState({
                    photosArray : data.photos,
                    isLoading : false
                })
                console.log(data.photos[0].src);
            })
    
        } catch (error) {
            console.log(error)
        }
     } else {
         console.log("Stopped the infintie loop")
     }
 }
 

    render() {
        return (
            <div>
                <Navbar searchQuery={(props) => {
                    this.setState({
                        searchQuery : props
                    });
                    // this.updateSearch()
                }}/>
                {this.state.isLoading ?<Spinner animation="grow" />: 
                 <Row className="photographer">
                     <h3>Photographer : {this.state.photosArray[this.state.selectedIndex].photographer}
                 and his website : <a href={this.state.photosArray[this.state.selectedIndex].photographer_url}>here</a>
                 </h3>
                 </Row>
 }
                
                <Container className="main-body my-3">
                    <Row className="justify-content-around my-1"> 
                    <Button variant="light" onClick={(e) => this.selectIndex(0)}>Image 1</Button>
                    <Button variant="light" onClick={(e) => this.selectIndex(1)}>Image 2</Button>
                    <Button variant="light" onClick={(e) => this.selectIndex(2)}>Image 3</Button>
                    </Row> 
                     {this.state.isLoading ?<Spinner animation="grow" />:<></>}
                    <Row>
                            <Col lg={3} md={3} sm={12} className="p-2"><h3>The Sidebar</h3></Col>
                            <Col lg={9} md={9} sm={12} className="p-2">
                                <Row>
                                    <Col lg={12} md= {12} sm={12}>
                                        <h3>Main image</h3>
                                    </Col>
                                </Row>
                                <Row>
                                {this.state.isLoading ? <></> : this.state.photosArray.map(photo => (<Card element={photo}/>))}
                                </Row>
                            </Col>
                        </Row>   
                   
                </Container>
            </div>
        )
    }
}
