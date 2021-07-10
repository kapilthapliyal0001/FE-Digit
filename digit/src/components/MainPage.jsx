import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row , Button, Spinner, Image} from 'react-bootstrap';

// Components Imports
import Navbar from '../components/Navbar';
import Card from './Card';
import ImgButton from "../components/Button"
import SideBar from './SideBar';

// RCC
export default class MainPage extends Component {
    state={
        searchQuery : "", 
        startQuery : "nature",
        isLoading : true,
        photosArray : null,
        selectedIndex : 0,
        selectedUrl : null
        
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
            <>  
            {/* NavBar Section */}
                <Navbar searchQuery={(props) => {
                    this.setState({
                        searchQuery : props
                    });
                }}/>

                {/* Loaders Section  for every keystroke and and asyncrnous fetch*/}
                <Container className="text-center">
                    {this.state.isLoading ?<Spinner animation="grow" />: 
                        <Row className="photographer text-center my-2">
                            <h3>Photographer : {this.state.photosArray[this.state.selectedIndex].photographer}
                        and his website : <a href={this.state.photosArray[this.state.selectedIndex].photographer_url}>here</a>
                        </h3>
                        </Row>}
                        <Container className="main-body my-3">
                        <Row className=""> 

                        {/* Buttons Component Starts*/}
                            <ImgButton selectIndex={props => {
                                this.setState({
                                    selectedUrl:this.state.photosArray[props].src.large,
                                    selectIndex: props
                                })
                            }}/>
                        </Row> 
                            {this.state.isLoading ?<Spinner animation="grow" />:<></>}
                        <Row>
                            {/* Side Bar Secion */}
                            <Col lg={3} md={3} sm={12} className="p-2">
                                <Row className="d-flex justify-content-around">
                                    {this.state.isLoading ? <></> : this.state.photosArray.map(photo => (<Card  element={photo} selectedUrl={(props) => {
                                        this.setState({
                                            selectedUrl : props
                                    })
                                    }}/>))}
                                </Row>
                            </Col>
                            {/* Main Section  */}
                            <Col lg={9} md={9} sm={12} className="p-2">
                                <Row>
                                    <Col lg={12} md= {12} sm={12}>
                                    {this.state.isLoading ?<Spinner animation="grow" />:
                                    <div className="m-2">
                                        <img src={this.state.selectedUrl?this.state.selectedUrl :this.state.photosArray[0].src.large} alt="" fluid/>
                                    </div>}
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-around">
                                {this.state.isLoading ? <></> : this.state.photosArray.map(photo => (<Card  element={photo} selectedUrl={(props) => {
                                    this.setState({
                                        selectedUrl : props
                                    })
                                }}/>))}
                                </Row>
                            </Col>
                        </Row>   
                    </Container>
                </Container>
                
            </>
        )
    }
}
