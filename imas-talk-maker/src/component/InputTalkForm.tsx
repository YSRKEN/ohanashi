import * as React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import { TALK_TYPE_LIST } from '../constant';
import { ConfigContext } from '../context';
import '../DerepoView.css';
import '../OhanashiView.css';
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
		<>
			<h1 className="text-center d-none d-sm-block my-3">アイマス会話メーカー</h1>
			<h2 className="text-center d-xs-block d-sm-none my-3">アイマス会話メーカー</h2>
			<p className="text-center">
				<a href="https://github.com/YSRKEN/ohanashi">GitHub</a>
				<span className="ml-3">
					作者：
					<a href="https://twitter.com/YSRKEN" className="mr-3">
						@YSRKEN
					</a>
				</span>
			</p>
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
					<FormControl as='textarea' value={config.message} onChange={onChangeMessage} rows="3"/>
				</FormGroup>
				<DerepoForm talkType={config.talkType}/>
				<FormGroup>
					<FormLabel>プレビュー</FormLabel>
					{
						config.talkType === 'おはなし'
							? <div className="talk-list">
								<OhanashiView talkData={previewData()}/>
							</div>
							: <div className="derepo-list">
								<DerepoView talkData={previewData()} firstFlg={true}/>
								<DerepoView talkData={previewData()} firstFlg={false}/>
								<DerepoView talkData={previewData()} firstFlg={false}/>
							</div>
					}
				</FormGroup>
			</Form>
		</>
	);
}

export default InputTalkForm;
