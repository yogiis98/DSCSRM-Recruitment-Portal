import React from "react";
import { connect } from "react-redux";

import {  Link } from "react-router-dom";
import {
  // Badge,
  Button,
  Card,
  // CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

// import { Link } from "react-router-dom";
import "./index.scss";

// index page sections
import DefaultNavbar from "components/Navbars/Navbar.jsx";


class DomainSelection extends React.Component { 
componentDidMount() {
  window.scrollTo(0, 0);
}
  render() {
       return (
         <>
           <DefaultNavbar />
           <Container
             className="align-items-center"
             style={{ marginTop: "120px" }}
           >
             <Card className="bg-gradient-warning shadow-lg border-0 mb-4">
               <div className="p-5">
                 <Row className="align-items-center">
                   <Col lg="8">
                     <h3 className="text-white">
                       Hi, {this.props.candidate.name}
                     </h3>
                     <p className="lead text-white mt-3">
                       Before attempting tasks, It is advised to attempt general
                       subjective questionnaire first.
                       <br />
                       Click on START button to get started.
                     </p>
                   </Col>
                   <Col className="ml-lg-auto" lg="3">
                     <Button
                       block
                       className="btn-white"
                       color="default"
                       size="lg"
                       tag={Link}
                       to="/Domain/general/questions"
                     >
                       Start
                     </Button>
                   </Col>
                 </Row>
               </div>
             </Card>
             <h2 className="display-3 mb-2 mt-4">
               Recruitment Test
               <span className="text-success">Select domain to attempt</span>
             </h2>
             <Row className="justify-content-center mb-4">
               {this.props.candidate.domains.includes("Technical") ? (
                 <Col lg="6" xs="12" sm="12" md="6">
                   <Container>
                     <Card className="bg-gradient-primary shadow-lg border-0 mt-4">
                       <div className="p-5">
                         <Row className="justify-content-center">
                           <Col lg="12">
                             <h3 className="text-white">Technical</h3>
                             <p className="lead text-white mt-3">
                               Work every last one of your brain cells and code
                               away. All the best!
                             </p>
                             <Row>
                               <Col
                                 lg="6"
                                 md="12"
                                 sm="12"
                                 xs="12"
                                 className="mt-2 mb-2"
                               >
                                 <Button
                                   block
                                   className="btn-white"
                                   color="default"
                                   size="lg"
                                   tag={Link}
                                   to="/Domain/technical/questions"
                                 >
                                   Questions
                                 </Button>
                               </Col>
                               <Col
                                 lg="6"
                                 md="12"
                                 sm="12"
                                 xs="12"
                                 className="mt-2 mb-2"
                               >
                                 <Button
                                   block
                                   className="btn-white"
                                   color="default"
                                   size="lg"
                                   tag={Link}
                                   to="/Domain/technical/tasks"
                                 >
                                   Tasks
                                 </Button>
                               </Col>
                             </Row>
                           </Col>
                         </Row>
                       </div>
                     </Card>
                   </Container>
                 </Col>
               ) : (
                 <Container></Container>
               )}

               {this.props.candidate.domains.includes(
                 "Creatives And Photography"
               ) ? (
                 <Col lg="6" xs="12" sm="12" md="6">
                   <Container>
                     <Card className="bg-gradient-success shadow-lg border-0 mt-4">
                       <div className="p-5">
                         <Row className="justify-content-center">
                           <Col lg="12">
                             <h3 className="text-white">
                               Creative & Photography
                             </h3>
                             <p className="lead text-white mt-3">
                               Get your creative juices flowing. All the best!
                             </p>

                             <Row>
                               <Col
                                 lg="6"
                                 md="12"
                                 sm="12"
                                 xs="12"
                                 className="mt-2 mb-2"
                               >
                                 <Button
                                   block
                                   className="btn-white"
                                   size="lg"
                                   tag={Link}
                                   to="/Domain/creatives-and-photography/questions"
                                 >
                                   Questions
                                 </Button>
                               </Col>
                               <Col
                                 lg="6"
                                 md="12"
                                 sm="12"
                                 xs="12"
                                 className="mt-2 mb-2"
                               >
                                 <Button
                                   block
                                   className="btn-white"
                                   size="lg"
                                   tag={Link}
                                   to="/Domain/creatives-and-photography/tasks"
                                 >
                                   Tasks
                                 </Button>
                               </Col>
                             </Row>
                           </Col>
                         </Row>
                       </div>
                     </Card>
                   </Container>
                 </Col>
               ) : (
                 <Container> </Container>
               )}
             </Row>
           </Container>
         </>
       );
  }
}

const mapStateToProps = ({user,task}) => ({
  candidate:user.candidate,
  selectedDomain:task.selectedDomain
});

export default connect(mapStateToProps, {
  
})(DomainSelection);
