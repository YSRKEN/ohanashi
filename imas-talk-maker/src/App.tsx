import * as React from 'react';
import { Button, Col, Container, FormGroup, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import SelectButtonGroup from './SelectButtonGroup';

const sampleFunction = () => window.alert("Hello, React-Bootstrap!");

const App: React.FC = () => (
  <Container>
    <Row>
      <Col>
        <Form>
          <FormGroup>
            <SelectButtonGroup nameList={['おはなし', 'デレぽ']}
              firstSelectName='デレぽ' selectedColorType='primary' />
          </FormGroup>
          <FormGroup>
            <SelectButtonGroup nameList={['デレマス', 'ミリマス', 'シャニマス']}
              firstSelectName='ミリマス' selectedColorType='info' />
          </FormGroup>
          <FormGroup>
            <SelectButtonGroup nameList={['まみみ', 'きりこ', 'こがね', 'ゆいか', 'さくや']}
              firstSelectName='こがね' selectedColorType='danger' />
          </FormGroup>
          <FormGroup>
            <Button onClick={sampleFunction}>Push!</Button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  </Container>
);

export default App;
