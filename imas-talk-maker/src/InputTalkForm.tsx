import * as React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import { TALK_TYPE_LIST, TalkType } from './constant';
import SelectButtonGroup from './SelectButtonGroup';

// デレぽモード時のみ表示されるフォーム
const derepoForm = (talkType: TalkType) => (talkType === 'デレぽ' ? (
	<FormGroup>
		<FormLabel>ファボ数</FormLabel>
		<FormControl />
	</FormGroup>
) : (<></>));

// 入力フォーム全体
const InputTalkForm: React.FC<{
	className?: string,
	talkType: TalkType,
	setTalkType: (value: TalkType) => void
}> = ({className = "", talkType, setTalkType}) => (
	<Form className={`border p-3 ${className}`}>
	<FormGroup>
		<SelectButtonGroup className="w-100" nameList={TALK_TYPE_LIST}
			firstSelectName={talkType} selectedColorType='primary'
			callback={setTalkType}/>
	</FormGroup>
	<FormGroup>
		<FormLabel>キャラ名</FormLabel>
		<FormControl />
	</FormGroup>
	{derepoForm(talkType)}
	</Form>
);

export default InputTalkForm;
