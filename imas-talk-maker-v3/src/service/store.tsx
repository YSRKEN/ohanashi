import { createContext, useState } from 'react';
import { loadSetting, saveSetting, tryParseInt, useLocalStorageState } from 'service/utility';
import { OhanashiData, ApplicationStore, Action, MessageMode, SceneType, SelectOption, IdolType, ShowType, DerepoData } from 'constant/type';
import { SAMPLE_DEREPO, SAMPLE_OHANASHI, SAMPLE_OHANASHI_LIST } from 'constant/other';

export const useApplicationStore = (): ApplicationStore => {
  // 現在入力している「おはなし」の一覧
  const [ohanashiDataList, setOhanashiDataList] = useLocalStorageState<OhanashiData[]>('ohanashiDataList', SAMPLE_OHANASHI_LIST);
  // プレビュー用の「おはなし」
  const [nowOhanashiData, setNowOhanashiData] = useLocalStorageState<OhanashiData>('nowOhanashiData', SAMPLE_OHANASHI);
  // 入力フォームでどのアイコンを選択しているか
  const [selectedIconIndex, setSelectedIconIndex] = useState(-1);
  // 現在の表示シーン
  const [scene, setScene] = useLocalStorageState<SceneType>('scene', 'Ohanashi');
  // ダウンロードリンク
  const [downloadLink, setDownloadLink] = useState('#');
  // 「おはなし」におけるどの位置で区切るか
  const [messageSplitIndex, setMessageSplitIndex] = useState(-1);
  // 選択画面での絞り込み状態
  const [selectOption, setSelectOption] = useLocalStorageState<SelectOption>('selectOption', {
    keyword: '',
    category: 'all',
    showType: 'text'
  });
  // プレビュー用の「デレぽ」
  const [nowDerepoData, setNowDerepoData] = useLocalStorageState<DerepoData>('nowDerepoData', SAMPLE_DEREPO);
  // 現在入力している「デレぽ」の一覧
  const [derepoDataList, setDerepoDataList] = useLocalStorageState<DerepoData[]>('derepoDataList', []);
  // 入力フォームでどのアイコンを選択しているか
  const [selectedIconIndexD, setSelectedIconIndexD] = useState(-1);
  // ダウンロードリンク
  const [downloadLinkD, setDownloadLinkD] = useState('#');
  // 「デレぽ」におけるどの位置で区切るか
  const [messageSplitIndexD, setMessageSplitIndexD] = useState(-1);

  saveSetting<SceneType>('scene2', loadSetting<SceneType>('scene', 'Ohanashi'));

  // dispatch関数
  const dispatch = (action: Action) => {
    console.log(action);
    switch (action.type) {
      case 'changeName':
        setNowOhanashiData({ ...nowOhanashiData, name: action.message });
        break;
      case 'changeMessage':
        setNowOhanashiData({ ...nowOhanashiData, message: action.message });
        break;
      case 'changeMessageMode': {
        setSelectedIconIndex(-1);
        setNowOhanashiData({
          ...nowOhanashiData,
          messageMode: action.message as MessageMode
        });
        break;
      }
      case 'addOhanashi': {
        const temp = JSON.parse(JSON.stringify(nowOhanashiData)) as OhanashiData;
        setOhanashiDataList([...ohanashiDataList, temp]);
        break;
      }
      case 'insertOhanashi': {
        const temp = JSON.parse(JSON.stringify(nowOhanashiData)) as OhanashiData;
        setOhanashiDataList([...ohanashiDataList.slice(0, messageSplitIndex + 1), temp, ...ohanashiDataList.slice(messageSplitIndex + 1)]);
        setMessageSplitIndex(messageSplitIndex + 1);
        break;
      }
      case 'upOhanashi':
        if (messageSplitIndex > 0) {
          setOhanashiDataList([
            ...ohanashiDataList.slice(0, messageSplitIndex - 1),
            ohanashiDataList[messageSplitIndex],
            ohanashiDataList[messageSplitIndex - 1],
            ...ohanashiDataList.slice(messageSplitIndex + 1)
          ]);
          setMessageSplitIndex(messageSplitIndex - 1);
        }
        break;
      case 'downOhanashi':
        if (messageSplitIndex < ohanashiDataList.length - 1) {
          setOhanashiDataList([
            ...ohanashiDataList.slice(0, messageSplitIndex),
            ohanashiDataList[messageSplitIndex + 1],
            ohanashiDataList[messageSplitIndex],
            ...ohanashiDataList.slice(messageSplitIndex + 2)
          ]);
          setMessageSplitIndex(messageSplitIndex + 1);
        }
        break;
      case 'editOhanashi':
        setNowOhanashiData(JSON.parse(JSON.stringify(ohanashiDataList[messageSplitIndex])));
        break;
      case 'overWriteOhanashi': {
        const temp = JSON.parse(JSON.stringify(nowOhanashiData)) as OhanashiData;
        setOhanashiDataList([...ohanashiDataList.slice(0, messageSplitIndex), temp, ...ohanashiDataList.slice(messageSplitIndex + 1)]);
        break;
      }
      case 'deleteAllOhanashi': {
        if (window.confirm('全ての「おはなし」を削除しますか？')) {
          setOhanashiDataList([]);
        }
        break;
      }
      case 'deleteOhanashi':
        setOhanashiDataList([...ohanashiDataList.slice(0, messageSplitIndex), ...ohanashiDataList.slice(messageSplitIndex + 1)]);
        setMessageSplitIndex(-1);
        break;
      case 'selectIcon': {
        const index = parseInt(action.message, 10);
        if (selectedIconIndex === index) {
          setSelectedIconIndex(-1);
        } else {
          setSelectedIconIndex(index);
        }
        break;
      }
      case 'selectFaceIcon': {
        const url = action.message;
        const temp = { ...nowOhanashiData };
        temp.iconUrls[selectedIconIndex] = url;
        setNowOhanashiData(temp);
        setSelectedIconIndex(-1);
        break;
      }
      case 'toSelectIdolForm': {
        setScene('IdolSelect');
        break;
      }
      case 'toBaseForm': {
        setScene(loadSetting<SceneType>('scene', 'Ohanashi'));
        break;
      }
      case 'selectIdolIcon': {
        const iconUrl = action.message;
        if (loadSetting<SceneType>('scene2', 'Ohanashi') === 'Ohanashi') {
          const temp = { ...nowOhanashiData };
          temp.iconUrls[selectedIconIndex] = iconUrl;
          setNowOhanashiData(temp);
          setSelectedIconIndex(-1);
          setScene('Ohanashi');
        } else {
          const temp = { ...nowDerepoData };
          temp.iconUrl = iconUrl;
          setNowDerepoData(temp);
          setSelectedIconIndexD(-1);
          setScene('Derepo');
        }
        break;
      }
      case 'setDownloadLink':
        setDownloadLink(action.message);
        break;
      case 'clickUpperOhanashiView': {
        const index = parseInt(action.message, 10);
        const newMessageSplitIndex = index;
        if (messageSplitIndex === newMessageSplitIndex) {
          setMessageSplitIndex(-1);
        } else {
          setMessageSplitIndex(newMessageSplitIndex);
        }
        break;
      }
      case 'clickLowerOhanashiView': {
        const index = parseInt(action.message, 10);
        if (index < 0) {
          setMessageSplitIndex(-1);
        } else {
          const newMessageSplitIndex = index + messageSplitIndex + 1;
          setMessageSplitIndex(newMessageSplitIndex);
        }
        break;
      }
      case 'changeCategory':
        setSelectOption({ ...selectOption, category: action.message as IdolType });
        break;
      case 'changeKeyword':
        setSelectOption({ ...selectOption, keyword: action.message });
        break;
      case 'changeShowType':
        setSelectOption({ ...selectOption, showType: action.message as ShowType });
        break;
      case 'clearLocalStrage':
        window.localStorage.clear();
        window.location.href = '/';
        break;
      case 'changeNameD':
        setNowDerepoData({ ...nowDerepoData, name: action.message });
        break;
      case 'changeMessageD':
        setNowDerepoData({ ...nowDerepoData, message: action.message });
        break;
      case 'changeFavFlgD':
        setNowDerepoData({ ...nowDerepoData, favFlg: !nowDerepoData.favFlg });
        break;
      case 'changeFavCountD': {
        const f = tryParseInt(action.message);
        if (typeof f !== 'undefined') {
          setNowDerepoData({ ...nowDerepoData, favCount: f });
        }
        break;
      }
      case 'changeMonthD': {
        const f = tryParseInt(action.message);
        if (typeof f !== 'undefined') {
          setNowDerepoData({ ...nowDerepoData, month: f });
        }
        break;
      }
      case 'changeDayD': {
        const f = tryParseInt(action.message);
        if (typeof f !== 'undefined') {
          setNowDerepoData({ ...nowDerepoData, day: f });
        }
        break;
      }
      case 'changeHourD': {
        const f = tryParseInt(action.message);
        if (typeof f !== 'undefined') {
          setNowDerepoData({ ...nowDerepoData, hour: f });
        }
        break;
      }
      case 'changeMinuteD': {
        const f = tryParseInt(action.message);
        if (typeof f !== 'undefined') {
          setNowDerepoData({ ...nowDerepoData, minute: f });
        }
        break;
      }
      case 'addDerepo': {
        const temp = JSON.parse(JSON.stringify(nowDerepoData)) as DerepoData;
        setDerepoDataList([...derepoDataList, temp]);
        break;
      }
      case 'deleteAllDerepo': {
        if (window.confirm('全ての「デレぽ」を削除しますか？')) {
          setDerepoDataList([]);
        }
        break;
      }
      case 'setDownloadLinkD':
        setDownloadLinkD(action.message);
        break;
      case 'clickUpperDerepoView': {
        const index = parseInt(action.message, 10);
        const newMessageSplitIndex = index;
        if (messageSplitIndexD === newMessageSplitIndex) {
          setMessageSplitIndexD(-1);
        } else {
          setMessageSplitIndexD(newMessageSplitIndex);
        }
        break;
      }
      case 'clickLowerDerepoView': {
        const index = parseInt(action.message, 10);
        if (index < 0) {
          setMessageSplitIndexD(-1);
        } else {
          const newMessageSplitIndex = index + messageSplitIndexD + 1;
          setMessageSplitIndexD(newMessageSplitIndex);
        }
        break;
      }
      case 'insertDerepo': {
        const temp = JSON.parse(JSON.stringify(nowDerepoData)) as DerepoData;
        setDerepoDataList([...derepoDataList.slice(0, messageSplitIndexD + 1), temp, ...derepoDataList.slice(messageSplitIndexD + 1)]);
        setMessageSplitIndexD(messageSplitIndexD + 1);
        break;
      }
      case 'upDerepo':
        if (messageSplitIndexD > 0) {
          setDerepoDataList([
            ...derepoDataList.slice(0, messageSplitIndexD - 1),
            derepoDataList[messageSplitIndexD],
            derepoDataList[messageSplitIndexD - 1],
            ...derepoDataList.slice(messageSplitIndexD + 1)
          ]);
          setMessageSplitIndexD(messageSplitIndexD - 1);
        }
        break;
      case 'downDerepo':
        if (messageSplitIndexD < derepoDataList.length - 1) {
          setDerepoDataList([
            ...derepoDataList.slice(0, messageSplitIndexD),
            derepoDataList[messageSplitIndexD + 1],
            derepoDataList[messageSplitIndexD],
            ...derepoDataList.slice(messageSplitIndexD + 2)
          ]);
          setMessageSplitIndexD(messageSplitIndexD + 1);
        }
        break;
      case 'editDerepo':
        setNowDerepoData(JSON.parse(JSON.stringify(derepoDataList[messageSplitIndexD])));
        break;
      case 'overWriteDerepo': {
        const temp = JSON.parse(JSON.stringify(nowDerepoData)) as DerepoData;
        setDerepoDataList([...derepoDataList.slice(0, messageSplitIndexD), temp, ...derepoDataList.slice(messageSplitIndexD + 1)]);
        break;
      }
      case 'deleteDerepo':
        setDerepoDataList([...derepoDataList.slice(0, messageSplitIndexD), ...derepoDataList.slice(messageSplitIndexD + 1)]);
        setMessageSplitIndexD(-1);
        break;
      case 'selectIconD': {
        const index = parseInt(action.message, 10);
        if (selectedIconIndexD === index) {
          setSelectedIconIndexD(-1);
        } else {
          setSelectedIconIndexD(index);
        }
        break;
      }
      case 'selectFaceIconD': {
        const url = action.message;
        const temp = { ...nowDerepoData };
        temp.iconUrl = url;
        setNowDerepoData(temp);
        setSelectedIconIndexD(-1);
        break;
      }
      case 'toDerepoMode':
        saveSetting<SceneType>('scene2', 'Derepo');
        setScene('Derepo');
        break;
      case 'toOhanashiMode':
        saveSetting<SceneType>('scene2', 'Ohanashi');
        setScene('Ohanashi');
        break;
      default:
        break;
    }
  };

  return {
    nowOhanashiData,
    ohanashiDataList,
    selectedIconIndex,
    scene,
    downloadLink,
    messageSplitIndex,
    selectOption,
    nowDerepoData,
    derepoDataList,
    selectedIconIndexD,
    messageSplitIndexD,
    downloadLinkD,
    dispatch
  };
};

export const ApplicationContext = createContext<ApplicationStore>({} as ApplicationStore);
