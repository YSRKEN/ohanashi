import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CharaNameType, TalkType, ViewType } from '../constant';
import { ConfigContext } from '../context';
import DerepoView2 from './DerepoView2';
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
    <>
      <div className="mx-3" style={{width: 382}}>
        <DerepoView2 talkData={{
          name: '松永涼',
          url: '/asset/cinderella/uduki.png',
          // tslint:disable-next-line: object-literal-sort-keys
          message: "ただいま！\n路上LIVE、大成功だ！\n直前の告知だったのに、\nたくさんの人が集まってくれて、\nすごく嬉しかったよ。",
          favs: '1230',
          datetime: '03-05 17:09',
          myFavFlg: true
        }} firstFlg={true}/>
      </div>
      <div className="mx-3" style={{width: 382}}>
        <DerepoView2 talkData={{
          name: '涼宮星花',
          url: '/asset/cinderella/uduki.png',
          // tslint:disable-next-line: object-literal-sort-keys
          message: "ゲリラLIVE、というのですよね？\nこういった形のLIVEも、\n楽しいですわね♪",
          favs: '945',
          datetime: '03-05 17:13',
          myFavFlg: false
        }} firstFlg={false}/>
      </div>
      <div className="mx-3" style={{width: 382}}>
        <DerepoView2 talkData={{
          name: '有浦柑奈',
          url: '/asset/cinderella/uduki.png',
          // tslint:disable-next-line: object-literal-sort-keys
          message: "ゲリラといっても許可はとってました\nから、安心してください。いつだって\n心にはラブ＆ピースですから♪",
          favs: '945',
          datetime: '03-05 17:13',
          myFavFlg: false
        }} firstFlg={false}/>
      </div>
      <div className="mx-3" style={{width: 382}}>
        <DerepoView2 talkData={{
          name: '有浦柑奈',
          url: '/asset/cinderella/uduki.png',
          // tslint:disable-next-line: object-literal-sort-keys
          message: "おふたりの気品と力強さも\n感じられる音に圧倒されました。",
          favs: '945',
          datetime: '03-05 17:13',
          myFavFlg: false
        }} firstFlg={false}/>
      </div>
      <div className="mx-3" style={{width: 382}}>
        <DerepoView2 talkData={{
          name: '',
          url: '/asset/cinderella/uduki.png',
          // tslint:disable-next-line: object-literal-sort-keys
          message: "新年！",
          favs: '1230',
          datetime: '03-05 17:09',
          myFavFlg: true
        }} firstFlg={true}/>
      </div>
      <div className="mx-3" style={{width: 382}}>
        <DerepoView2 talkData={{
          name: '',
          url: '/asset/cinderella/uduki.png',
          // tslint:disable-next-line: object-literal-sort-keys
          message: "あけまして。",
          favs: '945',
          datetime: '03-05 17:13',
          myFavFlg: false
        }} firstFlg={false}/>
      </div>
      <div className="mx-3" style={{width: 382}}>
        <DerepoView2 talkData={{
          name: '',
          url: '/asset/cinderella/uduki.png',
          // tslint:disable-next-line: object-literal-sort-keys
          message: "おめでとうございまーすっ♪",
          favs: '945',
          datetime: '03-05 17:13',
          myFavFlg: false
        }} firstFlg={false}/>
      </div>
    </>
  )

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
