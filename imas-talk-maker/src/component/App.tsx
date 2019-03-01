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
  const [favs, setFavs] = React.useState('9999+');
  const [datetime, setDatetime] = React.useState('01-02 03:04');
  const [myFavFlg, setMyFavFlg] = React.useState(true);

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
      iconSelectorFlg, setIconSelectorFlg,
      favs, setFavs,
      datetime, setDatetime,
      myFavFlg, setMyFavFlg
    }}>
      <Container>
        <Row>
          <Col className="mx-auto" xs={12} sm={10} md={8}>
            {
              viewType === 'InputTalk'
                ? <InputTalkForm className="m-3"/>
                : <SelectNameForm className="m-3"/>
            }
          </Col>
        </Row>
      </Container>
    </ConfigContext.Provider>
  );
}

export default App;
