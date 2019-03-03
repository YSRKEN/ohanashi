import * as React from 'react';
import { ITalkData } from 'src/constant';
import '../DerepoView.css';

const frameClass = (firstFlg: boolean) => {
	if (firstFlg) {
		return 'derepo-block-first';
	} else {
		return '';
	}
}

const DerepoView: React.FC<{ talkData: ITalkData, firstFlg: boolean }> = ({ talkData, firstFlg }) => {
	const overallRef = React.useRef<HTMLDivElement>(null);
	const messageRef = React.useRef<HTMLDivElement>(null);
	const [overallCss1, setOverallCss1] = React.useState<{}>({});
	const [overallCss2, setOverallCss2] = React.useState<{}>({});
	const [nameCss, setNameCss] = React.useState<{}>({});
	const [messageCss, setMessageCss] = React.useState<{}>({});
	const [favStarCss, setFavStarCss] = React.useState<{}>({});
	const [favsCss, setFavsCss] = React.useState<{}>({});
	const [borderRadiusCss, setBorderRadiusCss] = React.useState<{}>({});
	const [datetimeCss, setDatetimeCss] = React.useState<{}>({});

	React.useEffect(() => {
		if (overallRef.current === null || messageRef.current === null) {
			return;
		}
		const overallWidth = overallRef.current.offsetWidth;
		const messageHeight = messageRef.current.offsetHeight;
		const fixedPixel = overallWidth / 382;
		setOverallCss1({
			height: Math.max(fixedPixel * (firstFlg ? 57 : 75), messageHeight + fixedPixel * (firstFlg ? 48 : 58)),
			"width": overallWidth
		});
		setOverallCss2({
			height: fixedPixel * 92,
			"width": overallWidth
		});
		setNameCss({
			fontSize: fixedPixel * 13
		});
		setMessageCss({
			fontSize: fixedPixel * 13
		});
		setFavStarCss({
			color: (talkData.myFavFlg ? '#FDCD08' : ''),
			fontSize: fixedPixel * 28
		});
		setFavsCss({
			fontSize: fixedPixel * 12,
			left: fixedPixel * (347 - talkData.favs.length * 6 / 2)
		});
		setBorderRadiusCss({
			borderRadius: fixedPixel * 7
		});
		setDatetimeCss({
			fontSize: fixedPixel * 14,
			top: Math.max(fixedPixel * 63, messageHeight + fixedPixel * 25)
		});
	});

	return (
		<div style={overallCss1} className={frameClass(firstFlg)}>
			<div ref={overallRef} className='position-relative derepo-block' style={overallCss2}>
				<img className="position-absolute derepo-face" src={talkData.url}/>
				<div className="position-absolute derepo-name" style={nameCss}>{talkData.name}</div>
				<div ref={messageRef} className="position-absolute derepo-message" style={messageCss}>{talkData.message}</div>
				<div className="position-absolute derepo-fav-star" style={favStarCss}>★</div>
				<div className="position-absolute derepo-fav-button" style={borderRadiusCss}/>
				<div className="position-absolute derepo-favs" style={favsCss}>{talkData.favs}</div>
				<div className='position-absolute derepo-date' style={datetimeCss}>{talkData.datetime}</div>
			</div>
		</div>
	);
}

export default DerepoView;
