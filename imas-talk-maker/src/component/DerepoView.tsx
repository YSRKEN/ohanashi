import * as React from 'react';
import { ITalkData } from 'src/constant';
import '../DerepoView.css';

const frameClass = (firstFlg: boolean) => {
	if (firstFlg) {
		return 'position-relative derepo-block-first';
	} else {
		return 'position-relative derepo-block';
	}
}

const DerepoView: React.FC<{ talkData: ITalkData, firstFlg: boolean }> = ({ talkData, firstFlg }) => {
	const divRef = React.useRef<HTMLDivElement>(null);
	const [overallCss1, setOverallCss1] = React.useState<{}>({});
	const [overallCss2, setOverallCss2] = React.useState<{}>({});
	const [fontCss1, setFontCss1] = React.useState<{}>({});
	const [fontCss2, setFontCss2] = React.useState<{}>({});
	const [fontCss3, setFontCss3] = React.useState<{}>({});
	const [borderRadiusCss, setBorderRadiusCss] = React.useState<{}>({});

	React.useEffect(() => {
		if (divRef.current === null) {
			setOverallCss1({
				height: (firstFlg ? 92 : 95),
				width: 382
			});
			setOverallCss2({
				height: 92,
				width: 382
			});
			setFontCss1({
				fontSize: 14
			});
			setFontCss2({
				color: (talkData.myFavFlg ? '#FDCD08' : ''),
				fontSize: 28
			});
			setFontCss3({
				fontSize: 14,
				left: 350 - talkData.favs.length * 7 / 2
			});
			setBorderRadiusCss({
				borderRadius: 7
			});
			return;
		}
		const width = divRef.current.offsetWidth;
		setOverallCss1({
			height: width * (firstFlg ? 92 : 95) / 382,
			"width": width
		});
		setOverallCss2({
			height: width * 92 / 382,
			"width": width
		});
		setFontCss1({
			fontSize: width * 14 / 382
		});
		setFontCss2({
			color: (talkData.myFavFlg ? '#FDCD08' : ''),
			fontSize: width * 28 / 382
		});
		setFontCss3({
			fontSize: width * 14 / 382,
			left: width * (350 - talkData.favs.length * 7 / 2) / 382
		});
		setBorderRadiusCss({
			borderRadius: width * 7 / 382
		});
	});

	return (
		<div style={overallCss1}>
			<div ref={divRef} className={frameClass(firstFlg)} style={overallCss2}>
				<img className="position-absolute derepo-face" src={talkData.url}/>
				<div className="position-absolute derepo-name" style={fontCss1}>{talkData.name}</div>
				<div className="position-absolute derepo-message" style={fontCss1}>{talkData.message}</div>
				<div className="position-absolute derepo-fav-star" style={fontCss2}>★</div>
				<div className="position-absolute derepo-fav-button" style={borderRadiusCss}/>
				<div className="position-absolute derepo-favs" style={fontCss3}>{talkData.favs}</div>
				<div className='position-absolute derepo-date' style={fontCss1}>{talkData.datetime}</div>
			</div>
		</div>
	);
}

export default DerepoView;
