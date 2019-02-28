import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CharaNameType, TalkType, ViewType } from '../constant';
import { ConfigContext } from '../context';
import InputTalkForm from './InputTalkForm';
import SelectNameForm from './SelectNameForm';

const App: React.FC = () => {
  // Hooks
  const [talkType, setTalkType] = React.useState<TalkType>('おはなし');
  const [viewType, setViewType] = React.useState<ViewType>('InputTalk');
  const [charaNameType, setCharaNameType] = React.useState<CharaNameType>('手動');
  const [charaName, setCharaName] = React.useState('春香さん');
  const [message, setMessage] = React.useState('プロデューサーさん、ドームですよ、ドーム！');
  const [iconURL, setIconURL] = React.useState(`${process.env.PUBLIC_URL}/asset/million/haruka-1.png`);
  const [iconName, setIconName] = React.useState('天海春香');
  const [iconSelectorFlg, setIconSelectorFlg] = React.useState(false);

  return (
    <ConfigContext.Provider value={{
      // tslint:disable-next-line: object-literal-sort-keys
      talkType, setTalkType,
      viewType, setViewType,
      charaNameType, setCharaNameType,
      charaName, setCharaName,
      message, setMessage,
      iconURL, setIconURL,
      iconName, setIconName,
      iconSelectorFlg, setIconSelectorFlg
    }}>
      <Container>
        <Row>
          <Col className="mx-auto" xs={12} sm={10} md={8}>
            {
              viewType === 'InputTalk'
                ? (<>
                    <InputTalkForm className="m-3"/>
                    <span>モード：{talkType}　キャラ名：{charaNameType}設定({charaName})</span><br/>
                    <span>アイコン：{iconName} {iconURL}</span><br/>
                    <span>喋る内容：{message}</span>
                  </>)
                : (
                  <SelectNameForm className="m-3"/>
                )
            }
          </Col>
        </Row>
      </Container>
    </ConfigContext.Provider>
  );
}

export default App;
