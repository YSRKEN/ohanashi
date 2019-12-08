import * as React from 'react';
import { Button, FormCheck, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { TalkType } from 'src/constant';
import { ConfigContext } from 'src/context';

// 参考：JavaScript 日付を指定した書式の文字列にフォーマットする
// https://zukucode.com/2017/04/javascript-date-format.html
const formatDate = (date: Date, format: string): string => {
	format = format.replace(/yyyy/g, '' + date.getFullYear());
	format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
	format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
	format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
	format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
	format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
	format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
	return format;
};

/*
// 「MM-dd HH:mm」形式の文字列をパースする
const parseDerepoDate = (dateString: string): Date | null => {
	const pattern = /([0-9]+)-([0-9]+) ([0-9]+):([0-9]+)/;
	if (!pattern.test(dateString)) {
		return null;
	}
	const matches = dateString.match(pattern);
	if (matches === null || matches.length < 5) {
		return null;
	}
	return new Date(
		2018,
		parseInt(matches[1], 10) - 1,
		parseInt(matches[2], 10),
		parseInt(matches[3], 10),
		parseInt(matches[4], 10)
	);
};

// 選択した時刻に、0～29分まで加算した日付を返す
const addRandomMinute = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setMinutes(newDate.getMinutes() + Math.floor(Math.random() * 30));
	return newDate;
}

// 選択した時刻に、0～29分まで減算した日付を返す
const subRandomMinute = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setMinutes(newDate.getMinutes() - Math.floor(Math.random() * 30));
	return newDate;
}
*/

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
	const onChangeFavs = (event: React.FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		if (typeof value === 'string') {
			config.setFavs(value);
		}
	}

	// 時刻が変更した際の処理
	const onChangeDatetime = (event: React.FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		if (typeof value === 'string') {
			config.setDatetime(value);
		}
	}

	// 自分がファボるかを切り替える
	const onClickMyFav = () => {
		config.setMyFavFlg(!config.myFavFlg);
	}

	// ファボ数をランダムに決定する
	const setRandomFavs = () => {
		const favs = Math.floor(Math.random() * 10001);
		if (favs === 10000) {
			config.setFavs('9999+');
		} else {
			config.setFavs('' + favs);
		}
	}

	/**
	 * タイムスタンプを適当に決定する
	 * ・最初の1個の場合、現在日付とする
	 * ・そうでなく、かつどのおはなしも選択されていない場合、末尾に合う日付とする
	 *   (末尾から1～30分以内)
	 * ・どれかのおはなしが選択されていた場合、上と下を見て『間に差し込めるように』決定する
	 *   (差し込めない場合、上の日付+1分とする)
	 */
	const setRandomDatetimes = () => {
		config.setDatetime(formatDate(new Date(), 'MM-dd HH:mm'));
	}

	return (
		<>
			<FormGroup>
				<FormLabel>ファボ数</FormLabel>
				<Button className="p-1 ml-2 mb-2" variant="secondary" onClick={setRandomFavs}>ランダム</Button>
				<FormControl value={config.favs} onChange={onChangeFavs} />
			</FormGroup>
			<FormGroup>
				<FormLabel>時刻</FormLabel>
				<Button className="p-1 ml-2 mb-2" variant="secondary" onClick={setRandomDatetimes}>自動決定</Button>
				<FormControl value={config.datetime} onChange={onChangeDatetime} />
			</FormGroup>
			<FormGroup>
				<FormCheck type='checkbox' label='ファボる' defaultChecked={config.myFavFlg} onClick={onClickMyFav} />
			</FormGroup>
		</>
	);
}

export default DerepoForm;
