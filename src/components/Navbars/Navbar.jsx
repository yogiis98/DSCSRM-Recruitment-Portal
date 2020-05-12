import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

import logout from 'actions/auth/logoutAction';
import "./index.scss";
class DefaultNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-dark headroom bg-dark"
            expand="lg"
            id="navbar-main"
            style={{backgroundColor: "#212529 !important"}}
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/logo_dsc.png")}
                  style={{ height: "50px" }}
                />
                <span
                  className="dsc_logo_white"
                  style={{
                    fontSize: "1.5em",
                    verticalAlign: "middle",
                    fontWeight: "700"
                  }}
                >
                  {" "}
                  DSC SRM
                </span>
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar_global">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="8">
                      <Link
                        to="/"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <img
                          alt="..."
                          src={require("assets/img/logo_dsc.png")}
                          style={{ height: "50px" }}
                        />
                        <span
                          className="dsc_logo_white"
                          style={{
                            fontSize: "1em",
                            verticalAlign: "middle",
                            fontWeight: "700",
                            color: "#333",
                            marginLeft: "20px"
                          }}
                        >
                          {" "}
                          DSC SRM
                        </span>
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="4">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <NavLink to="Register" tag={Link}>
                      Register Now!
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://srmdsc.com/" target="_blank">
                      DSC Website
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://srmdsc.com/#ContactUs"
                      target="_blank"
                    >
                      Contact Us
                    </NavLink>
                  </NavItem>
                  {!this.props.isLoggedin ? (
                    <NavItem className="ml-md-4">
                      <Button
                        className="btn-neutral btn-icon btn-md"
                        color="default"
                        to="Login"
                        tag={Link}
                      >
                        <span className="btn-inner--icon text-dark">
                          <i className="ni ni-key-25 mr-2" />
                        </span>
                        <span className="nav-link-inner--text ml-1 text-dark">
                          Signin
                        </span>
                      </Button>
                    </NavItem>
                  ) : (
                    <>
                      <NavItem className="ml-md-4">
                        <Button
                          className="btn-neutral btn-icon btn-md"
                          color="default"
                          to="/Domains"
                          tag={Link}
                        >
                          <span className="btn-inner--icon text-dark">
                            <i className="ni ni-spaceship mr-2" />
                          </span>
                          <span className="nav-link-inner--text ml-1 text-dark">
                            Dashboard
                          </span>
                        </Button>
                      </NavItem>
                      <NavItem className="ml-md-4">
                        <Button
                          className="btn-neutral btn-icon btn-md"
                          color="default"
                          onClick={this.props.logout}
                        >
                          <span className="btn-inner--icon text-dark">
                            <i className="ni ni-user-run mr-2" />
                          </span>
                          <span className="nav-link-inner--text ml-1 text-dark">
                            Logout
                          </span>
                        </Button>
                      </NavItem>
                    </>
                  )}
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}
const mapStateToProps = ({ user }) => ({
    isLoggedin: user.isLoggedin
});

export default connect(mapStateToProps,{logout})(DefaultNavbar);
