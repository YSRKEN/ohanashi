import * as React from 'react';
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import { findShortNameByName } from 'src/iconData';
import { TALK_TYPE_LIST } from '../constant';
import { ConfigContext } from '../context';
import '../css/DerepoView.css';
import '../css/OhanashiView.css';
import DerepoForm from './DerepoForm';
import InputCharacterIcon1 from './InputCharacterIcon1';
import InputCharacterIcon2 from './InputCharacterIcon2';
import InputCharacterName from './InputCharacterName';
import SelectButtonGroup from './SelectButtonGroup';
import ViewComponent from './ViewComponent';

const isPC = () => window.innerWidth >= 768;

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

	// 第二アイコンを開閉するボタンを押した際の処理
	const onClickSecondIconButton = () => {
		const nowFlg = config.secondIconFlg;
		config.setSecondIconFlg(!nowFlg);
	}

	// 会話を追加する際の処理
	const onClickAddTalkButton = () => {
		const newTalkList = [];
		for (const data of config.idolTalkList) {
			const cloneData = JSON.parse(JSON.stringify(data));
			newTalkList.push(cloneData);
		}
		newTalkList.push(JSON.parse(JSON.stringify(previewData())));
		config.setIdolTalkList(newTalkList);
	}

	const previewData = () => {
		return {
			name: config.previewName,
			url: config.iconURL,
			// tslint:disable-next-line: object-literal-sort-keys
			message: config.message,
			favs: config.favs,
			datetime: config.datetime,
			myFavFlg: config.myFavFlg,
			url2: config.secondIconURL,
			secondIconFlg: config.secondIconFlg
		};
	}

	React.useEffect(() => {
		if (config.charaNameType === '手動') {
			config.setPreviewName(config.charaName);
			return;
		}
		if (!config.secondIconFlg) {
			config.setPreviewName(config.iconName);
			return;
		}

		findShortNameByName(config.iconName).then((sName1) => {
			findShortNameByName(config.secondIconName).then((sName2) => {
				config.setPreviewName(`${sName1}＆${sName2}`);
			})
		});
	}, [config.charaNameType, config.secondIconFlg, config.iconName, config.secondIconName]);

	return (
		<>
			<h1 className="text-center d-none d-sm-block my-3">アイマス会話メーカー</h1>
			<h2 className="text-center d-xs-block d-sm-none my-3">アイマス会話メーカー</h2>
			<p className="text-center">
				<span className='mr-3'>Ver.2.0.0(α)</span>
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
				{
					isPC()
					? <div className='d-flex'>
						<InputCharacterIcon1/>
						<button className='p-0 mx-3' style={{fontSize: 10, width: 20}}
								onClick={onClickSecondIconButton}>{config.secondIconFlg ? '←' : '→'}</button>
						{config.secondIconFlg ? <InputCharacterIcon2/> : <></>}
					</div>
					: <>
						<InputCharacterIcon1/>
						<button className='p-0 mb-3 w-100' style={{fontSize: 10, height: 20}}
								onClick={onClickSecondIconButton}>{config.secondIconFlg ? '↑' : '↓'}</button>
						{config.secondIconFlg ? <InputCharacterIcon2/> : <></>}
					</>
				}
				<FormGroup>
					<FormLabel>喋る内容</FormLabel>
					<FormControl as='textarea' value={config.message} onChange={onChangeMessage} rows="3"/>
				</FormGroup>
				<DerepoForm talkType={config.talkType}/>
				<FormGroup>
					<FormLabel>プレビュー</FormLabel>
					<ViewComponent talkType={config.talkType} talkData={previewData()}/>
				</FormGroup>
				<FormGroup>
					<Button className='w-100' onClick={onClickAddTalkButton}>追加</Button>
				</FormGroup>
			</Form>
		</>
	);
}

export default InputTalkForm;
