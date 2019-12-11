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
