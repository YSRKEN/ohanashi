import * as React from 'react';
import { CharaNameType, TalkType } from './constant';

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
}

export const ConfigContext = React.createContext<IConfig | null>(null);
