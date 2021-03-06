import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Animista, {AnimistaTypes} from "react-animista";
import {Container, Col, Row, Spinner, Image, Badge} from "react-bootstrap";

// CSS import
import "../styles/styles.css";

// Components Imports
import Navbar from "../components/Navbar";
import Card from "./Card";
import ImgButton from "../components/Button";
import SideBar from "./SideBar";

// React Component
export default class MainPage extends Component {
  state = {
    visitor: 0,
    searchQuery: "",
    startQuery: "nature",
    isLoading: true,
    photosArray: null,
    selectedIndex: 0,
    selectedUrl: null,
  };

  //  on button click state change
  selectIndex = (e) => {
    this.setState({
      selectedIndex: e,
    });
  };

  // fetching
  componentDidMount = () => {
    try {
      fetch(
        `https://api.pexels.com/v1/search?query=${this.state.startQuery}&per_page=3`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log("Error in fetching images (CDM)");
          }
        })
        .then((data) => {
          this.setState({
            photosArray: data.photos,
            isLoading: false,
          });
          console.log(data.photos);
        })
        .catch((error) => {
          console.log("Error in the Fetch API !");
          console.log(error);
        });
      //  OTHER WAY AROUND USING ASYNC / AWAIT (Using both is unnecessary coding)

      //    componentDidMount = async() => {
      // const res = await fetch(`https://api.pexels.com/v1/search?query=${this.state.startQuery}&per_page=3`, {
      //         headers: {
      //         Authorization:
      //         `Bearer ${process.env.REACT_APP_KEY}`,
      //       }})
      // const data = await  res.json()

      // this.setState({
      //     photosArray : data.photos,
      //     isLoading : false
      //    })
      //   }
      //   }

      // Getting the total users;
      fetch(`https://digitbackend.herokuapp.com/users/60e99e35d667a66ab48b3abc`)
        .then((data) => data.json())
        .then((user) => {
          this.setState({
            visitor: user.visitor + 1,
          });
          return user.visitor;
        })
        .catch((error) => {
          console.log("Error in the fetching user number!: ", error);
        });

      // Adding one more user
      fetch(
        `https://digitbackend.herokuapp.com/users/60e99e35d667a66ab48b3abc`,
        {
          method: "PUT",
          body: JSON.stringify({
            visitor: this.state.visitor,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
    } catch (error) {
      console.log("Error in the Component did Mount");
      console.log(error);
    }
  };

  // For every keystore fetching + two ways data binding at Component Level;

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.searchQuery !== this.state.searchQuery) {
      try {
        if (this.state.searchQuery === "") {
          this.setState({
            searchQuery: "nature",
          });
        }
        fetch(
          `https://api.pexels.com/v1/search?query=${
            this.state.searchQuery === "" ? "nature" : this.state.searchQuery
          }&per_page=3`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              photosArray: data.photos,
              selectedUrl: data.photos[0].src.large,
              isLoading: false,
            });
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Stopped the infintie loop");
    }
  };

  render() {
    return (
      <div className="home">
        {/* NavBar Section */}
        <Navbar
          searchQuery={(props) => {
            this.setState({
              searchQuery: props,
            });
          }}
        />
        {/* FLIP_VERTICAL_BCK */}
        {/* Loaders Section for every keystroke + stateLifting and and asyncrnous fetch*/}
        <Container>
          {this.state.isLoading ? (
            <Spinner animation="grow" />
          ) : (
            <Row className="photographer d-flex justify-content-center my-2">
              <h3>
                ???? Photographer :{" "}
                <span className="pht-name">
                  {
                    this.state.photosArray[this.state.selectedIndex]
                      .photographer
                  }
                </span>{" "}
                website :{" "}
                <a
                  href={
                    this.state.photosArray[this.state.selectedIndex]
                      .photographer_url
                  }
                >
                  ????
                </a>
              </h3>
            </Row>
          )}
          <Container className="main-body my-3">
            {/* Buttons Component Starts*/}
            <Badge variant="dark">Visitor No: {this.state.visitor}</Badge>
            <Row className="d-flex justify-content-around">
              <ImgButton
                selectIndex={(props) => {
                  this.setState({
                    selectedUrl: this.state.photosArray[props].src.large,
                    selectIndex: props,
                  });
                }}
              />
            </Row>
            {this.state.isLoading ? <Spinner animation="grow" /> : <></>}
            <Row>
              {/* Side Bar Secion */}
              <Col lg={3} md={3} sm={12} className="p-2 sidebar-cards">
                <Row className="flex-column justify-content-around">
                  {this.state.isLoading ? (
                    <></>
                  ) : (
                    this.state.photosArray.map((photo) => (
                      <SideBar
                        key={photo.id}
                        element={photo}
                        selectedUrl={(props) => {
                          this.setState({
                            selectedUrl: props,
                          });
                        }}
                      />
                    ))
                  )}
                </Row>
              </Col>
              {/* Main Image Section  */}
              <Col lg={9} md={9} sm={12} className="p-2">
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    {/* Large Image */}
                    {this.state.isLoading ? (
                      <Spinner animation="grow" />
                    ) : (
                      <div className="m-2 shadow-class">
                        <Image
                          className=".grow img-thumbnail img-main"
                          src={
                            this.state.selectedUrl
                              ? this.state.selectedUrl
                              : this.state.photosArray[0].src.large
                          }
                          alt=""
                          fluid
                        />
                      </div>
                    )}
                  </Col>
                </Row>

                {/* Bottom Images */}
                <Row className="d-flex justify-content-around my-2 bottom-cards">
                  {this.state.isLoading ? (
                    <></>
                  ) : (
                    this.state.photosArray.map((photo) => (
                      <Card
                        key={photo.id}
                        element={photo}
                        selectedUrl={(props) => {
                          this.setState({
                            selectedUrl: props,
                          });
                        }}
                      />
                    ))
                  )}
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}
