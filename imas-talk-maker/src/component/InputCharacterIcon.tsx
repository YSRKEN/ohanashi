import * as React from 'react';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import { SelectIconType } from 'src/constant';
import { ConfigContext } from 'src/context';
import IconSelector from './IconSelector';

// キャラアイコン選択
const InputCharacterIcon: React.FC<{
	iconName: string,
	iconURL: string,
	setIconUrl: (value: string) => void
	iconSelectorFlg: boolean,
	setIconSelectorFlg: (value: boolean) => void,
	selectIconType: SelectIconType
}> = ({iconName, iconURL, setIconUrl, iconSelectorFlg, setIconSelectorFlg, selectIconType}) => {
	const config = React.useContext(ConfigContext);
	if (config === null) {
		return (<></>);
	}

	// キャラボタンを押した際の処理
	const clickCharaButtonFunc = () => {
		config.setSelectIconType(selectIconType);
		config.setViewType('SelectName');
	}

	// 表情ボタンを押した際の処理
	const clickIconButtonFunc = () => {
		if (iconSelectorFlg) {
			setIconSelectorFlg(false);
		} else {
			setIconSelectorFlg(true);
		}
	}

	return (
		<FormGroup>
			<FormLabel>アイコン({iconName})</FormLabel><br />
			<div className="d-flex ml-3">
				{
					iconURL.includes('non-select')
					? (<img className="border" src={`${process.env.PUBLIC_URL}${iconURL}`} width="72" height="72" crossOrigin="anonymous"/>)
					: (<img src={`${process.env.PUBLIC_URL}${iconURL}`} width="72" height="72" crossOrigin="anonymous"/>)
				}
				<div className="my-auto">
					<Button className="mx-3" variant="secondary" onClick={clickCharaButtonFunc}>キャラ</Button>
					<Button variant="secondary" onClick={clickIconButtonFunc}>表情</Button>
				</div>
			</div>
			{iconSelectorFlg
				? (<IconSelector iconName={iconName} setIconUrl={setIconUrl} setIconSelectorFlg={setIconSelectorFlg}/>)
				:	(<></>)}
	</FormGroup>
	);
}

export default InputCharacterIcon;
