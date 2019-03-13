import * as React from 'react';
import { ConfigContext } from 'src/context';
import '../css/IdolTalkList.css';
import ViewComponent from './ViewComponent';

const IdolTalkList: React.FC<{className?: string}> = ({className = ""}) => {
	const config = React.useContext(ConfigContext);
	if (config === null) {
		return (<></>);
	}
	if (config.idolTalkList.length === 0) {
		return (<></>);
	}

	if (config.talkType === 'おはなし') {
		return (<div className={`border p-3 ${className}`}>
			{config.idolTalkList.map((idolTalk, i) => (
					<ViewComponent key={i} talkType={config.talkType} talkData={idolTalk}
						firstFlg={i === 0}/>
				))
			}
		</div>);
	} else {
		return (<div className={`border p-3 ${className}`}>
			<div className='border p-3 d-inline-block derepo'>
				{config.idolTalkList.map((idolTalk, i) => (
						<ViewComponent key={i} talkType={config.talkType} talkData={idolTalk}
							firstFlg={i === 0}/>
					))
				}
			</div>
		</div>);
	}

}

export default IdolTalkList;
