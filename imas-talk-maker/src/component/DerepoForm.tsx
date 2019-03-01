import * as React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { TalkType } from 'src/constant';

// デレぽモード時のみ表示されるフォーム
const DerepoForm: React.FC<{ talkType: TalkType }> = ({ talkType }) => {
	if (talkType !== 'デレぽ') {
		return (<></>);
	}

	return (
		<>
			<FormGroup>
				<FormLabel>ファボ数</FormLabel>
				<FormControl />
			</FormGroup>
			<FormGroup>
				<FormLabel>時刻</FormLabel>
				<FormControl />
			</FormGroup>
		</>
	);
}

export default DerepoForm;
