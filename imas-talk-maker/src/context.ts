import * as React from 'react';
import { CharaNameType, TalkType } from './constant';

// 設定を表すContext
export interface IConfig {
	// おはなしモードかデレぽモードか
	talkType: TalkType
	setTalkType: (value: TalkType) => void

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
}
export const ConfigContext = React.createContext<IConfig | null>(null);
