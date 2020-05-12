import React from "react";
import { connect } from "react-redux";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import classnames from 'classnames';
import DefaultNavbar from "components/Navbars/Navbar.jsx";

import login from 'actions/auth/loginAction';

class Login extends React.Component {
  state = {
    candidateId: "",
    password: ""
  };
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  handleLoginClick = ()=>{
    this.props.login(this.state.candidateId,this.state.password);
  }
  render() {
    if (this.props.isLoggedin){
        this.props.history.push("/Domains")
    }
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
                zIndex: 2
              }}
            >
              <Container className="pt-lg-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6" xs="10">
                    <Card className="bg-white shadow border-0 mt-5 bg-gradient-primary">
                      <CardHeader className="text-white text-center d-flex flex-column align-content-center bg-gradient-primary">
                        <h3 className="text-white">Login</h3>
                      </CardHeader>
                      <CardBody
                        className="px-lg-5 py-lg-5 bg-white"
                        style={{
                          borderTopLeftRadius: "40px",
                          borderTopRightRadius: "40px"
                        }}
                      >
                        <div className="text-center text-muted mb-4">
                          <small>Enter Credential from Welcome mail</small>
                        </div>
                        <Form role="form">
                          <FormGroup
                            className={classnames({
                              focused: this.state.candFocus,
                              "mb-3": true
                            })}
                          >
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-key-25" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Candidate ID"
                                type="text"
                                name="candidateId"
                                value={this.state.candidateId}
                                onChange={this.handleChange}
                                onFocus={e =>
                                  this.setState({ candFocus: true })
                                }
                                onBlur={e =>
                                  this.setState({ candFocus: false })
                                }
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup
                            className={classnames({
                              focused: this.state.passwordFocus
                            })}
                          >
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Mobile Number as Password"
                                type="password"
                                autoComplete="off"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                onFocus={e =>
                                  this.setState({ passwordFocus: true })
                                }
                                onBlur={e =>
                                  this.setState({ passwordFocus: false })
                                }
                              />
                            </InputGroup>
                          </FormGroup>
                          <small
                            className="d-block mb-1 font-weight-bold text-center text-warning mt-4"
                            style={{ minHeight: "20px" }}
                          >
                            {this.props.err}
                          </small>
                          <div className="text-center">
                            <Button
                              className="my-4"
                              color="primary"
                              onSubmit={this.handleLoginClick}
                              onClick={this.handleLoginClick}
                              disabled={this.props.isLoading}
                            >
                              Sign in
                            </Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                    <Row className="mt-3 d-none">
                      <Col xs="6">
                        <a
                          className="text-light"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <small>Forgot password?</small>
                        </a>
                      </Col>
                      <Col className="text-right" xs="6">
                        <a
                          className="text-light"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <small>Create new account</small>
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>
          </main>
        </>
      );
  }
}

const mapStateToProps= ({user})=>({
    ...user
})

export default connect(mapStateToProps, {
    login
})(Login);
