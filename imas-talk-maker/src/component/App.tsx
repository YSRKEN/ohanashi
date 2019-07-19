import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CharaNameType, ITalkData, SelectIconType, TalkType, ViewType } from '../constant';
import { ConfigContext } from '../context';
import { localStorageState } from '../state';
import IdolTalkList from './IdolTalkList';
import InputTalkForm from './InputTalkForm';
import PreviewTalkForm from './PreviewTalkForm';
import SelectNameForm from './SelectNameForm';

const App: React.FC = () => {
  // Hooks
  const [talkType, setTalkType]                 = localStorageState<TalkType>('talkType', 'おはなし');
  const [viewType, setViewType]                 = localStorageState<ViewType>('viewType', 'InputTalk');
  const [charaNameType, setCharaNameType]       = localStorageState<CharaNameType>('charaNameType', '自動');
  const [charaName, setCharaName]               = localStorageState<string>('charaName', '');
  const [message, setMessage]                   = localStorageState<string>('message', '');
  const [iconURL, setIconURL]                   = localStorageState<string>('iconURL', `${process.env.PUBLIC_URL}/asset/other/P-suite.png`);
  const [iconName, setIconName]                 = localStorageState<string>('iconName', 'P');
  const [iconSelectorFlg, setIconSelectorFlg]   = localStorageState<boolean>('iconSelectorFlg', false);
  const [favs, setFavs]                         = localStorageState<string>('favs', '9999+');
  const [datetime, setDatetime]                 = localStorageState<string>('datetime', '01-02 03:04');
  const [myFavFlg, setMyFavFlg]                 = localStorageState<boolean>('myFavFlg', true);
  const [secondIconFlg, setSecondIconFlg]       = localStorageState<boolean>('secondIconFlg', false);
  const [secondIconName, setSecondIconName]     = localStorageState<string>('secondIconName', '春日未来');
  const [secondIconURL, setSecondIconURL]       = localStorageState<string>('secondIconURL', `${process.env.PUBLIC_URL}/asset/million/110082b91c4.png`);
  const [secondIconSelectorFlg, setSecondIconSelectorFlg] = localStorageState<boolean>('secondIconSelectorFlg', false);
  const [selectIconType, setSelectIconType]     = localStorageState<SelectIconType>('selectIconType', '1st');
  const [idolTalkList, setIdolTalkList]         = localStorageState<ITalkData[]>('idolTalkList', []);
  const [draggedTalkIndex, setDraggedTalkIndex] = localStorageState<number>('draggedTalkIndex', -1);
  const [previewName, setPreviewName]           = localStorageState<string>('previewName', 'P');

  const viewTypeToView = () => {
    switch(viewType) {
      case 'InputTalk':
        return (<>
          <InputTalkForm className="m-3"/>
          <IdolTalkList className="m-3"/>
        </>);
      case 'SelectName':
        return <SelectNameForm className="m-3"/>;
      case 'PreviewTalk':
        return <PreviewTalkForm className="m-3"/>;
      default:
        return (<></>);
    }
  };

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
      myFavFlg, setMyFavFlg,
      secondIconFlg, setSecondIconFlg,
      secondIconName, setSecondIconName,
      secondIconURL, setSecondIconURL,
      secondIconSelectorFlg, setSecondIconSelectorFlg,
      selectIconType, setSelectIconType,
      idolTalkList, setIdolTalkList,
      draggedTalkIndex, setDraggedTalkIndex,
      previewName, setPreviewName,
    }}>
      <Container>
        <Row>
          <Col className="mx-auto" xs={12} sm={10} md={8}>
            {
              viewTypeToView()
            }
          </Col>
        </Row>
      </Container>
    </ConfigContext.Provider>
  );
}

export default App;
