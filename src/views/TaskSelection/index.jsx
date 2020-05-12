import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import fetchTasks from "actions/fetchTasksAction"

import ucword from "helper/ucword";

import {
  // Badge,
  Button,
  Card,
//   CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip 
} from "reactstrap";

import { Link } from "react-router-dom";
import "./index.scss";

// index page sections
import DefaultNavbar from "components/Navbars/Navbar.jsx";

class TaskSelection extends React.Component {
  state = {
    technicalInstructions: [
      "You are supposed to complete at least 1 task within the given time limit.",
      "Evaluation is not based on the number of tasks you've attempted/completed.",
      "First try to complete one task in which you’re are most comfortable, if time allows attempt the remaining.",
      "Add a readme file with proper documentation on how to run your code in your .zip file.",
      "You will be judged on variety of factors such as code style, documentation, coding pattern.",
      "You are not permitted to make use of any fully pre built templates etc. until stated in task specifically.",
      "Plagiarising code will lead to immediate disqualification.",
      "Make sure to complete your task before the given deadline, if possible deploy it somewhere (like Github, Heroku, Netlify etc) else submit the .zip file properly.",
      "Add some screenshots of your final output in your zip file.",
      "Maximum size of zip file that can be uploaded in task is 10 MB. If for some reason your files exceed that limit then you can host you project on github or google drive and Then you can upload a txt or doc file with public link of your github or google drive in upload section of task."
    ],
    creativeInstructions: [
      "Decide on your highest priority subdomain before continuing. ",
      "Evaluation is not based on the number of task you've attempted/completed.",
      "First try to complete one task in which your are most comfortable, if time allows attempt others.",
      "Plagiarising someone’s work will lead to immediate disqualification.",
      "You have to answer every question under your decided subdomain, but feel free to answer questions from other subdomains of interest as well.",
      "Maximum size of zip file that can be uploaded in task is 10 MB. If for some reason your files exceed that limit then you can host you project on github or google drive and Then you can upload a txt or doc file with public link of your github or google drive in upload section of task."
    ],
    domainTasks: [],
    isLoading: true
  };
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // this.props.fetchTasks(this.props.match.params.domain);
    axios
      .get(
        `https://dscsrm.appspot.com/api/recruitments/applicant/domains/${this.props.match.params.domain}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${this.props.token}`
          }
        }
      )
      .then(resp => {
        this.setState({
          domainTasks: resp.data.data,
          isLoading: false
        });
      });
  }

  render() {
    return (
      <>
        <DefaultNavbar />
        <Container
          className="align-items-center"
          style={{ marginTop: "120px" }}
        >
          <h2 className="display-3 mb-2">
            {ucword(this.props.match.params.domain.split("-").join(" "))} Tasks
            <span className="text-success">
              Instructions
              {/* {this.props.selectedDomain} */}
            </span>
          </h2>
          {this.state.isLoading ? (
            <div
              className="preloader bouncing-loader"
              style={{ zIndex: "1", position: "inherit", height: "50vh" }}
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <>
              <Row className="">
                <div>
                  <ul>
                    {this.props.match.params.domain === "technical"
                      ? this.state.technicalInstructions.map((inst, index) => {
                          return <li key={index}>{inst}</li>;
                        })
                      : this.state.creativeInstructions.map((inst, index) => {
                          return <li key={index}>{inst}</li>;
                        })}
                  </ul>
                </div>
              </Row>
              <Row className="justify-content-center mb-4 mt-4">
                {this.state.domainTasks.map((task, idx) => {
                  return (
                    <Col lg="4" md="6" xs="12" sm="12" key={idx}>
                      <Card className="shadow-lg border-0 mt-4 task-card">
                        {task.submitted ? (
                          <>
                            <div
                              className="icon icon-shape icon-shape-primary rounded-circle submitted-circle ml-auto"
                              id={"completed" + task._id}
                            >
                              <i className={`ni ni-check-bold`} />
                            </div>
                            <UncontrolledTooltip
                              delay={0}
                              placement="top"
                              target={"completed" + task._id}
                            >
                              Submitted
                            </UncontrolledTooltip>
                          </>
                        ) : null}
                        <div
                          className={`icon icon-shape icon-lg bg-gradient-${task.icon_background} rounded-circle mx-auto text-white`}
                        >
                          <i className={`ni ni-${task.icon}`} />
                        </div>

                        <div className="p-5 mt-3">
                          <Row className="justify-content-center">
                            {
                              <Col lg="12">
                                <h4 className="text-black">{task.title}</h4>

                                <p className="text-black mt-3">
                                  {task.short_description}
                                </p>
                              </Col>
                            }
                          </Row>
                        </div>
                        <Button
                          block
                          className="btn btn-link custom-btn"
                          color="default"
                          size="lg"
                          tag={Link}
                          to={`/Domain/${this.props.match.params.domain}/tasks/${task._id}`}
                        >
                          <div className="cardFooter">View</div>
                        </Button>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </>
          )}
        </Container>
      </>
    );
  }
}
const mapStateToProps = ({user,task}) => ({
  token:user.token,
  selectedDomainSlug:task.selectedDomainSlug,
  selectedDomain:task.selectedDomain
});
export default connect(mapStateToProps, {
  fetchTasks
})(TaskSelection);
