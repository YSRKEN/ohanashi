// おはなしモードかデレぽモードか
export type TalkType = 'おはなし' | 'デレぽ';

// TalkTypeに許された選択肢一覧
export const TALK_TYPE_LIST = ['おはなし', 'デレぽ'];

// キャラ名について
export type CharaNameType = '自動' | '手動';

// CharaNameTypeに許された選択肢一覧
export const CHARA_NAME_TYPE_LIST = ['自動', '手動'];

// 画面の種類
export type ViewType = 'InputTalk' | 'SelectName';

// アイドルの情報を表示するための型
export interface IIdolInfo {
	name: string
	kana: string
	url: string
}

// 会話データ
export interface ITalkData {
	name: string
	url: string
	message: string
	favs: string
	datetime: string
	myFavFlg: boolean
	url2: string
}

// どちらのアイコンを選択するか
export type SelectIconType = '1st' | '2nd';
