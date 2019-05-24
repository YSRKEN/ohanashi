import * as React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import { ConfigContext, IConfig } from 'src/context';
import ViewComponent from './ViewComponent';

const OhanashiPreviewTalkForm = (config: IConfig) => {
	return (<>{
		config.idolTalkList.map((idolTalk, i) => (
		<div key={i}>
			<div draggable={true} id={`from-${i}`} style={{'width': 320}}>
				<ViewComponent talkType={config.talkType} talkData={idolTalk}
					firstFlg={i === 0}/>
			</div>
		</div>
		))
	}</>);
};

const DerepoPreviewTalkForm = (config: IConfig) => {
	return (
		<div className='border p-3 d-inline-block derepo2'>
			<div id={`to-0`} style={{height: 10}}/>
				{
					config.idolTalkList.map((idolTalk, i) => (
					<div key={i}>
						<div draggable={true} id={`from-${i}`}>
							<ViewComponent talkType={config.talkType} talkData={idolTalk}
								firstFlg={i === 0}/>
						</div>
					</div>
					))
				}
		</div>
	);
};

const PreviewTalkForm: React.FC<{ className?: string }> = ({className = ""}) => {
	const config = React.useContext(ConfigContext);
	if (config === null) {
	  return (<></>);
	}
  
	// 戻るボタンを押した際の処理
	const onClickBackButton = () => {
	  config.setViewType('InputTalk');
	}

	return (<div className={className}>
		<Form>
			<Button className="w-100 my-3" variant="primary" onClick={onClickBackButton}>メイン画面に戻る</Button>
		</Form>
		{
			config.talkType === 'おはなし' ? OhanashiPreviewTalkForm(config) : DerepoPreviewTalkForm(config)
		}
	</div>);
};

export default PreviewTalkForm;
