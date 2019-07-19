import * as React from 'react';
import { ITalkData } from 'src/constant';
import '../css/DerepoView.css';

const DoubleDerepoView: React.FC<{ talkData: ITalkData, firstFlg?: boolean }> = ({ talkData, firstFlg = false }) => {
	// 外側のdivの参照
	const overallRef = React.useRef<HTMLDivElement>(null);
	// メッセージの参照
	const messageRef = React.useRef<HTMLDivElement>(null);
	// 外側のdivのCSS
	const [overallCss, setOverallCss] = React.useState<{}>({});
	// アイコンのCSS
	const [iconCss, setIconCss] = React.useState<{}>({});
	const [iconCss2, setIconCss2] = React.useState<{}>({});
	// 名前のCSS
	const [nameCss, setNameCss] = React.useState<{}>({});
	// メッセージのCSS
	const [messageCss, setMessageCss] = React.useState<{}>({});
	// 星ブロックのCSS
	const [starBaseCss, setStarBaseCss] = React.useState<{}>({});
	// 星のCSS
	const [starCss, setStarCss] = React.useState<{}>({});
	// ファボ数のCSS
	const [favsCss, setFavsCss] = React.useState<{}>({});
	// 日時のCSS
	const [datetimeCss, setDatetimeCss] = React.useState<{}>({});

	// 初期化時の処理
	React.useEffect(() => {
		// 外側のdivの参照を読み込めていない場合の処理
		if (overallRef.current === null || messageRef.current === null) {
			return;
		}

		// 横幅を取得
		const overallWidth = overallRef.current.offsetWidth;

		// メッセージ欄の下端を取得
		const messageBottom = messageRef.current.offsetTop + messageRef.current.offsetHeight;

		// 仮想ピクセルの大きさを計算
		const calc = (px: number) => Math.round(px * overallWidth / 382);

		// CSSを計算する
		if (firstFlg) {
			setOverallCss({
				borderBottomColor: '#808080',
				borderBottomStyle: 'dotted',
				borderBottomWidth: 1,
				height: Math.max(calc(85), messageBottom + 25),
				marginTop: calc(11),
				width: overallWidth
			});
		} else {
			setOverallCss({
				height: Math.max(calc(76), messageBottom + 25),
				marginTop: calc(11),
				width: overallWidth
			});
		}
		setIconCss({ height: calc(35), top: calc(1), width: calc(35) });
		setIconCss2({ height: calc(35), top: calc(1+35+4), width: calc(35) });
		setNameCss({ fontSize: calc(13), left: calc(48) });
		setMessageCss({ fontSize: calc(13), left: calc(48), top: calc(20), width: calc(13*17) });
		setStarBaseCss({ borderRadius: calc(7), height: calc(46), left: calc(333),
			top: calc(5), width: calc(46) });
		setStarCss({ color: (talkData.myFavFlg ? '#FDCD08' : ''),
			fontSize: calc(29), left: calc(342), top: calc(2) });
		setFavsCss({ fontSize: calc(12), left: calc(355-talkData.favs.length * 8 / 2), top: calc(33) });
		if (firstFlg) {
			setDatetimeCss({ fontSize: calc(12), left: calc(305), top: Math.max(calc(55), messageBottom - 5) });
		} else {
			setDatetimeCss({ fontSize: calc(12), left: calc(305), top: Math.max(calc(55), messageBottom + 5) });
		}
	}, [talkData]);

	return (
		<div ref={overallRef} className='position-relative' style={overallCss}>
			<img src={talkData.url} className='position-absolute' style={iconCss} crossOrigin="anonymous"/>
			<img src={talkData.url2} className='position-absolute' style={iconCss2} crossOrigin="anonymous"/>
			<span className='position-absolute name' style={nameCss}>{talkData.name}</span>
			<span ref={messageRef} className='position-absolute message' style={messageCss}>{talkData.message}</span>
			<span className='position-absolute star-base' style={starBaseCss}/>
			<span className='position-absolute star' style={starCss}>★</span>
			<span className='position-absolute favs' style={favsCss}>{talkData.favs}</span>
			<span className='position-absolute datetime' style={datetimeCss}>{talkData.datetime}</span>
		</div>
	);
}

// 2行まで：382x85px
// 3行：382x98px
// 横方向の文字数(全角)：18文字
// 字のサイズ：13～14px？
// 行間隔：間は1px程度？

export default DoubleDerepoView;
