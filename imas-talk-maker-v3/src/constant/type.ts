// 「おはなし」の形態
export type MessageMode = 'normal' | 'reverse' | 'double' | 'quartet' | 'message-only';

// 「おはなし」の1データ
export interface OhanashiData {
  name: string;
  iconUrls: string[];
  message: string;
  messageMode: MessageMode;
}

// Actionの種類
export type ActionType =
  | 'changeName'
  | 'changeMessage'
  | 'changeMessageMode'
  | 'addOhanashi'
  | 'deleteAllOhanashi'
  | 'upOhanashi'
  | 'insertOhanashi'
  | 'downOhanashi'
  | 'editOhanashi'
  | 'overWriteOhanashi'
  | 'deleteOhanashi'
  | 'selectIcon'
  | 'selectFaceIcon'
  | 'toSelectIdolForm'
  | 'toBaseForm'
  | 'selectIdolIcon'
  | 'setDownloadLink'
  | 'clickUpperOhanashiView'
  | 'clickLowerOhanashiView'
  | 'changeCategory'
  | 'changeKeyword'
  | 'changeShowType'
  | 'clearLocalStrage';

// Action本体
export interface Action {
  type: ActionType;
  message: string;
}

// StoreのI/F
export interface ApplicationStore {
  nowOhanashiData: OhanashiData;
  ohanashiDataList: OhanashiData[];
  selectedIconIndex: number;
  scene: SceneType;
  downloadLink: string;
  messageSplitIndex: number;
  selectOption: SelectOption;
  dispatch: (action: Action) => void;
}

// アイドルの種類
export type IdolType = 'million' | 'cinderella' | 'other' | 'all';

// アイドルデータ
export interface Idol {
  name: string;
  shortName: string;
  kana: string;
  iconList: string[];
  category: IdolType;
}

// 表示シーン
export type SceneType = 'Ohanashi' | 'IdolSelect';

// 絞り込み時の表示タイプ
export type ShowType = 'text' | 'icon' | 'all';

// 絞り込みのオプション
export interface SelectOption {
  keyword: string;
  category: IdolType;
  showType: ShowType;
}
