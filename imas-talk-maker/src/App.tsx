import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CharaNameType, TalkType } from './constant';
import { ConfigContext } from './contest';
import InputTalkForm from './InputTalkForm';

const App: React.FC = () => {
  // Hooks
  const [talkType, setTalkType] = React.useState<TalkType>('おはなし');
  const [charaNameType, setCharaNameType] = React.useState<CharaNameType>('自動');
  const [charaName, setCharaName] = React.useState('');
  const [message, setMessage] = React.useState('');

  return (
    <ConfigContext.Provider value={{
      talkType,
      // tslint:disable-next-line: object-literal-sort-keys
      setTalkType,
      charaNameType,
      setCharaNameType,
      charaName,
      setCharaName,
      message,
      setMessage
    }}>
      <Container>
        <Row>
          <Col className="mx-auto" xs={12} sm={10} md={8}>
            <InputTalkForm className="m-3"/>
            <span>モード：{talkType}　キャラ名：{charaNameType}設定({charaName})<br/>喋る内容：{message}</span>
          </Col>
        </Row>
      </Container>
    </ConfigContext.Provider>
  );
}

export default App;
