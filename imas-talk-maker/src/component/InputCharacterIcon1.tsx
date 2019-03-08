import * as React from 'react';
import { ConfigContext } from 'src/context';
import InputCharacterIcon from './InputCharacterIcon';

const InputCharacterIcon1: React.FC = () => {
	const config = React.useContext(ConfigContext);
	if (config === null) {
		return (<></>);
	}

	return (<InputCharacterIcon
		iconName={config.iconName}
		iconURL={config.iconURL}
		setIconUrl={config.setIconURL}
		iconSelectorFlg={config.iconSelectorFlg}
		setIconSelectorFlg={config.setIconSelectorFlg}
	/>);
}

export default InputCharacterIcon1;
