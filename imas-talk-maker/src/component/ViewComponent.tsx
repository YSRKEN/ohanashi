import * as React from 'react';
import { ITalkData, TalkType } from 'src/constant';
import DerepoView from './DerepoView';
import DoubleDerepoView from './DoubleDerepoView';
import DoubleOhanashiView from './DoubleOhanashiView';
import OhanashiView from './OhanashiView';

// プレビュー表示部分
export const ViewComponent: React.FC<{
	talkType: TalkType,
	talkData: ITalkData,
	firstFlg?: boolean,
}> = ({talkType, talkData, firstFlg = false}) => {
	if (talkType === 'おはなし') {
		return (<div className="talk-list">
			{talkData.secondIconFlg
				? <DoubleOhanashiView talkData={talkData}/>
				: <OhanashiView talkData={talkData}/>}
		</div>);
	} else {
		return (<div className="derepo-list">
			{talkData.secondIconFlg
				? <DoubleDerepoView talkData={talkData} firstFlg={firstFlg}/>
				: <DerepoView talkData={talkData} firstFlg={firstFlg}/>}
		</div>);
	}
};

export default ViewComponent;
