import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import classnames from "classnames";
import explodeConfetti from "helper/confetti";
import {
  Badge,
  Container,
  Row
} from "reactstrap";
import "./index.scss";
import DefaultNavbar from "components/Navbars/Navbar.jsx";
import Question from 'components/Question.jsx';

class Task extends React.Component {
  state = {
    task: null,
    isLoading: true,
    answers: null,
    isSubmitting:false,
    file_link:null,
    error:false,
    msg:"",
    fileUploaded:false
  };

  // showWidget = (widget)=>{
  //     widget.open()
  // }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    axios
      .get(
        `https://dscsrm.appspot.com/api/recruitments/applicant/domains/${this.props.match.params.domain}/tasks/${this.props.match.params.taskId}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.token}`
          }
        }
      )
      .then(resp => {
        // console.log(resp.data.data[0]);
        const data = resp.data.data;
        let answers = {};
        let file_link = "";
        if (data.submitted) {
          answers = data.submission.answers;
          file_link = data.submission.file_link;
        } else {
          data.questions.map(q => {
            answers[q._id] = "";
            return "";
          });
        }
        this.setState({
          task: data,
          answers,
          file_link,
          isLoading: false,
          isSubmitted: data.submitted
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
  showWidget = widget => {
    widget.open();
  };
  // eslint-disable-next-line no-undef
  widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dscsrm",
      uploadPreset: "dscsrm2",
      sources: ["local"],
      showCompletedButton: true,
      multiple: false,
      maxFiles: 1,
      maxFileSize: 5500000 * 100,
      maxRawFileSize: 5500000 * 100,
      showPoweredBy: true,
      showUploadMoreButton: false,
      singleUploadAutoClose: true,
      clientAllowedFormats: ["zip", "tar", "pdf", "docs", "txt", "doc", "rar"]
    },
    (error, result) => {
      if (!error && result) {
        // const eventData = result.data;
        // console.log(eventData);
        if (result.event === "success") {
          this.setState(state=>{
            return { ...state, fileUploaded:true ,file_link: result.info.secure_url};
          })
        }
      }
    }
  );
  handleSubmit=()=>{
    if(!this.state.file_link){
          this.setState({
            msg: "Please upload the file before submitting!",
            error: true
          });
          return;
    }
    this.setState({
      isSubmitting: true,
      msg:"",
      error:false
    });

    axios
      .post(
        `https://dscsrm.appspot.com/api/recruitments/applicant/domains/${this.props.match.params.domain}/tasks/${this.props.match.params.taskId}/submissions`,
        {
          answers: this.state.answers,
          file_link: this.state.file_link
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
            isSubmitted: true,
            msg: "Hooray! Submitted Successfully!"
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
  }
  render() {
    return (
      <>
        <main ref="main" className="mb-4">
          <DefaultNavbar />
          {this.state.isLoading ? (
            <div className="preloader bouncing-loader" style={{ zIndex: "1" }}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <Container
              className="align-items-center"
              style={{ marginTop: "120px" }}
            >
              <h2 className="display-3 mb-2">
                {this.state.task.title}
                <span className="text-success">Instructions</span>
              </h2>
              {this.state.isSubmitted ? (
                <Badge className="mb-3" color="success" pill>
                  Task Already Submitted
                </Badge>
              ) : (
                <Badge className="mb-3" color="warning" pill>
                  Task Not Submitted Yet
                </Badge>
              )}

              <Row className="instruction-task">
                <div>
                  <ol>
                    {this.state.task.description.map((line, idx) => {
                      return <li key={"li" + idx}>{<Text data={line} />}</li>;
                    })}
                  </ol>
                </div>
              </Row>
              {this.state.task.questions.map((ques, index) => {
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
                  "d-block mt-4 mb-3 font-weight-bold": true,
                  "text-success": !this.state.error,
                  "text-warning": this.state.error
                })}
                style={{ height: "20px" }}
              >
                {this.state.msg}
              </small>
              {this.state.file_link ? (
                <p>
                  Last Uploaded File -{" "}
                  <a href={this.state.file_link}>Click Here</a>
                </p>
              ) : null}
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.showWidget(this.widget);
                }}
              >
                {this.state.fileUploaded ? (
                  <>
                    Uploaded{" "}
                    <Badge className="badge-white ml-2">
                      {" "}
                      <i className="ni ni-check-bold"></i>
                    </Badge>
                  </>
                ) : (
                  <>Upload File</>
                )}
              </button>
              <button
                style={{ width: "100px" }}
                className="btn btn-primary"
                disabled={this.state.isSubmitting}
                onClick={this.handleSubmit}
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
            </Container>
          )}
        </main>
      </>
    );
  }
}
const Text =({data})=>{
    let newText = data.split("\n").map((item, i) => <p key={i}>{item}</p>);
  return (
    newText
  );
}
const mapStateToProps = ({user,task}) => ({
  token:user.token
});
export default connect(mapStateToProps, {
  
})(Task);