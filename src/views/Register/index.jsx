import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Container,
  Row,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Badge
} from "reactstrap";

import { Link } from "react-router-dom";
import Confetti from "./Confetti";
import Recaptcha from 'react-google-invisible-recaptcha';
import axios from "axios";
// core components
import DefaultNavbar from "components/Navbars/Navbar.jsx";
import "./index.scss";
class Index extends React.Component {
  state = {
    formErr: "",
    step: 1,
    name_invalid: false,
    name: "",
    email_invalid: false,
    email: "",
    regno_invalid: false,
    regno: "",
    branch_invalid: false,
    branch: "",
    mobile_invalid: false,
    mobile: "",
    whatsapp_mobile_invalid: false,
    whatsapp_mobile: "",
    year: "1",
    gender: "Female",
    domains: [],
    formSuccess: false,
    submitting: false,
    duplicate: false
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  handleName = e => {
    var inputStr = e.target.value
    // inputStr = inputStr.trim();
    var regexPattern = new RegExp("^[a-zA-Z ]*$")
    var isStringValid = regexPattern.test(inputStr)
    if (isStringValid) {
      this.setState({
        name: inputStr,
        name_invalid: false,
      })
    } else {
      this.setState({
        name: inputStr,
        name_invalid: true,
      })
    }
  }
  handleEmail(e) {
    var inputStr = e.target.value
    inputStr = inputStr.trim();
    var regexPattern = new RegExp(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    var isStringValid = regexPattern.test(inputStr)
    if (isStringValid) {
      this.setState({
        email: inputStr,
        email_invalid: false,
      })
    } else {
      this.setState({
        email: inputStr,
        email_invalid: true,
      })
    }
  }
  handleRegno = e => {
    var inputStr = e.target.value;
    inputStr = inputStr.trim();
    var regexPattern = new RegExp("^[A-Za-z0-9- /./,]+$");
    var isStringValid = regexPattern.test(inputStr);
    if (isStringValid) {
      this.setState({
        regno: inputStr,
        regno_invalid: false
      });
    } else {
      this.setState({
        regno: inputStr,
        regno_invalid: true
      });
    }
  }
  handleMobileNo(e) {
    var inputStr = e.target.value
    inputStr = inputStr.trim();
    var regexPattern = new RegExp("^[0-9]{10}$")
    var isStringValid = regexPattern.test(inputStr)
    if (isStringValid) {
      this.setState({
        mobile: inputStr,
        mobile_invalid: false,
      })
    } else {
      this.setState({
        mobile: inputStr,
        mobile_invalid: true,
      })
    }
  }
  handleWhatsappMobileNo(e) {
    var inputStr = e.target.value
    inputStr = inputStr.trim();
    var regexPattern = new RegExp("^[0-9]{10}$")
    var isStringValid = regexPattern.test(inputStr)
    if (isStringValid) {
      this.setState({
        whatsapp_mobile: inputStr,
        whatsapp_mobile_invalid: false,
      })
    } else {
      this.setState({
        whatsapp_mobile: inputStr,
        whatsapp_mobile_invalid: true,
      })
    }
  }
  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleNext = () => {
    if (this.state.step === 1) {
      if (this.state.name && this.state.email && this.state.gender && !this.state.name_invalid && !this.state.email_invalid) {
        this.setState({
          step: 2,
          formErr: ""
        })
      } else {
        this.setState({
          formErr: "Please fill details correctly",
          name_invalid: (this.state.name_invalid || !this.state.name) ? true : false,
          email_invalid: (this.state.email_invalid || !this.state.email) ? true : false
        })
      }
    } else if (this.state.step === 2) {
      if (this.state.regno && this.state.branch && this.state.year && !this.state.regno_invalid && !this.state.branch_invalid) {
        this.setState({
          step: 3,
          formErr: ""
        })
      } else {
        this.setState({
          formErr: "Please fill details correctly",
          regno_invalid: (this.state.regno_invalid || !this.state.regno) ? true : false
        })
      }
    } else {
      return;
    }
  }
  handleBack = () => {
    if (this.state.step === 2) {
      this.setState({
        step: 1,
        formErr: ""
      })
    } else if (this.state.step === 3) {
      this.setState({
        duplicate: false,
        step: 2,
        formErr: ""
      })
    } else {
      return;
    }
  }
  domainChange = e => {
    // current array of options
    const domains = this.state.domains
    let index

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      domains.push(e.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = domains.indexOf(e.target.value)
      domains.splice(index, 1)
    }

    // update the state with the new array of options
    this.setState({ domains: domains })
  }
  renderBlankDomains = () => {
    let items = [];
    for (let j = 0; j < 2 - this.state.domains.length; j++) {
      items.push(<div key={j} className="skeleton mr-2" style={{ width: "100px", height: "20px", marginTop: "0px" }}></div>)
    }
    return items
  }
  handleSubmit = async () => {

    let {
      name,
      email,
      gender,
      year,
      branch,
      regno,
      mobile,
      whatsapp_mobile,
      domains
    } = this.state;

    try {
      const response = await axios.post(
        "https://dscsrm.appspot.com/api/recruitments/submissions",
        {
          "g-recaptcha-response": this.recaptcha.getResponse(),
          candidate: {
            name,
            email,
            gender,
            year,
            branch,
            regno,
            mobile,
            whatsapp_mobile,
            domains
          }
        }
      );
      // console.log(response)
      this.recaptcha.reset();
      if (response.status === 201) {
        this.setState({
          formSuccess: true,
          response: response.data.user_details,
        })
      }
    } catch (err) {
      this.recaptcha.reset();
      if (err.response.status === 409) {
        this.setState({
          duplicate: true,
          formErr:
            "Already registered with this email ID!",
        })
      } else if (err.response.status === 400) {
        this.setState({
          formErr:
            "Bad Request!",
        })
      } else {
        this.setState({
          formErr:
            "Some error occured! please refesh page.",
        })
      }
    }

    this.setState({ submitting: false })

  }

  handleSubmitButtonClick = () => {
    if (this.state.mobile && !this.state.mobile_invalid && this.state.whatsapp_mobile && !this.state.whatsapp_mobile_invalid && this.state.domains.length >= 2) {
      this.setState({ submitting: true })
      if (this.recaptcha.execute) {
        this.setState({
          duplicate: false,
          formSuccess: false
        })
        this.recaptcha.execute();
      } else {
        this.setState({
          submitting: false,
          formErr: "Please Refresh the page"
        })
      }

    } else {
      if (this.recaptcha.execute) {
        this.recaptcha.reset();
      } else {
        this.setState({
          submitting: false,
          formErr: "Please Refresh the page"
        })
      }

      this.setState({
        formErr: "Please fill details correctly",
        mobile_invalid: (this.state.mobile_invalid || !this.state.mobile) ? true : false,
        whatsapp_mobile_invalid: (this.state.whatsapp_mobile_invalid || !this.state.whatsapp_mobile) ? true : false
      })
    }
  }
  confetti=()=>{
    const colors = ["#4285f4", "#db4437", "#f4b400", "#0f9d58"];
    // eslint-disable-next-line no-undef
    confetti({
      decay: 0.93,
      ticks: 600,
      particleCount: 200,
      angle: 60,
      spread: 100,
      origin: {
        x: 0,
        y: 0.5,
      },
      colors,
      zIndex: 1500,
      shapes: ['circle', 'circle', 'square']
    })

    // eslint-disable-next-line no-undef
    confetti({
      decay: 0.93,
      ticks: 600,
      particleCount: 200,
      angle: 120,
      spread: 100,
      origin: {
        x: 1,
        y: 0.5,
      },
      colors,
      zIndex: 1500,
      shapes: ['circle', 'circle', 'square']
    })
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
              display: "flex"
            }}
          >
            <Container className="pt-lg-md form-root-container mcontainer">
              <Row className="justify-content-center ">
                <img className="stamp" src={require("assets/img/submittedWhiteSmall.png")} alt="..." style={{ display: "none" }} />
                <img className="stamp" src={require("assets/img/stamp_duplicate_black.png")} alt="..." style={{ display: "none" }} />
                <img src={require("assets/img/11.jpg")} className="mb-4 img-fluid" alt="..." style={{ display: "none" }} />
                <div className={classnames({ "form-container main-input-container": true, success: this.state.formSuccess })}>
                  <Form>
                    {this.state.formSuccess ? (
                      <>
                        <img src={require("assets/img/confetti.png")} className="mb-0 img-fluid" alt="..." />
                        <img src={require("assets/img/11.jpg")} className="mb-4 img-fluid" alt="..." />
                        <h5>Congratulations, You have successfully registered!</h5>
                        <h6>Further details will be shared shortly.</h6>
                        <Button color="primary" className="mt-3" type="button" tag={Link} to="/">
                          Home
                      </Button>
                      </>
                    ) : this.state.step === 1 ? (
                      <>
                        <h2 className="mb-5">Register now</h2>
                        <FormGroup className={classnames({
                          "focused": this.state.nameFocus,
                          "has-success": this.state.name
                            ? !this.state.name_invalid
                            : false,
                          "has-danger": this.state.name_invalid
                        })}>
                          <InputGroup className="mb-2 input-group-alternative" >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input className="form-control-alternative is-valid" placeholder="Name" type="text"
                              name="name"
                              onFocus={e =>
                                this.setState({ nameFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ nameFocus: false })
                              }
                              value={this.state.name}
                              onChange={e => this.handleName(e)} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className={classnames({
                          "focused": this.state.emailFocus,
                          "has-success": this.state.email
                            ? !this.state.email_invalid
                            : false,
                          "has-danger": this.state.email_invalid
                        })}>
                          <InputGroup className="mb-4 input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input className="form-control-alternative is-invalid" placeholder="Email" type="email" name="email"
                              onFocus={e =>
                                this.setState({ emailFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ emailFocus: false })
                              }
                              value={this.state.email}
                              onChange={e => this.handleEmail(e)} />
                          </InputGroup>

                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="mb-4 gender-radios">
                            <div className="custom-control custom-radio mb-2">
                              <input
                                className="custom-control-input"
                                id="customRadio1"
                                name="gender"
                                type="radio"
                                value="Female"
                                onChange={this.handleChange}
                                checked={this.state.gender === "Female"}
                              />
                              <label className="custom-control-label" htmlFor="customRadio1">
                                <span>Female</span>
                              </label>
                            </div>
                            <div className="custom-control custom-radio mb-2">
                              <input
                                className="custom-control-input"
                                id="customRadio2"
                                name="gender"
                                value="Male"
                                onChange={this.handleChange}
                                type="radio"
                                checked={this.state.gender === "Male"}
                              />
                              <label className="custom-control-label" htmlFor="customRadio2">
                                <span>Male</span>
                              </label>
                            </div>
                          </InputGroup>

                        </FormGroup>
                        <small className="d-block mb-1 font-weight-bold text-warning" style={{ height: "20px" }}>{this.state.formErr}</small>
                        <div className="d-flex align-items-center justify-content-space-around;">
                          <Button color="primary" type="button" onClick={this.handleNext}>
                            Next
                      </Button></div>

                      </>
                    ) : this.state.step === 2 ? (
                      <><h4 className="mb-5">Enter Your College Details</h4>
                        <FormGroup className={classnames({
                          "focused": this.state.regnoFocus,
                          "has-success": this.state.regno
                            ? !this.state.regno_invalid
                            : false,
                          "has-danger": this.state.regno_invalid
                        })}>
                          <InputGroup className="mb-3 input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-badge" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input className="form-control-alternative is-valid" placeholder="Registration Number" type="text" name="regno"
                              onFocus={e =>
                                this.setState({ regnoFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ regnoFocus: false })
                              }
                              value={this.state.regno}
                              onChange={e => this.handleRegno(e)} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Input
                            type="select"
                            name="branch"
                            id="exampleSelectMultibranch"
                            className="mb-2 form-control-alternative"
                            onChange={this.handleChange}
                            value={this.state.branch}
                          >
                            <option value="" disabled className="text-primary font-weight-bold">Branch</option>
                            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Electronics and Instrumentation Engineering">Electronics and Instrumentation Engineering</option>
                            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                            <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Mechatronics Engineering">Mechatronics Engineering</option>
                            <option value="Biotechnology">Biotechnology</option>
                            <option value="Aerospace Engineering">Aerospace Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Chemical Engineering">Chemical Engineering</option>
                            <option value="Automobile Engineering">Automobile Engineering</option>
                            <option value="Biomedical Engineering">Biomedical Engineering</option>
                            <option value="Nanotechnology">Nanotechnology</option>
                            <option value="Other">Other</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="mb-4 gender-radios" style={{ alignItems: "center" }}>
                            <small className="d-block text-uppercase font-weight-bold mb-3 text-primary">Year</small>
                            <div className="custom-control custom-radio mb-3">
                              <input
                                className="custom-control-input"
                                id="customRadio3"
                                name="year"
                                type="radio"
                                value="1"
                                onChange={this.handleChange}
                                checked={this.state.year === "1"}
                              />
                              <label className="custom-control-label" htmlFor="customRadio3">
                                <span>1</span>
                              </label>
                            </div>
                            <div className="custom-control custom-radio mb-3">
                              <input
                                className="custom-control-input"
                                id="customRadio4"
                                name="year"
                                type="radio"
                                value="2"
                                onChange={this.handleChange}
                                checked={this.state.year === "2"}
                              />
                              <label className="custom-control-label" htmlFor="customRadio4">
                                <span>2</span>
                              </label>
                            </div>
                          </InputGroup>
                        </FormGroup>
                        <small className="d-block mb-1 font-weight-bold text-warning" style={{ height: "20px" }}>{this.state.formErr}</small>
                        <div className="d-flex align-items-center justify-content-space-around;">
                          <Button color="primary" outline type="button" className="mr-4" onClick={this.handleBack}>
                            Back
                          </Button>
                          <Button color="primary" type="button" onClick={this.handleNext}>
                            Next
                      </Button></div>
                      </>
                    ) : (<>
                      <h5 className="mb-2">Communication Details</h5>
                      <FormGroup className={classnames({
                        "focused": this.state.mobileFocus,
                        "has-success": this.state.mobile
                          ? !this.state.mobile_invalid
                          : false,
                        "has-danger": this.state.mobile_invalid
                      })}>
                        <InputGroup className="mb-1 input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-mobile-button" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input className="form-control-alternative is-valid" placeholder="Mobile Number" type="text"
                            name="mobile"
                            onFocus={e =>
                              this.setState({ mobileFocus: true })
                            }
                            onBlur={e =>
                              this.setState({ mobileFocus: false })
                            }
                            value={this.state.mobile}
                            onChange={e => this.handleMobileNo(e)} />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className={classnames({
                        "focused": this.state.whatsapp_mobileFocus,
                        "has-success": this.state.whatsapp_mobile
                          ? !this.state.whatsapp_mobile_invalid
                          : false,
                        "has-danger": this.state.whatsapp_mobile_invalid
                      })}>
                        <InputGroup className="mb-2 input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-whatsapp" aria-hidden="true"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input className="form-control-alternative is-invalid" placeholder="Whatsapp Number" type="Whatsapp Number" name="whatsapp_mobile"
                            onFocus={e =>
                              this.setState({ whatsapp_mobileFocus: true })
                            }
                            onBlur={e =>
                              this.setState({ whatsapp_mobileFocus: false })
                            }
                            value={this.state.whatsapp_mobile}
                            onChange={e => this.handleWhatsappMobileNo(e)} />
                        </InputGroup>

                      </FormGroup>
                      <h5 className="" style={{ marginBottom: "0" }}>Domain Preferences</h5>
                      <p className="text-muted mb-4 d-block font-weight-bold">Select 2 domains</p>
                      <FormGroup>
                        <InputGroup className="mb-1 domain-checkBoxes">
                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              id="customCheck1"
                              type="checkbox"
                              value="Technical"
                              name="domains"
                              onChange={this.domainChange}
                              disabled={this.state.domains.length >= 2 && !this.state.domains.includes("Technical")}
                              checked={this.state.domains.includes("Technical")}
                            />
                            <label className="custom-control-label" htmlFor="customCheck1">
                              Technical
                                </label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              id="customCheck2"
                              type="checkbox"
                              name="domains"
                              value="Corporate"
                              onChange={this.domainChange}
                              disabled={this.state.domains.length >= 2 && !this.state.domains.includes("Corporate")}
                              checked={this.state.domains.includes("Corporate")}
                            />
                            <label className="custom-control-label" htmlFor="customCheck2">
                              Corporate and PR
                                </label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              id="customCheck3"
                              type="checkbox"
                              name="domains"
                              value="Creatives And Photography"
                              onChange={this.domainChange}
                              disabled={this.state.domains.length >= 2 && !this.state.domains.includes("Creatives And Photography")}
                              checked={this.state.domains.includes("Creatives And Photography")}
                            />
                            <label className="custom-control-label" htmlFor="customCheck3">
                              Creatives And Photography
                                </label>
                          </div>
                        </InputGroup>
                      </FormGroup>

                      <small className="d-block mb-1 font-weight-bold text-warning" style={{ height: "20px" }}>{this.state.formErr}</small>
                      <div className="d-flex align-items-center justify-content-space-around;">
                        <Button color="primary" outline type="button" className="mr-4" onClick={this.handleBack} disabled={this.state.submitting}>
                          Back
                          </Button>
                        <Button color="primary" style={{ width: "100px" }} type="button" onClick={this.handleSubmitButtonClick} disabled={this.state.submitting}>
                          {this.state.submitting === true ? (<div
                            style={{ width: "100%", height: "100%" }}
                            className="rolling-loader"
                          >
                            <div></div>
                          </div>) : "Submit"}
                        </Button></div>
                    </>)}

                  </Form>
                  <Recaptcha
                    ref={ref => this.recaptcha = ref}
                    sitekey="6LfwUNgUAAAAADXIaj3_xASZZSzpIlYz-usu4NWJ"
                    onResolved={this.handleSubmit}
                    onError={() => { this.setState({ formErr: "Please Refresh the Page" }) }}
                  />
                </div>

                <div className={classnames({
                  "form-container": true, "overlay-container": true, success: this.state.formSuccess
                })}>
                  <img src={require("assets/img/p51.svg")} style={{
                    position: "absolute",
                    opacity: 0.2,
                    bottom: 0
                  }} alt="..."></img>
                  {this.state.step === 1 ? (
                    <>
                      <div className="overlay-panel text-white">
                        <h1 className="text-white display-1">Hey, there!</h1>
                        <p>Enter your personal details and start journey with us.</p>
                        {/* <button className="btn btn-neutral btn-sm" id="signUp">
                        Sign Up
                      </button> */}
                      </div>
                    </>
                  ) : (
                      <>

                        <img className="barcode" src={require("assets/img/barcode_white.png")} alt="..." />
                        {this.state.formSuccess && <img className="stamp" src={require("assets/img/submittedWhiteSmall.png")} alt="..." onClick={this.confetti}/>}
                        {this.state.duplicate && <img className="stamp" src={require("assets/img/stamp_duplicate_black.png")} alt="..." />}


                        <div className="fake-form">

                          <h5 className="label">Name</h5>
                          <h3 className="text-white display-5 mb-2">{this.state.name} {this.state.gender === "Female" ? (<i className="fa fa-venus" aria-hidden="true"></i>) : (<i className="fa fa-mars" aria-hidden="true"></i>)}</h3>
                          <h5 className="label">Email</h5>
                          <h6 className="text-white display-5 mb-3">{this.state.email}</h6>


                          <h5 className="mb-0 label">College Details</h5>
                          {this.state.regno === "" ? (
                            <div className="skeleton" style={{ width: "200px", height: "12px" }}></div>
                          ) : (
                              <h4 className="mb-0">{this.state.regno}</h4>
                            )}

                          {this.state.branch === "" ? (
                            <div className="skeleton" style={{ width: "250px", height: "12px" }}></div>
                          ) : (
                              <h6 className="text-white display-5 mb-0">{this.state.branch}</h6>
                            )}

                          {this.state.branch === "" || this.state.regno === "" ? (
                            <div className="skeleton" style={{ width: "150px", height: "12px" }}></div>
                          ) : (
                              <h5 className="text-white mb-2">{this.state.year}
                                {this.state.year === "1" ? (
                                  <sup>st</sup>
                                ) : (
                                    <sup>nd</sup>
                                  )}
                                {' '}Year</h5>
                            )}


                          {this.state.step === 3 ? (<>
                            <h5 className="label">Contact Details</h5>
                            <div className="d-flex align-items-center mb-0">
                              <i className="fa fa-phone mr-2" aria-hidden="true"></i>
                              {this.state.mobile === "" ? (
                                <div className="skeleton" style={{ width: "100px", height: "12px", marginTop: "5px", marginBottom: "7px" }}></div>
                              ) : (
                                  <h6 className="text-white display-5 mb-0">{this.state.mobile}</h6>
                                )}
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <i className="fa fa-whatsapp mr-2" aria-hidden="true"></i>
                              {this.state.whatsapp_mobile === "" ? (
                                <div className="skeleton" style={{ width: "100px", height: "12px", marginTop: "5px", marginBottom: "7px" }}></div>
                              ) : (
                                  <h6 className="text-white display-5 mb-0">{this.state.whatsapp_mobile}</h6>
                                )}
                            </div>
                            <h5 className="label mb-1">Domains</h5>
                            <div className="d-flex">
                              {
                                this.state.domains.map((domain, idx) => <Badge key={idx} color="secondary" className="mr-2" pill>{`${idx + 1}. ${domain}`}</Badge>)
                              }
                              {this.state.domains.length < 2 ? (<>
                                {this.renderBlankDomains()}
                              </>) : (null)}
                            </div>
                          </>) : (null)}

                        </div>
                      </>
                    )}



                </div>
              </Row>
            </Container>
            {this.state.formSuccess ? (<Confetti />) : null}
          </section>
        </main>
      </>
    );
  }
}

export default Index;
