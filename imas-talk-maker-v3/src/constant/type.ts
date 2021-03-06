// 「おはなし」の形態
export type MessageMode = 'normal' | 'reverse' | 'double' | 'quartet' | 'message-only';

// 「おはなし」の1データ
export interface OhanashiData {
  // 名前欄
  name: string;
  // アイコン群
  iconUrls: string[];
  // メッセージ
  message: string;
  // メッセージの表示モード
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
  | 'clearLocalStrage'
  | 'changeNameD'
  | 'changeMessageD'
  | 'changeFavFlgD'
  | 'changeFavCountD'
  | 'changeMonthD'
  | 'changeDayD'
  | 'changeHourD'
  | 'changeMinuteD'
  | 'setDownloadLinkD'
  | 'addDerepo'
  | 'deleteAllDerepo'
  | 'clickUpperDerepoView'
  | 'clickLowerDerepoView'
  | 'insertDerepo'
  | 'upDerepo'
  | 'downDerepo'
  | 'editDerepo'
  | 'overWriteDerepo'
  | 'deleteDerepo'
  | 'selectIconD'
  | 'selectFaceIconD'
  | 'toDerepoMode'
  | 'toOhanashiMode';

// Action本体
export interface Action {
  // 種類
  type: ActionType;
  // メッセージ
  message: string;
}

// StoreのI/F
export interface ApplicationStore {
  // 現在入力中の「おはなし」のデータ
  nowOhanashiData: OhanashiData;
  // 登録している「おはなし」の一覧
  ohanashiDataList: OhanashiData[];
  // 表情選択のインデックス
  selectedIconIndex: number;
  // シーンの種類
  scene: SceneType;
  // 画像のダウンロードリンク
  downloadLink: string;
  // 「おはなし」で選択しているインデックス
  messageSplitIndex: number;
  // アイコン選択時のオプション
  selectOption: SelectOption;
  // 現在入力中の「デレぽ」のデータ
  nowDerepoData: DerepoData;
  // 登録している「デレぽ」の一覧
  derepoDataList: DerepoData[];
  // 表情選択のインデックス
  selectedIconIndexD: number;
  // 画像のダウンロードリンク
  downloadLinkD: string;
  // デレぽで選択しているインデックス
  messageSplitIndexD: number;
  // dispatch関数
  dispatch: (action: Action) => void;
}

// アイドルの種類
export type IdolType = 'million' | 'cinderella' | 'other' | 'all';

// アイドルデータ
export interface Idol {
  // フルネーム
  name: string;
  // 短縮名
  shortName: string;
  // ふりがな(平仮名)
  kana: string;
  // アイコン一覧(表情一覧)
  iconList: string[];
  // アイドルの種類
  category: IdolType;
}

// 表示シーン
export type SceneType = 'Ohanashi' | 'IdolSelect' | 'Derepo';

// デレぽの1データ
export interface DerepoData {
  // 名前欄
  name: string;
  // アイコン
  iconUrl: string;
  // メッセージ
  message: string;
  // ファボしていたらtrue
  favFlg: boolean;
  // ファボ数
  favCount: number;
  // 月
  month: number;
  // 日
  day: number;
  // 時
  hour: number;
  // 分
  minute: number;
  // ハッシュタグ
  hashTags: string[];
}

// 絞り込み時の表示タイプ
export type ShowType = 'text' | 'icon' | 'all';

// 絞り込みのオプション
export interface SelectOption {
  keyword: string;
  category: IdolType;
  showType: ShowType;
}
