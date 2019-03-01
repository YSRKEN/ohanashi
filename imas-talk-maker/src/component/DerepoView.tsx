import * as React from 'react';
import { ITalkData } from 'src/constant';
import '../DerepoView.css';

const frameClass = (firstFlg: boolean) => {
	if (firstFlg) {
		return 'position-relative derepo-block-first';
	} else {
		return 'position-relative derepo-block';
	}
}

const dateTimeClass = (firstFlg: boolean) => {
	if (firstFlg) {
		return 'position-absolute derepo-date-first';
	} else {
		return 'position-absolute derepo-date';
	}
}

const favLeftStyle = (favs: string) => {
	return {
		left: 350 - favs.length * 7 / 2
	}
}

const favStarStyle = (myFavFlg: boolean) => {
	return {
		color: (myFavFlg ? '#FDCD08' : '')
	}
}

const DerepoView: React.FC<{ talkData: ITalkData, firstFlg: boolean }> = ({ talkData, firstFlg }) => {
	return (
		<div className={frameClass(firstFlg)}>
			<img className="derepo-face position-absolute" src={talkData.url}/>
			<div className="derepo-name position-absolute">{talkData.name}</div>
			<div className="derepo-message position-absolute">{talkData.message}</div>
			<div className="derepo-fav-star position-absolute" style={favStarStyle(talkData.myFavFlg)}>★</div>
			<div className="derepo-fav-button position-absolute"/>
			<div className="derepo-favs position-absolute" style={favLeftStyle(talkData.favs)}>{talkData.favs}</div>
			<div className={dateTimeClass(firstFlg)}>{talkData.datetime}</div>
		</div>
	);
}

export default DerepoView;
