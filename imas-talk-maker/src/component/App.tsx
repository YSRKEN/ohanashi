import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CharaNameType, TalkType } from '../constant';
import { ConfigContext } from '../context';
import InputTalkForm from './InputTalkForm';

const App: React.FC = () => {
  // Hooks
  const [talkType, setTalkType] = React.useState<TalkType>('おはなし');
  const [charaNameType, setCharaNameType] = React.useState<CharaNameType>('手動');
  const [charaName, setCharaName] = React.useState('春香さん');
  const [message, setMessage] = React.useState('プロデューサーさん、ドームですよ、ドーム！');
  const [iconURL, setIconURL] = React.useState('million/haruka-1.png');
  const [iconName, setIconName] = React.useState('天海春香');

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
      setMessage,
      iconURL,
      setIconURL,
      iconName,
      setIconName
    }}>
      <Container>
        <Row>
          <Col className="mx-auto" xs={12} sm={10} md={8}>
            <InputTalkForm className="m-3"/>
            <span>モード：{talkType}　キャラ名：{charaNameType}設定({charaName})</span><br/>
            <span>アイコン：{iconName} {iconURL}</span><br/>
            <span>喋る内容：{message}</span>
          </Col>
        </Row>
      </Container>
    </ConfigContext.Provider>
  );
}

export default App;
