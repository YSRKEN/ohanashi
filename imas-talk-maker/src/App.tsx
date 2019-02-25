import * as React from 'react';
import { Button, Col, Container, FormGroup, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';

const sampleFunction = () => window.alert("Hello, React-Bootstrap!");

const App: React.FC = () => (
  <Container>
    <Row>
      <Col>
        <Form>
          <FormGroup>
            <Button onClick={sampleFunction}>Push!</Button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  </Container>
);

export default App;
