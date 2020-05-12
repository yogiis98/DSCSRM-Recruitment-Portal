import React from "react";

import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

import { Link } from "react-router-dom";
import "./index.scss";

// index page sections
import DefaultNavbar from "components/Navbars/Navbar.jsx";
import Planet from "./Planet";
import Titan from "./Titan";
class Landing extends React.Component {
  state = {
    background: Math.random() > 0.5,
    events: [
      { date: "16th Feb, 2020", title: "Application Open", icon:"ni ni-satisfied", color:"success"},
      { date: "19th Feb, 2020", title: "Application Closes", icon: "ni ni-bell-55", color: "warning" },
      { date: "20th Feb, 2020", title: "Round 1 Online Exam", icon: "ni ni-laptop", color: "primary" },
      { date: "21th Feb, 2020", title: "Round 2 Online Exam", icon: "ni ni-paper-diploma", color: "danger" },
      { date: "22th Feb, 2020 - 01st Mar, 2020", title: "Interviews", icon: "ni ni-single-02", color: "success" },
      { date: "07th Mar, 2020", title: "Declaration of Results", icon: "ni ni-trophy", color: "warning" },
    ],
    social: [{ name: "instagram", link: "https://www.instagram.com/dscsrm/", image:"https://www.dscsrm.com/assets/img/instagram.png"},
      { name: "linkedin", link: "https://www.linkedin.com/company/srm-developer-student-club", image: "https://www.dscsrm.com/assets/img/linkedin.png" },
      { name: "twitter", link: "https://twitter.com/DSC_SRM", image: "https://www.dscsrm.com/assets/img/twitter.png" },
      { name: "facebook", link: "https://www.facebook.com/dscsrm", image: "https://www.dscsrm.com/assets/img/fb.png" }]
  };
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DefaultNavbar />
        <main ref="main">
          <section
            className="section section-shaped section-lg"
            style={{
              backgroundImage: `url(${require("assets/img/background.svg")})`,
              backgroundSize: "cover",
              backgroundPosition: "50% center",
              minHeight: "100vh",
              maxHeight: "999px",
              position: "relative",
              alignItems: "center",
              display: "flex",
              zIndex:2
            }}
          >
            <Container className="pt-lg-md">
              <Row className="row-grid align-items-center">
                <Col className="order-md-12 text-center" md="12">
                  <img
                    src={require("assets/img/logo_dsc.png")}
                    alt="..."
                    width={150}
                    style={{ backgroundColor: "#fff" }}
                  />
                  <h4
                    className="text-warning display-4"
                    style={{
                      fontWeight: 600,
                      textTransform: "uppercase",
                      opacity: 0.7
                    }}
                  >
                    Join the Team
                  </h4>
                  <h1 className="display-1" style={{ fontWeight: 1000 }}>
                    DSC SRM
                  </h1>
                  <h3 className="display-4 text-muted">
                    Powered by Google Developers
                  </h3>
                  <Button
                    color="primary mt-4"
                    tag={Link}
                    to="/Domains"
                  >
                    Go to test
                  </Button>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg" style={{zIndex:99}}>
          <Container>
              <h2 className="display-3 mb-4">
                Domains @ DSC{" "}
                <span className="text-success">
                  We love to work with people who love technology !
                  </span>
              </h2>
            <Row className="justify-content-center">
              <Col lg="12">
                  
                <Row className="row-grid mt-4">
                
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0 mt-3">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-briefcase-24" />
                        </div>
                        <h6 className="text-primary text-uppercase">
                          Corporate and PR
                          </h6>
                        <p className="description mt-3">
                          Following the ideals of famous business magnates like Steve Jobs, Corporate and PR gives you the opportunity to represent DSC at its beck and call. Being the voice of this elite club, the domain involves its members on exploration journeys, business & marketing, documentation and quality assurance.<br/>
                          Ain't we cool, eh?!
                          </p>
                        <div>
                          <Badge color="primary" pill className="mr-1">
                            Socialize
                            </Badge>
                          <Badge color="primary" pill className="mr-1">
                            Strategize
                            </Badge>
                            <Badge color="primary" pill className="mr-1">
                              Simplify
                            </Badge>
                        </div>
                        <Button
                          className="mt-4"
                          color="primary"
                            tag={Link}
                            to="/Register"
                        >
                          Apply Now!
                          </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="ni ni-laptop" />
                        </div>
                        <h6 className="text-success text-uppercase">
                          Technical
                          </h6>
                        <p className="description mt-3">
                          Without Wozniak's technological marvels, Steve Jobs would have been incomplete. DSC SRM presents you, the brain behind this team, the technical domain. This is the platform that makes every member work their.....brains off in order to solve societal issues by bridging the gap through state of the art technology and robust skills. We have it all, from Web and app dev to AI and ML. 
                          </p>
                        <div>
                            <Badge color="success" pill className="mr-1">
                              Invent
                            </Badge>
                          <Badge color="success" pill className="mr-1">
                            Innovate
                            </Badge>
                          <Badge color="success" pill className="mr-1">
                            Initiate
                            </Badge>
                            
