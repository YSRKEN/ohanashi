import * as React from 'react';
import { ITalkData } from 'src/constant';
import '../OhanashiView.css';

const OhanashiView: React.FC<{ talkData: ITalkData }> = ({ talkData }) => {
	return (
		<div className='talk-list bg-default'>
			<div className="talk-block position-relative">
				<img className="talk-face position-absolute" src={talkData.url} />
				<div className="talk-balloon position-absolute">
					<p className="talk-name position-absolute">{talkData.name}</p>
					<pre className="talk-message position-absolute">{talkData.message}</pre>
				</div>
			</div>
		</div>
	);
}

export default OhanashiView;
