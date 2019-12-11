// 「おはなし」の形態
export type MessageMode = 'normal' | 'double' | 'quartet' | 'message-only';

// 「おはなし」の1データ
export interface OhanashiData {
  name: string;
  iconUrls: string[];
  message: string;
  messageMode: MessageMode;
}

// Actionの種類
export type ActionType = 'addOhanashi';

// Action本体
export interface Action {
  type: ActionType;
  message: string;
}

// StoreのI/F
export interface ApplicationStore {
  ohanashiDataList: OhanashiData[];
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
