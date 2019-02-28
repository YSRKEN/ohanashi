import * as React from 'react';
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import { findIconListByName } from 'src/iconData';
import { CHARA_NAME_TYPE_LIST, CharaNameType, TALK_TYPE_LIST, TalkType } from '../constant';
import { ConfigContext } from '../context';
import SelectButtonGroup from './SelectButtonGroup';

// 自動入力時はtrue
const isAutoInputName = (charaNameType: CharaNameType) => (charaNameType === '自動');

// キャラ名入力
const InputCharacterName: React.FC = () => {
	const config = React.useContext(ConfigContext);
	if (config === null) {
		return (<></>);
	}

	// キャラ名が変更した際の処理
	const onChangeCharaName = (event: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input">>>) => {
		const value = event.currentTarget.value;
		if (typeof value === 'string') {
			config.setCharaName(value);
		}
	}

	return (
		<FormGroup>
			<FormLabel>キャラ名</FormLabel>
			<SelectButtonGroup className="ml-3 my-3" nameList={CHARA_NAME_TYPE_LIST}
				firstSelectName={config.charaNameType} selectedColorType='secondary'
				callback={config.setCharaNameType}/>
			<FormControl disabled={isAutoInputName(config.charaNameType)}
				value={config.charaName} onChange={onChangeCharaName}/>
		</FormGroup>
	);
}

// 表情セレクター
const IconSelector: React.FC<{ className?: string, iconName: string }> = ({className = "", iconName = ""}) => {
	const config = React.useContext(ConfigContext);
	const [urlList, setUrlList] = React.useState<string[]>([]);

	React.useEffect(() => {
    findIconListByName(iconName).then((list) => {
			setUrlList(list);
		});
  }, [iconName]);

	if (config === null) {
		return (<></>);
	}
	if (urlList.length === 0) {
		return (<></>);
	}

	return (
		<div className={`${className} mt-3`}>
			<div>
				{urlList.map((url, i) => {
					const onClickImg = () => {
						config.setIconURL(url);
						config.setIconSelectorFlg(false);
					};
					return (
						<img key={i} src={url} width="44" height="44" className="m-1" onClick={onClickImg}/>
					);
				})}
			</div>
		</div>
	);
}

// キャラアイコン選択
const InputCharacterIcon: React.FC = () => {
	const config = React.useContext(ConfigContext);
	if (config === null) {
		return (<></>);
	}

	// キャラボタンを押した際の処理
	const clickCharaButtonFunc = () => {
		config.setViewType('SelectName');
	}

	// 表情ボタンを押した際の処理
	const clickIconButtonFunc = () => {
		if (config.iconSelectorFlg) {
			config.setIconSelectorFlg(false);
		} else {
			config.setIconSelectorFlg(true);
		}
	}

	return (
		<FormGroup>
			<FormLabel>アイコン({config.iconName})</FormLabel><br />
			<div className="d-flex ml-3">
				<img src={`${process.env.PUBLIC_URL}${config.iconURL}`} width="72" height="72" />
				<div className="my-auto">
					<Button className="mx-3" variant="secondary" onClick={clickCharaButtonFunc}>キャラ</Button>
					<Button variant="secondary" onClick={clickIconButtonFunc}>表情</Button>
				</div>
			</div>
			{config.iconSelectorFlg
				? (<IconSelector iconName={config.iconName}/>)
				:	(<></>)}
	</FormGroup>
	);
}

// デレぽモード時のみ表示されるフォーム
const DerepoForm: React.FC<{talkType: TalkType}> = ({talkType}) => {
	if (talkType !== 'デレぽ') {
		return (<></>);
	}

	return (
		<FormGroup>
			<FormLabel>ファボ数</FormLabel>
			<FormControl />
		</FormGroup>
	);
}

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
		</Form>
	);
}

export default InputTalkForm;
