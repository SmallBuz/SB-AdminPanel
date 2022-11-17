import React from "react";
import { Col, Row, Container } from "react-bootstrap";

const Tooltips = () => {
  return (
    <article>
      <Container className="px-0">
        <Row className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
          <Col className="d-block mb-4 mb-md-0">
            <h1 className="h2">Tooltips</h1>
            <p className="mb-0">
              Use tooltips to indicate extra content for your users when
              hovering over an element.
            </p>
          </Col>
        </Row>
      </Container>
    </article>
  );
};
export default Tooltips;
