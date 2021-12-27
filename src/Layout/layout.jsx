import React from "react";
import {Container,Row,Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt,faHome,faQuestionCircle,faStamp } from '@fortawesome/free-solid-svg-icons'
import "../assets/css/layout.css";
import {Link} from 'react-router-dom'
function Layout(props){
    return (
        <div className="layout">
            <Container fluid>
            <Row>
                <Col xs={12} md={2} className="p-0">
                    <div className="sitebar_area">
                        <div className="logo">
                            {/* <img src="" alt="logo" /> */}
                            <Link to="/">School</Link>
                        </div>
                        <div className="dashboard">
                            <Link to="/"><FontAwesomeIcon icon={faTachometerAlt}/>Dashboard</Link>
                        </div>
                        <ul className="side_bar_menu">
                            <li><Link to="/"><FontAwesomeIcon icon={faHome}/>Home</Link></li>
                            <li><Link to="/version-list"><FontAwesomeIcon icon={faStamp}/>Version</Link></li>
                            <li><Link to="/class-list"><FontAwesomeIcon icon={faQuestionCircle}/>Classes</Link></li>
                            <li><Link to="/subject-list"><FontAwesomeIcon icon={faStamp}/>Subjects</Link></li>
                            <li><Link to="/question"><FontAwesomeIcon icon={faQuestionCircle}/>Question Bank</Link></li>
                            <li><Link to="/quiz"><FontAwesomeIcon icon={faStamp}/>Quiz</Link></li>
                        </ul>
                    </div>
                </Col>
                <Col xs={12} md={10}>
                    <Row>
                        <Col className="p-0">
                        <div className="header_area">
                            Header
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="dashboard_content_area">
                            {props.children}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="p-0">
                            <div className="footer_area">
                                Footer
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </Container>
        </div>
      );
}

export default Layout;