import * as React from 'react';
import { ConfigContext } from 'src/context';
import ViewComponent from './ViewComponent';

const IdolTalkList: React.FC<{className?: string}> = ({className = ""}) => {
	const config = React.useContext(ConfigContext);
	if (config === null) {
		return (<></>);
	}
	if (config.idolTalkList.length === 0) {
		return (<></>);
	}

	return (<div className={`border p-3 ${className}`}>
		{config.idolTalkList.map((idolTalk, i) => (
				<ViewComponent key={i} talkType={config.talkType} talkData={idolTalk}
					firstFlg={i === 0}/>
			))
		}
	</div>);
}

export default IdolTalkList;
