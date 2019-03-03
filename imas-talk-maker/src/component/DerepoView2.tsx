import * as React from 'react';
import { ITalkData } from 'src/constant';
import '../css/DerepoView2.css';

const DerepoView2: React.FC<{ talkData: ITalkData, firstFlg: boolean }> = ({ talkData, firstFlg }) => {
	// 外側のdivの参照
	const overallRef = React.useRef<HTMLDivElement>(null);
	// 外側のdivのCSS
	const [overallCss, setOverallCss] = React.useState<{}>({});
	// アイコンのCSS
	const [iconCss, setIconCss] = React.useState<{}>({});
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

	// 初期化時の処理
	React.useEffect(() => {
		// 外側のdivの参照を読み込めていない場合の処理
		if (overallRef.current === null) {
			return;
		}

		// 横幅を取得
		const overallWidth = overallRef.current.offsetWidth;

		// 仮想ピクセルの大きさを計算
		const calc = (px: number) => Math.round(px * overallWidth / 382);

		// CSSを計算する
		setOverallCss({ height: calc(85), width: overallWidth });
		setIconCss({ height: calc(42), top: calc(1), width: calc(42) });
		setNameCss({ fontSize: calc(13), left: calc(48) });
		setMessageCss({ fontSize: calc(13), left: calc(48), top: calc(20) });
		setStarBaseCss({ borderRadius: calc(7), height: calc(46), left: calc(333),
			top: calc(5), width: calc(46) });
		setStarCss({ color: (talkData.myFavFlg ? '#FDCD08' : ''),
			fontSize: calc(29), left: calc(342), top: calc(2) });
		setFavsCss({ fontSize: calc(12), left: calc(355-talkData.favs.length * 8 / 2), top: calc(33) });
	});

	return (
		<div ref={overallRef} className='position-relative' style={overallCss}>
			<img src={talkData.url} className='position-absolute' style={iconCss}/>
			<span className='position-absolute name' style={nameCss}>{talkData.name}</span>
			<span className='position-absolute message' style={messageCss}>{talkData.message}</span>
			<span className='position-absolute star-base' style={starBaseCss}/>
			<span className='position-absolute star' style={starCss}>★</span>
			<span className='position-absolute favs' style={favsCss}>{talkData.favs}</span>
		</div>
	);
}

// 2行まで：382x85px
// 3行：382x98px
// 横方向の文字数(全角)：18文字
// 字のサイズ：13～14px？
// 行間隔：間は1px程度？

export default DerepoView2;
