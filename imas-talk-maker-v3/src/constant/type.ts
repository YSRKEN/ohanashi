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
export type ActionType = 'changeName' | 'changeMessage' | 'changeMessageMode' | 'addOhanashi' | 'selectIcon' | 'selectFaceIcon';

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
  dispatch: (action: Action) => void;
}

// アイドルの種類
export type IdolType = 'million' | 'cinderella' | 'other';

// アイドルデータ
export interface Idol {
  name: string;
  shortName: string;
  kana: string;
  iconList: string[];
  category: IdolType;
}
