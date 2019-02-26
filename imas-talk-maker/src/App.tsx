import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { TalkType } from './constant';
import InputTalkForm from './InputTalkForm';

const App: React.FC = () => {
  const [talkType, setTalkType] = React.useState<TalkType>('おはなし');
  return (
    <Container>
      <Row>
        <Col className="mx-auto" xs={12} sm={10} md={8}>
          <InputTalkForm className="m-3" talkType={talkType} setTalkType={setTalkType}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
