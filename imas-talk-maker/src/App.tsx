import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CharaNameType, TalkType } from './constant';
import InputTalkForm from './InputTalkForm';

const App: React.FC = () => {
  // おはなしモードかデレぽモードか
  const [talkType, setTalkType] = React.useState<TalkType>('おはなし');

  // キャラ名について
  const [charaNameType, setCharaNameType] = React.useState<CharaNameType>('自動');

  // キャラ名
  const [charaName, setCharaName] = React.useState('');

  return (
    <Container>
      <Row>
        <Col className="mx-auto" xs={12} sm={10} md={8}>
          <InputTalkForm className="m-3" talkType={talkType} setTalkType={setTalkType}
            charaNameType={charaNameType} setCharaNameType={setCharaNameType}
            charaName={charaName} setCharaName={setCharaName}/>
          <span>モード：{talkType}　キャラ名：{charaNameType}設定({charaName})</span>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
