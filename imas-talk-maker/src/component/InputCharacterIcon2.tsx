import * as React from 'react';
import { ConfigContext } from 'src/context';
import InputCharacterIcon from './InputCharacterIcon';

const InputCharacterIcon2: React.FC = () => {
	const config = React.useContext(ConfigContext);
	if (config === null) {
		return (<></>);
	}

	return (<InputCharacterIcon
		iconName={config.secondIconName}
		iconURL={config.secondIconURL}
		setIconUrl={config.setSecondIconURL}
		iconSelectorFlg={config.secondIconSelectorFlg}
		setIconSelectorFlg={config.setSecondIconSelectorFlg}
	/>);
}

export default InputCharacterIcon2;
