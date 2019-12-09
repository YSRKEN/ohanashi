import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  CharaNameType,
  ITalkData,
  SelectIconType,
  TalkType,
  ViewType
} from '../constant';
import { ConfigContext } from '../context';
import { useLocalStorageState } from '../state';
import IdolTalkList from './IdolTalkList';
import InputTalkForm from './InputTalkForm';
import PreviewTalkForm from './PreviewTalkForm';
import SelectNameForm from './SelectNameForm';

const App: React.FC = () => {
  // Hooks
  const [talkType, setTalkType] = useLocalStorageState<TalkType>(
    'talkType',
    'おはなし'
  );
  const [viewType, setViewType] = useLocalStorageState<ViewType>(
    'viewType',
    'InputTalk'
  );
  const [charaNameType, setCharaNameType] = useLocalStorageState<CharaNameType>(
    'charaNameType',
    '自動'
  );
  const [charaName, setCharaName] = useLocalStorageState<string>(
    'charaName',
    ''
  );
  const [message, setMessage] = useLocalStorageState<string>('message', '');
  const [iconURL, setIconURL] = useLocalStorageState<string>(
    'iconURL',
    `${process.env.PUBLIC_URL}/asset/other/P-suite.png`
  );
  const [iconName, setIconName] = useLocalStorageState<string>('iconName', 'P');
  const [iconSelectorFlg, setIconSelectorFlg] = useLocalStorageState<boolean>(
    'iconSelectorFlg',
    false
  );
  const [favs, setFavs] = useLocalStorageState<string>('favs', '9999+');
  const [datetime, setDatetime] = useLocalStorageState<string>(
    'datetime',
    '01-02 03:04'
  );
  const [myFavFlg, setMyFavFlg] = useLocalStorageState<boolean>(
    'myFavFlg',
    true
  );
  const [secondIconFlg, setSecondIconFlg] = useLocalStorageState<boolean>(
    'secondIconFlg',
    false
  );
  const [secondIconName, setSecondIconName] = useLocalStorageState<string>(
    'secondIconName',
    '春日未来'
  );
  const [secondIconURL, setSecondIconURL] = useLocalStorageState<string>(
    'secondIconURL',
    `${process.env.PUBLIC_URL}/asset/million/110082b91c4.png`
  );
  const [
    secondIconSelectorFlg,
    setSecondIconSelectorFlg
  ] = useLocalStorageState<boolean>('secondIconSelectorFlg', false);
  const [selectIconType, setSelectIconType] = useLocalStorageState<
    SelectIconType
  >('selectIconType', '1st');
  const [idolTalkList, setIdolTalkList] = useLocalStorageState<ITalkData[]>(
    'idolTalkList',
    []
  );
  const [draggedTalkIndex, setDraggedTalkIndex] = useLocalStorageState<number>(
    'draggedTalkIndex',
    -1
  );
  const [previewName, setPreviewName] = useLocalStorageState<string>(
    'previewName',
    'P'
  );

  const viewTypeToView = () => {
    switch (viewType) {
      case 'InputTalk':
        return (
          <>
            <InputTalkForm className="m-3" />
            <IdolTalkList className="m-3" />
          </>
        );
      case 'SelectName':
        return <SelectNameForm className="m-3" />;
      case 'PreviewTalk':
        return <PreviewTalkForm className="m-3" />;
      default:
        return <></>;
    }
  };

  return (
    <ConfigContext.Provider
      value={{
        // tslint:disable-next-line: object-literal-sort-keys
        talkType,
        setTalkType,
        viewType,
        setViewType,
        charaNameType,
        setCharaNameType,
        charaName,
        setCharaName,
        message,
        setMessage,
        iconURL,
        setIconURL,
        iconName,
        setIconName,
        iconSelectorFlg,
        setIconSelectorFlg,
        favs,
        setFavs,
        datetime,
        setDatetime,
        myFavFlg,
        setMyFavFlg,
        secondIconFlg,
        setSecondIconFlg,
        secondIconName,
        setSecondIconName,
        secondIconURL,
        setSecondIconURL,
        secondIconSelectorFlg,
        setSecondIconSelectorFlg,
        selectIconType,
        setSelectIconType,
        idolTalkList,
        setIdolTalkList,
        draggedTalkIndex,
        setDraggedTalkIndex,
        previewName,
        setPreviewName
      }}
    >
      <Container>
        <Row>
          <Col className="mx-auto" xs={12} sm={10} md={8}>
            {viewTypeToView()}
          </Col>
        </Row>
      </Container>
    </ConfigContext.Provider>
  );
};

export default App;
