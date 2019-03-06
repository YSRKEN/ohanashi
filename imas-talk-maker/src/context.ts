import * as React from 'react';
import { CharaNameType, TalkType, ViewType } from './constant';

// 設定を表すContext
export interface IConfig {
	// おはなしモードかデレぽモードか
	talkType: TalkType
	setTalkType: (value: TalkType) => void

	// 画面構成の種類
	viewType: ViewType
	setViewType: (value: ViewType) => void

	// キャラ名について
	charaNameType: CharaNameType
	setCharaNameType: (value: CharaNameType) => void

	// キャラ名
	charaName: string
	setCharaName: (value: string) => void

	// アイコンのURL
	iconURL: string
	setIconURL: (value: string) => void

	// アイコンの名前
	iconName: string
	setIconName: (value: string) => void

	// アイコンの表情を選択するメニューを表示する
	iconSelectorFlg: boolean
	setIconSelectorFlg: (value: boolean) => void

	// 本文
	message: string
	setMessage: (value: string) => void

	// ファボ数
	favs: string
	setFavs: (value: string) => void

	// 時刻
	datetime: string
	setDatetime: (value: string) => void

	// 自分がファボったか？
	myFavFlg: boolean
	setMyFavFlg: (value: boolean) => void

	// 第二アイコンを表示するか？
	secondIconFlg: boolean
	setSecondIconFlg: (value: boolean) => void
}
export const ConfigContext = React.createContext<IConfig | null>(null);
