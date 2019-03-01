import * as React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { IIdolInfo } from 'src/constant';
import { ConfigContext } from 'src/context';

// アイドル名の一覧表示
const IdolNameList: React.FC<{ idolList: IIdolInfo[] }> = ({ idolList }) => {
	const config = React.useContext(ConfigContext);
	if (config === null) {
		return (<></>);
	}

	return (
		<ButtonGroup className="w-100" vertical={true}>
			{idolList.map((idol, i) => {
				const onClickButton = () => {
					config.setIconName(idol.name);
					config.setIconURL(idol.url);
					config.setIconSelectorFlg(false);
					config.setViewType('InputTalk');
				}
				return (<Button className="w-100" variant="outline-secondary" key={i}
					onClick={onClickButton}>{idol.name}</Button>);
			})}
		</ButtonGroup>
	);
}

export default IdolNameList;
