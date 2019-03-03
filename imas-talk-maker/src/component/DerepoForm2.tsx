import * as React from 'react';
import { ITalkData } from 'src/constant';

const DerepoView2: React.FC<{ talkData: ITalkData, firstFlg: boolean }> = ({ talkData, firstFlg }) => {
	return (
		<div className='position-relative'>
			{talkData.name}<br/>
			{talkData.message}<br/>
			{talkData.url}<br/>
			{'' + talkData.myFavFlg}<br/>
			{talkData.favs}<br/>
			{talkData.datetime}<br/>
			{'' + firstFlg}<br/>
		</div>
	);
}

export default DerepoView2;
