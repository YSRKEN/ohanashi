import React, { useRef, useEffect, useState } from 'react';
import { DerepoData } from 'constant/type';

// デレぽの大きさ
const DEREPO_WIDTH = 624;             // 全体の横幅
const DEREPO_HEIGHT = 128;            // n～n+1件目(n≧2)の縦間隔
const DEREPO_SEPARATOR_HEIGHT = 11;   // 1～2軒件目の間にある仕切りの高さ(仕切りは下線)
const DEREPO_HEADER_SPACE = 7;        // 上側のスペース
const DEREPO_HOOTER_SPACE = 26;       // 下側のスペース
const DEREPO_ARC_SIZE = 8;            // 角丸の大きさ
// ロゴの縦幅
const DEREPO_LOGO_HEIGHT = 24;

// 描画メソッド
const drawMethodImpl = (data: DerepoData) => {
  const canvas = document.createElement('canvas');
  canvas.width = DEREPO_WIDTH;
  canvas.height = DEREPO_HEIGHT;
  const context = canvas.getContext('2d');
  if (context !== null) {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'gray';
    context.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
    context.save();
  }
  return canvas;
};

const DerepoView: React.FC<{
	dataList: DerepoData[];
	setDownloadLink?: (val: string) => void;
	showLogoFlg?: boolean;
	onClick?: (val: number) => void;
}> = ({ dataList, setDownloadLink = () => { }, showLogoFlg = false, onClick = () => { } }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

  const [heightList, setHeightList] = useState<number[]>([]);

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

      // 各要素を描画する
      const messageCanvasList = dataList.map(record => drawMethodImpl(record));

      // 各要素を統合して1つの大きな要素とする
      // widthは最大値、heightは総和となることに注意
      canvas.width = Math.max(...messageCanvasList.map(c => c.width));
      if (messageCanvasList.length === 1) {
        canvas.height = messageCanvasList.map(c => c.height).reduce((p, c) => p + c) + DEREPO_HEADER_SPACE + DEREPO_HOOTER_SPACE + DEREPO_LOGO_HEIGHT;
      } else {
        canvas.height = messageCanvasList.map(c => c.height).reduce((p, c) => p + c) + DEREPO_HEADER_SPACE + DEREPO_SEPARATOR_HEIGHT + DEREPO_HOOTER_SPACE + DEREPO_LOGO_HEIGHT;
      }
      const context = canvas.getContext('2d');
      if (context !== null) {
        // 背景の塗り
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // 実際の結合処理(左上座標＝yPos)
        // ついでに各要素の高さ情報(heightList)を更新しておく
        let yPos = DEREPO_HEADER_SPACE;
        const heightListTemp: number[] = [];
        for (const messageCanvas of messageCanvasList) {
          context.drawImage(messageCanvas, 0, yPos);
          if (yPos === DEREPO_HEADER_SPACE && messageCanvasList.length > 1) {
            yPos += messageCanvas.height + DEREPO_SEPARATOR_HEIGHT;
          } else {
            yPos += messageCanvas.height;
          }
          heightListTemp.push(messageCanvas.height);
        }
        setHeightList(heightListTemp);

        // 罫線を描画する
        if (messageCanvasList.length > 1) {
          context.strokeStyle = 'black';
          context.beginPath();
          context.setLineDash([2, 2]);
          context.moveTo(25, DEREPO_HEADER_SPACE + messageCanvasList[0].height);
          context.lineTo(canvas.width - 25, DEREPO_HEADER_SPACE + messageCanvasList[0].height);
          context.stroke();
          context.setLineDash([]);
        }

        // 外枠を描画する
        context.strokeStyle = 'gray';
        context.beginPath();
        context.arc(DEREPO_ARC_SIZE, DEREPO_ARC_SIZE, DEREPO_ARC_SIZE, - Math.PI, - 0.5 * Math.PI, false);
        context.arc(DEREPO_WIDTH - DEREPO_ARC_SIZE, DEREPO_ARC_SIZE, DEREPO_ARC_SIZE, - 0.5 * Math.PI, 0, false);
        context.arc(DEREPO_WIDTH - DEREPO_ARC_SIZE, canvas.height - DEREPO_LOGO_HEIGHT - DEREPO_ARC_SIZE, DEREPO_ARC_SIZE, 0, 0.5 * Math.PI, false);
        context.arc(DEREPO_ARC_SIZE, canvas.height - DEREPO_LOGO_HEIGHT - DEREPO_ARC_SIZE, DEREPO_ARC_SIZE, 0.5 * Math.PI, Math.PI, false);
        context.stroke();

        // ロゴを描画する
        if (showLogoFlg) {
          context.fillStyle = 'black';
          context.font = `${0.8 * DEREPO_LOGO_HEIGHT}px Noto Sans JP`;
          context.fillText('アイマス会話メーカーv3', DEREPO_WIDTH - DEREPO_LOGO_HEIGHT * 12 * 0.8, canvas.height - 3, DEREPO_WIDTH);
        }
        context.save();

        // ダウンロードリンクを生成する
        setDownloadLink(canvas.toDataURL());
      }
    };
    drawMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, dataList]);

	// クリック時の処理
	const onClickCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Canvasに対する縦のクリック位置をyとする
		const rect = e.currentTarget.getBoundingClientRect();
		const y = e.clientY - rect.top;
    let yPos = dataList.length;

    // 指定したデレぽ枠において、yのY座標がsum～sum + messageHeight - 1の間なら、
    // その範囲をクリック範囲(インデックス番号=count)と判断する
    let sum = 0;
    let count = 0;
    for (const messageHeight of heightList) {
      if (y >= sum && y < sum + messageHeight) {
        yPos = count;
        break;
      }
      count += 1;
      sum += messageHeight;
    }

		if (yPos >= dataList.length) {
			onClick(-1);
		} else {
			onClick(yPos);
		}
	};

	return (
		<canvas
			ref={canvasRef}
			onClick={onClickCanvas}
		/>
	);
};

export default DerepoView;
