import * as React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import { CHARA_NAME_TYPE_LIST, CharaNameType, TALK_TYPE_LIST, TalkType } from './constant';
import SelectButtonGroup from './SelectButtonGroup';

// デレぽモード時のみ表示されるフォーム
const derepoForm = (talkType: TalkType) => (talkType === 'デレぽ' ? (
	<FormGroup>
		<FormLabel>ファボ数</FormLabel>
		<FormControl />
	</FormGroup>
) : (<></>));

// 自動入力時はtrue
const isAutoInputName = (charaNameType: CharaNameType) => (charaNameType === '自動');

// 入力フォーム全体
const InputTalkForm: React.FC<{
	className?: string,	// 設定するクラス
	talkType: TalkType,	// おはなしモードかデレぽモードか
	setTalkType: (value: TalkType) => void,	// モードを切り替える
	charaNameType: CharaNameType,	// キャラ名について
	setCharaNameType: (value: CharaNameType) => void	// モードを切り替える
	charaName: string,	// キャラ名について
	setCharaName: (value: string) => void	// キャラ名をセットする
}> = ({className = "", talkType, setTalkType, charaNameType, setCharaNameType,
		charaName, setCharaName}) => {

	const onChangeCharaName = (event: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input">>>) => {
		const value = event.currentTarget.value;
		if (typeof value === 'string') {
			setCharaName(value);
		}
	}

	return (
		<Form className={`border p-3 ${className}`}>
			<FormGroup>
				<SelectButtonGroup className="w-100" nameList={TALK_TYPE_LIST}
					firstSelectName={talkType} selectedColorType='primary'
					callback={setTalkType}/>
			</FormGroup>
			<FormGroup>
				<FormLabel>キャラ名</FormLabel>
				<SelectButtonGroup className="ml-3 my-3" nameList={CHARA_NAME_TYPE_LIST}
					firstSelectName={charaNameType} selectedColorType='primary'
					callback={setCharaNameType}/>
				<FormControl disabled={isAutoInputName(charaNameType)}
					value={charaName} onChange={onChangeCharaName}/>
			</FormGroup>
			{derepoForm(talkType)}
		</Form>
	);
}

export default InputTalkForm;
