import * as React from 'react';
import { Button, Col, Container, FormGroup, FormLabel, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import SelectButtonGroup from './SelectButtonGroup';

const sampleFunction = () => window.alert("Hello, React-Bootstrap!");

const App: React.FC = () => {
  const [talkType, setTalkType] = React.useState('おはなし');
  const [productionType, setProductionType] = React.useState('ミリマス');
  const [idolName, setIdolName] = React.useState('こがね');
  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <FormGroup>
              <SelectButtonGroup nameList={['おはなし', 'デレぽ']}
                firstSelectName={talkType} selectedColorType='primary'
                callback={setTalkType}/><br/>
              <FormLabel>{talkType}</FormLabel>
            </FormGroup>
            <FormGroup>
              <SelectButtonGroup nameList={['デレマス', 'ミリマス', 'シャニマス']}
                firstSelectName={productionType} selectedColorType='info'
                callback={setProductionType} /><br/>
                <FormLabel>{productionType}</FormLabel>
            </FormGroup>
            <FormGroup>
              <SelectButtonGroup nameList={['まみみ', 'きりこ', 'こがね', 'ゆいか', 'さくや']}
                firstSelectName={idolName} selectedColorType='danger'
                callback={setIdolName} /><br/>
                <FormLabel>{idolName}</FormLabel>
            </FormGroup>
            <FormGroup>
              <Button onClick={sampleFunction}>Push!</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
