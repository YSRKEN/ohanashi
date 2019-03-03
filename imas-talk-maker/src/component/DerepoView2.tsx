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

// 2行まで：382x85px
// 3行：382x98px
// 横方向の文字数(全角)：18文字
// 字のサイズ：13～14px？
// 行間隔：間は1px程度？


export default DerepoView2;
