import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import classnames from "classnames";
import fetchQuestions from "actions/fetchQuestionsAction";

import ucword from "helper/ucword";
import explodeConfetti from "helper/confetti";

import {
    Badge,
  //   Button,
  // Card,
  //   CardBody,
  Container,
  // Row
  // Col
} from "reactstrap";

// import { Link, Redirect } from "react-router-dom";
// import "./index.scss";

// index page sections
import DefaultNavbar from "components/Navbars/Navbar.jsx";
import Question from "components/Question.jsx";

class DomainQuestion extends React.Component {
  state = {
    questions: [],
    isLoading: true,
    description: null,
    answers: null,
    isSubmitting: false,
    msg:"",
    error:false,
    alreadySubmitted: false
  };

  submitForm = () => {
    this.setState({
      isSubmitting: true,
      msg:"",
      error:false
    })

    axios
      .post(
        `https://dscsrm.appspot.com/api/recruitments/applicant/domains/${this.props.match.params.domain}/questions/submissions`,
        {
          answers: this.state.answers
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.token}`
          }
        }
      )
      .then(resp => {
        if (resp.data.success) {
          explodeConfetti();
          this.setState({
            isSubmitting: false,
            msg: "Hurray! Submitted Successfully",
            alreadySubmitted: true
          });
        } else {
          this.setState({
            isSubmitting: false,
            error: true,
            msg: "Something went wrong!"
          });
        }
      })
      .catch(err => {
        this.setState({
          error: true,
          isSubmitting: false,
          msg: err.response.data.error.message
        });
      });
  };
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // this.props.fetchQuestions(this.props.match.params.domain)

    axios
      .get(
        `https://dscsrm.appspot.com/api/recruitments/applicant/domains/${this.props.match.params.domain}/questions`,
        {
          headers: {
            Authorization: `Bearer ${this.props.token}`
          }
        }
      )
      .then(resp => {
        const data = resp.data.data;
        let answers = {};
        if (data.submitted) {
          answers = data.submission.answers;
        } else {
          data.questions.map(q => {
            answers[q._id] = "";
            return "";
          });
        }

        this.setState({
          questions: data.questions,
          description: data.description,
          answers,
          isLoading: false,
          alreadySubmitted: resp.data.data.submitted
        });
      });
  }

  handleAnswerChange = (id, value) => {
    this.setState({
      answers: {
        ...this.state.answers,
        [id]: value
      }
    });
  };
  render() {
    // eslint-disable-next-line no-undef

    return (
      <>
        <main ref="main" className="mb-4">
          <DefaultNavbar />
          <Container
            className="align-items-center"
            style={{ marginTop: "120px" }}
          >
            <h2 className="display-3 mb-2">
              {`${ucword(
                this.props.match.params.domain.split("-").join(" ")
              )} Questionnaire `}
              
              {/* <span className="text-success">
                Instructions
              </span> */}
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
              {(this.state.alreadySubmitted) ? (
                <Badge className="mb-3" color="success" pill>
                  Task Already Submitted
                </Badge>
              ) : (
                <Badge className="mb-3" color="warning" pill>
                  Task Not Submitted Yet
                </Badge>
              )}
                <div>
                  <h5>{this.state.description}</h5>
                </div>
                {this.state.questions.map((ques, index) => {
                  return (
                    <Question
                      key={index}
                      id={index}
                      qid={ques._id}
                      question={ques.question}
                      response={this.state.answers[ques._id]}
                      onAnswerChange={this.handleAnswerChange}
                    />
                  );
                })}

                <small
                  className={classnames({
                    "d-block mb-3 mt-4 font-weight-bold": true,
                    "text-success": !this.state.error,
                    "text-warning": this.state.error
                  })}
                  style={{ height: "20px" }}
                >
                  {this.state.msg}
                </small>
                <button
                  style={{ width: "100px" }}
                  className="btn btn-primary"
                  disabled={this.state.isSubmitting}
                  onClick={this.submitForm}
                >
                  {this.state.isSubmitting === true ? (
                    <div
                      style={{ width: "100%", height: "100%" }}
                      className="rolling-loader"
                    >
                      <div></div>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </>
            )}
          </Container>
        </main>
      </>
    );
  }
}
// eslint-disable-next-line no-unused-vars
const Text = ({ data }) => {
  let newText = data.split("\n").map((item, i) => <p key={i}>{item}</p>);
  return newText;
};
const mapStateToProps = ({ user, question }) => ({
  token: user.token,
  // domainQuestions:question.domainQuestions,
  selectedDomain: question.selectedDomain
});
export default connect(mapStateToProps, {
  fetchQuestions
})(DomainQuestion);
