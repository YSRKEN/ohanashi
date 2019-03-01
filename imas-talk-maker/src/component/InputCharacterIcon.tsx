import * as React from 'react';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import { ConfigContext } from 'src/context';
import IconSelector from './IconSelector';

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

export default InputCharacterIcon;
