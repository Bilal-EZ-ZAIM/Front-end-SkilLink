import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

const PageNotFound = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="text-center mt-5">
                        <h1 className="display-1">404</h1>
                        <h2 className="display-4">Page Not Found</h2>
                        <p className="lead">Sorry, the page you are looking for does not exist.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PageNotFound;
