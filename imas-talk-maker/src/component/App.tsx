import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CharaNameType, ITalkData, SelectIconType, TalkType, ViewType } from '../constant';
import { ConfigContext } from '../context';
import { localStorageState } from '../state';
import IdolTalkList from './IdolTalkList';
import InputTalkForm from './InputTalkForm';
import SelectNameForm from './SelectNameForm';

const App: React.FC = () => {
  // Hooks
  const [talkType, setTalkType] = localStorageState<TalkType>('talkType', 'おはなし');
  const [viewType, setViewType] = React.useState<ViewType>('InputTalk');
  const [charaNameType, setCharaNameType] = React.useState<CharaNameType>('自動');
  const [charaName, setCharaName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [iconURL, setIconURL] = React.useState(`${process.env.PUBLIC_URL}/asset/other/P-suite.png`);
  const [iconName, setIconName] = React.useState('P');
  const [iconSelectorFlg, setIconSelectorFlg] = React.useState(false);
  const [favs, setFavs] = React.useState('9999+');
  const [datetime, setDatetime] = React.useState('01-02 03:04');
  const [myFavFlg, setMyFavFlg] = React.useState(true);
  const [secondIconFlg, setSecondIconFlg] = React.useState(false);
  const [secondIconName, setSecondIconName] = React.useState('春日未来');
  const [secondIconURL, setSecondIconURL] = React.useState(`${process.env.PUBLIC_URL}/asset/million/110082b91c4.png`);
  const [secondIconSelectorFlg, setSecondIconSelectorFlg] = React.useState(false);
  const [selectIconType, setSelectIconType] = React.useState<SelectIconType>('1st');
  const [idolTalkList, setIdolTalkList] = React.useState<ITalkData[]>([]);
  const [draggedTalkIndex, setDraggedTalkIndex] = React.useState(-1);
  const [previewName, setPreviewName] = React.useState('P');

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
              viewType === 'InputTalk'
                ? (<>
                  <InputTalkForm className="m-3"/>
                  <IdolTalkList className="m-3"/>
                </>)
                : <SelectNameForm className="m-3"/>
            }
          </Col>
        </Row>
      </Container>
    </ConfigContext.Provider>
  );
}

export default App;