                        </div>
                        <Button
                          className="mt-4"
                          color="success"
                            tag={Link}
                            to="/Register"
                        >
                          Apply Now!
                          </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0 mt-3">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                          <i className="ni ni-camera-compact" />
                        </div>
                        <h6 className="text-warning text-uppercase">
                          Creatives And Photography
                          </h6>
                        <p className="description mt-3">
                          The eyes of DSC,  Creatives and Photography demands one to have a vivid imagination as well as an eye for technology. This artistic domain specializes in capturing the moments as well as converting a product into a more presentable form. It takes nothing but talent and passion for its members to unleash their creativity to the world.
                          {/* Are you up for this challenge? */}
                          </p>
                        <div>
                          <Badge color="warning" pill className="mr-1">
                            Capture
                            </Badge>
                          <Badge color="warning" pill className="mr-1">
                            Create
                            </Badge>
                          <Badge color="warning" pill className="mr-1">
                            Connect
                          </Badge>
                            
                        </div>
                        <Button
                          className="mt-4"
                          color="warning"
                            tag={Link}
                            to="/Register"
                        >
                          Apply now!
                          </Button>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          </section>
          <section className="section section-lg">
            <Container>
              {/* <img className="hero-img" src={require("assets/img/hero.png")} alt="..." /> */}
              <Row className="row-grid align-items-center">
                <Col className="order-md-2" md="6">
                  <div className="hover d-flex justify-items-center justify-content-center">
                    {this.state.background ? <Titan /> : <Planet />}
                  </div>
                </Col>
                <Col className="order-md-1 mt-0" md="6">
                  <div className="pr-md-5">
                    <h2 className="display-4 mt-0">Recruitments Schedule . 2020-2021</h2>
                    <ul
                      className="list-unstyled mt-5 timeline timeline-one-side"
                      style={{ position: "relative" }}
                    >
                      {this.state.events.map((event,idx)=>{
                        return (<li key={idx} className="py-2 timeline-details">
                          <div className="d-flex">
                            <div>
                              <Badge
                                className="badge-circle mr-3"
                                color={event.color}
                              >
                                <i className={event.icon} />
                              </Badge>
                            </div>
                            <div>
                              <h6 className="mb-4">
                                {event.date}
                              <br/>
                                <span style={{fontWeight:600}}>{event.title}</span>
                            </h6>
                            </div>
                          </div>
                        </li>)
                      })}
                      
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg pt-0">
            <Container>
              <Card className="bg-gradient-warning shadow-lg border-0">
                <div className="p-5">
                  <Row className="align-items-center">
                    <Col lg="8">
                      <h3 className="text-white">
                        Come work with us.
                      </h3>
                      <p className="lead text-white mt-3">
                        We’re on a mission to make life simpler, more pleasant
                        and more productive – for everyone. We are commited to empower students and people around us with technology.
                      </p>
                    </Col>
                    <Col className="ml-lg-auto" lg="3">
                      <Button
                        block
                        className="btn-white"
                        color="default"
                        size="lg"
                        tag={Link}
                        to="/Register"
                      >
                        Apply now
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Container>
          </section>

          <section className="section section-lg">
            <Container>
              <Row className="row-grid justify-content-center">
                <Col className="text-center" lg="8">
                  <h2 className="display-3">
                    Contact Us.{" "}
                    <span className="text-success">
                      Oooh, we love letters!
                  </span>
                  </h2>
                  <p className="lead">
                    DSC SRM - powered by Google Developers<br/>
                    SRM Institute of Science & Technology,<br/>
                    Kattankulathur, Chennai 603203<br/>
                    India
                </p>
                  <div className="btn-wrapper">
                    <Button
                      className="mb-3 mb-sm-0"
                      color="primary"
                      href="https://www.dscsrm.com/#ContactUs"
                    >
                      Contact Us
                  </Button>
                  </div>
                  <div className="text-center">
                    <h4 className="display-4 mb-5 mt-5">
                      Follow us on
                  </h4>
                    <Row className="justify-content-center">
                    {this.state.social.map((handle,idx)=>{
                      return (<Col key={idx} lg="2" xs="3">
                        <a
                          href={handle.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            alt="..."
                            className="img-fluid"
                            src={handle.image}
                            width={50}
                          />
                        </a>
                      </Col>)
                    })}
                     
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Landing;
