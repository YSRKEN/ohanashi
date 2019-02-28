import * as React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import { CHARA_NAME_TYPE_LIST, CharaNameType, TALK_TYPE_LIST, TalkType } from '../constant';
import { ConfigContext } from '../context';
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
const InputTalkForm: React.FC<{ className?: string }> = ({className = ""}) => (
	<ConfigContext.Consumer>
		{(props) => {
			if (props === null){
				return (<></>);
			}

			// キャラ名が変更した際の処理
			const onChangeCharaName = (event: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input">>>) => {
				const value = event.currentTarget.value;
				if (typeof value === 'string') {
					props.setCharaName(value);
				}
			}

			// 本文が変更した際の処理
			const onChangeMessage = (event: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input">>>) => {
				const value = event.currentTarget.value;
				if (typeof value === 'string') {
					props.setMessage(value);
				}
			}

			return (
				<Form className={`border p-3 ${className}`}>
					<FormGroup>
						<SelectButtonGroup className="w-100" nameList={TALK_TYPE_LIST}
							firstSelectName={props.talkType} selectedColorType='primary'
							callback={props.setTalkType}/>
					</FormGroup>
					<FormGroup>
						<FormLabel>キャラ名</FormLabel>
						<SelectButtonGroup className="ml-3 my-3" nameList={CHARA_NAME_TYPE_LIST}
							firstSelectName={props.charaNameType} selectedColorType='primary'
							callback={props.setCharaNameType}/>
						<FormControl disabled={isAutoInputName(props.charaNameType)}
							value={props.charaName} onChange={onChangeCharaName}/>
					</FormGroup>
					<FormGroup>
						<FormLabel>喋る内容</FormLabel>
						<FormControl as='textarea' value={props.message} onChange={onChangeMessage} />
					</FormGroup>
					{derepoForm(props.talkType)}
				</Form>
			);
		}}
	</ConfigContext.Consumer>
);

export default InputTalkForm;
