import * as React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import { TALK_TYPE_LIST } from '../constant';
import { ConfigContext } from '../context';
import DerepoForm from './DerepoForm';
import DerepoView from './DerepoView';
import InputCharacterIcon from './InputCharacterIcon';
import InputCharacterName from './InputCharacterName';
import OhanashiView from './OhanashiView';
import SelectButtonGroup from './SelectButtonGroup';

// 入力フォーム全体
const InputTalkForm: React.FC<{ className?: string }> = ({className = ""}) => {
	const config = React.useContext(ConfigContext);
	if (config === null) {
		return (<></>);
	}

	// 本文が変更した際の処理
	const onChangeMessage = (event: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input">>>) => {
		const value = event.currentTarget.value;
		if (typeof value === 'string') {
			config.setMessage(value);
		}
	}

	const previewData = () => {
		return {
			name: config.charaNameType === '自動' ? config.iconName : config.charaName,
			url: config.iconURL,
			// tslint:disable-next-line: object-literal-sort-keys
			message: config.message,
			favs: config.favs,
			datetime: config.datetime,
			myFavFlg: config.myFavFlg
		};
	}

	return (
		<Form className={`border p-3 ${className}`}>
			<FormGroup>
				<SelectButtonGroup className="w-100" nameList={TALK_TYPE_LIST}
					firstSelectName={config.talkType} selectedColorType='primary'
					callback={config.setTalkType}/>
			</FormGroup>
			<InputCharacterName/>
			<InputCharacterIcon/>
			<FormGroup>
				<FormLabel>喋る内容</FormLabel>
				<FormControl as='textarea' value={config.message} onChange={onChangeMessage} />
			</FormGroup>
			<DerepoForm talkType={config.talkType}/>
			<FormGroup>
				<FormLabel>プレビュー</FormLabel>
				{
					config.talkType === 'おはなし'
						? <OhanashiView talkData={previewData()}/>
						: <DerepoView talkData={previewData()} firstFlg={true}/>
				}
			</FormGroup>
		</Form>
	);
}

export default InputTalkForm;
