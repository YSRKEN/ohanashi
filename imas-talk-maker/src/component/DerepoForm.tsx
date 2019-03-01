import * as React from 'react';
import { FormCheck, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import { TalkType } from 'src/constant';
import { ConfigContext } from 'src/context';

// デレぽモード時のみ表示されるフォーム
const DerepoForm: React.FC<{ talkType: TalkType }> = ({ talkType }) => {
	if (talkType !== 'デレぽ') {
		return (<></>);
	}

	const config = React.useContext(ConfigContext);
	if (config === null) {
		return (<></>);
	}

	// ファボ数が変更した際の処理
	const onChangeFavs = (event: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input">>>) => {
		const value = event.currentTarget.value;
		if (typeof value === 'string') {
			config.setFavs(value);
		}
	}

	// 時刻が変更した際の処理
	const onChangeDatetime = (event: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input">>>) => {
		const value = event.currentTarget.value;
		if (typeof value === 'string') {
			config.setDatetime(value);
		}
	}

	const onClickMyFav = () => {
		config.setMyFavFlg(!config.myFavFlg);
	}

	return (
		<>
			<FormGroup>
				<FormLabel>ファボ数</FormLabel>
				<FormControl value={config.favs} onChange={onChangeFavs} />
			</FormGroup>
			<FormGroup>
				<FormLabel>時刻</FormLabel>
				<FormControl value={config.datetime} onChange={onChangeDatetime} />
			</FormGroup>
			<FormGroup>
			<FormCheck type='checkbox' label='ファボる' checked={config.myFavFlg} onClick={onClickMyFav}/>
			</FormGroup>
		</>
	);
}

export default DerepoForm;
