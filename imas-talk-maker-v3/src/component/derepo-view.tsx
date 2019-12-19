import React, { useRef, useEffect } from 'react';
import { DerepoData } from 'constant/type';

// ロゴの縦幅
const DEREPO_LOGO_HEIGHT = 16;

// 描画メソッド
const drawMethodImpl = async (canvas: CanvasRenderingContext2D, width: number, height: number, dataList: DerepoData[], showLogoFlg: boolean) => {
	// 仮決め
	canvas.fillRect(0, 0, width, height);
}

const DerepoView: React.FC<{
	dataList: DerepoData[];
	setDownloadLink?: (val: string) => void;
	showLogoFlg?: boolean;
	onClick?: (val: number) => void;
}> = ({ dataList, setDownloadLink = () => { }, showLogoFlg = false, onClick = () => { } }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// 仮決め
	const derepoWidth = 500;
	const derepoHeight = 100;

  // 描画に必要なコンテキストが得られたなら描画を行う
  useEffect(() => {
    const drawMethod = async () => {
      // 描画できない際は飛ばす
      if (dataList.length === 0) {
        return;
      }
      const canvas = canvasRef.current;
      if (canvas === null) {
        return;
      }

      // 描画を実施
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      const context = canvas.getContext('2d');
      const offscreenCanvasContext = offscreenCanvas.getContext('2d');
      if (context !== null && offscreenCanvasContext !== null) {
        await drawMethodImpl(offscreenCanvasContext, offscreenCanvas.width, offscreenCanvas.height, dataList, showLogoFlg);
        context.drawImage(offscreenCanvas, 0, 0);
        setDownloadLink(canvas.toDataURL());
      }
    };
    drawMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, dataList]);

	// クリック時の処理
	const onClickCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const y = e.clientY - rect.top;
		const yPos = Math.floor((1.0 * y) / derepoHeight);
		if (yPos >= dataList.length) {
			onClick(-1);
		} else {
			onClick(yPos);
		}
	};

	return (
		<canvas
			ref={canvasRef}
			width={derepoWidth}
			height={derepoHeight * dataList.length + (showLogoFlg ? DEREPO_LOGO_HEIGHT + 2 : 0)}
			onClick={onClickCanvas}
		/>
	);
};

export default DerepoView;
