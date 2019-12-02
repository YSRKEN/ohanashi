import * as html2canvas from "html2canvas";
import * as React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';
import { ConfigContext, IConfig } from 'src/context';
import ViewComponent from './ViewComponent';

const OhanashiPreviewTalkForm = (config: IConfig) => {
	return (
		<div id="capture" style={{ 'width': 320 }}>{
			config.idolTalkList.map((idolTalk, i) => (
				<div key={i}>
					<div draggable={true} id={`from-${i}`}>
						<ViewComponent talkType={config.talkType} talkData={idolTalk}
							firstFlg={i === 0} />
					</div>
				</div>
			))
		}
			<div className="talk-list" style={{
				backgroundColor: '#262626', color: 'white', fontSize: 14, fontWeight: 'bold',
				height: (14 + 3 * 4), paddingRight: 10, paddingTop: 3, textAlign: 'right'
			}}>
				使用アプリ：アイマス会話メーカー
			</div>
		</div>);
};

const DerepoPreviewTalkForm = (config: IConfig) => {
	return (
		<div id="capture" className='border p-3 d-inline-block derepo2'>
			<div id={`to-0`} style={{ height: 10 }} />
			{
				config.idolTalkList.map((idolTalk, i) => (
					<div key={i}>
						<div draggable={true} id={`from-${i}`}>
							<ViewComponent talkType={config.talkType} talkData={idolTalk}
								firstFlg={i === 0} />
						</div>
					</div>
				))
			}
		</div>
	);
};

const PreviewTalkForm: React.FC<{ className?: string }> = ({ className = "" }) => {
	const config = React.useContext(ConfigContext);
	if (config === null) {
		return (<></>);
	}

	// 戻るボタンを押した際の処理
	const onClickBackButton = () => {
		config.setViewType('InputTalk');
	}

	/**
	 * Base64をblobに変換する
	 * @param base64 Base64
	 */
	const Base64toBlob = (base64: any) => {
		const tmp = base64.split(',');
		const data = atob(tmp[1]);
		const mime = tmp[0].split(':')[1].split(';')[0];
		const buf = new Uint8Array(data.length);
		for (let i = 0; i < data.length; i++) {
			buf[i] = data.charCodeAt(i);
		}
		return new Blob([buf], { type: mime });
	}

	/**
	 * blobを保存する
	 * @param blob 
	 */
	const saveBlob = (blob: Blob, fileName: string) => {
		const url = window.URL;
		const dataUrl = url.createObjectURL(blob);
		const event = document.createEvent("MouseEvents");
		event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		const a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
		(a as HTMLAnchorElement).href = dataUrl;
		(a as HTMLAnchorElement).download = fileName;
		a.dispatchEvent(event);
	}

	/**
	 * 画像保存処理
	 */
	const saveImage = () => {
		const elem: HTMLElement | null = document.querySelector("#capture");
		if (elem === null) {
			return;
		} else {
			html2canvas(elem, {
				allowTaint: true,
				useCORS: true,
			}).then((canvas: any) => {
				// Base64データに変換
				const base64 = canvas.toDataURL();

				// blobに変換
				const blob = Base64toBlob(base64);

				// ファイルの保存イベントを走らせる
				saveBlob(blob, "ohanashi.png");
			});
		}
	}

	return (<div className={className}>
		<Form>
			<Button className="w-100 my-3" variant="primary" onClick={onClickBackButton}>メイン画面に戻る</Button>
		</Form>
		{
			config.talkType === 'おはなし' ? OhanashiPreviewTalkForm(config) : DerepoPreviewTalkForm(config)
		}
		<Form>
			<Button className="w-100 my-3" variant="primary" onClick={saveImage}>画像として保存(※)</Button>
		</Form>
		<p><strong>※……Webブラウザの仕様により、iOSでは画像保存ボタンが効かないことがあります</strong></p>
	</div>);
};

export default PreviewTalkForm;
