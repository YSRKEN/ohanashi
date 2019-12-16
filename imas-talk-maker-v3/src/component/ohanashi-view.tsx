import React, { useRef, useEffect } from 'react';
import { loadImage, fillTextEx } from 'service/utility';
import { OhanashiData } from 'constant/type';

// 「おはなし」の大きさ
const OHANASHI_WIDTH = 320;
const OHANASHI_HEIGHT = 84;

// アイコンサイズ
const ICON_SIZE = 76;

// ロゴの縦幅
const OHANASHI_LOGO_HEIGHT = 16;

// 背景を描画する
const drawBgImage = (
  canvas: CanvasRenderingContext2D,
  image: HTMLImageElement,
  di: number
) => {
  canvas.drawImage(
    image,
    0,
    0,
    OHANASHI_WIDTH,
    OHANASHI_HEIGHT,
    0,
    OHANASHI_HEIGHT * di,
    OHANASHI_WIDTH,
    OHANASHI_HEIGHT
  );
};

// 文字を描画する
const drawText = (
  canvas: CanvasRenderingContext2D,
  name: string,
  message: string,
  di: number,
  nameX: number,
  nameWidth: number,
  messageX: number,
  messageWidth: number
) => {
  // 名前部分を描画
  canvas.fillStyle = '#f33281';
  canvas.fillText(name, nameX, OHANASHI_HEIGHT * di + 8, nameWidth);

  // メッセージ部分を描画
  canvas.fillStyle = 'black';
  fillTextEx(
    canvas,
    message,
    messageX,
    OHANASHI_HEIGHT * di + 23,
    17.5,
    messageWidth
  );
};

// 描画メソッド
const drawMethodImpl = async (
  canvas: CanvasRenderingContext2D,
  dataList: OhanashiData[],
  showLogoFlg: boolean
) => {
  // 描画用の画像を読み込む
  const bgImage = await loadImage('./asset/background.png');
  const balloon1 = await loadImage('./asset/balloon1.png');
  const balloon2 = await loadImage('./asset/balloon2.png');
  const balloon3 = await loadImage('./asset/balloon3.png');
  const balloon4 = await loadImage('./asset/balloon4.png');

  // 描画を行う
  for (let di = 0; di < dataList.length; di += 1) {
    // 背景の描画
    drawBgImage(canvas, bgImage, di);

    // 会話枠の描画
    switch (dataList[di].messageMode) {
      case 'normal':
        drawBgImage(canvas, balloon1, di);
        break;
      case 'reverse':
        drawBgImage(canvas, balloon2, di);
        break;
      case 'double':
        drawBgImage(canvas, balloon3, di);
        break;
      case 'message-only':
        drawBgImage(canvas, balloon4, di);
        break;
      default:
        // dataList[di].messageMode === 'quartet'の場合、会話枠は描画しない
        break;
    }

    // アイコンの描画
    switch (dataList[di].messageMode) {
      case 'normal': {
        const iconImage = await loadImage(
          `./asset/${dataList[di].iconUrls[0]}`
        );
        canvas.drawImage(
          iconImage,
          0,
          0,
          iconImage.width,
          iconImage.height,
          5,
          OHANASHI_HEIGHT * di + 4,
          ICON_SIZE,
          ICON_SIZE
        );
        break;
      }
      case 'reverse': {
        const iconImage = await loadImage(
          `./asset/${dataList[di].iconUrls[0]}`
        );
        canvas.drawImage(
          iconImage,
          0,
          0,
          iconImage.width,
          iconImage.height,
          OHANASHI_WIDTH - 5 - ICON_SIZE,
          OHANASHI_HEIGHT * di + 4,
          ICON_SIZE,
          ICON_SIZE
        );
        break;
      }
      case 'double': {
        const iconImage1 = await loadImage(
          `./asset/${dataList[di].iconUrls[0]}`
        );
        const iconImage2 = await loadImage(
          `./asset/${dataList[di].iconUrls[1]}`
        );
        canvas.drawImage(
          iconImage1,
          0,
          0,
          iconImage1.width,
          iconImage1.height,
          5,
          OHANASHI_HEIGHT * di + 4,
          ICON_SIZE,
          ICON_SIZE
        );
        canvas.drawImage(
          iconImage2,
          0,
          0,
          iconImage2.width,
          iconImage2.height,
          OHANASHI_WIDTH - 5 - ICON_SIZE,
          OHANASHI_HEIGHT * di + 4,
          ICON_SIZE,
          ICON_SIZE
        );
        break;
      }
      case 'quartet': {
        for (let ii = 0; ii < 4; ii += 1) {
          const iconImage = await loadImage(
            `./asset/${dataList[di].iconUrls[ii]}`
          );
          canvas.drawImage(
            iconImage,
            0,
            0,
            iconImage.width,
            iconImage.height,
            3 + ICON_SIZE * ii + 3 * ii,
            OHANASHI_HEIGHT * di + 4,
            ICON_SIZE,
            ICON_SIZE
          );
        }
        break;
      }
      default:
        // dataList[di].messageMode === 'message-only'の場合、アイコンは描画しない
        break;
    }

    // テキストの描画
    canvas.font = `14px Noto Sans JP`;
    canvas.textBaseline = 'top';
    const name = dataList[di].name;
    const message = dataList[di].message;
    switch (dataList[di].messageMode) {
      case 'normal':
        drawText(
          canvas,
          name,
          message,
          di,
          ICON_SIZE + 16,
          214,
          ICON_SIZE + 16,
          214
        );
        break;
      case 'reverse':
        drawText(canvas, name, message, di, 14, 214, 14, 214);
        break;
      case 'double':
        drawText(
          canvas,
          name,
          message,
          di,
          ICON_SIZE + 16,
          140,
          ICON_SIZE + 16,
          140
        );
        break;
      case 'message-only':
        drawText(canvas, name, message, di, 14, 292, 14, 292);
        break;
      default:
        // dataList[di].messageMode === 'quartet'の場合、テキストは描画しない
        break;
    }
  }
  if (showLogoFlg) {
    canvas.fillStyle = 'black';
    canvas.fillRect(
      0,
      OHANASHI_HEIGHT * dataList.length,
      OHANASHI_WIDTH,
      OHANASHI_LOGO_HEIGHT + 2
    );
    canvas.fillStyle = 'white';
    canvas.font = `${OHANASHI_LOGO_HEIGHT}px Noto Sans JP`;
    canvas.fillText(
      'アイマス会話メーカーv3',
      OHANASHI_WIDTH - OHANASHI_LOGO_HEIGHT * 12,
      OHANASHI_HEIGHT * dataList.length,
      OHANASHI_WIDTH
    );
  }
  canvas.save();
};

const OhanashiView: React.FC<{
  dataList: OhanashiData[];
  setDownloadLink?: (val: string) => void;
  showLogoFlg?: boolean;
}> = ({ dataList, setDownloadLink = () => {}, showLogoFlg = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        await drawMethodImpl(offscreenCanvasContext, dataList, showLogoFlg);
        context.drawImage(offscreenCanvas, 0, 0);
        setDownloadLink(canvas.toDataURL('image/png'));
      }
    };
    drawMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, dataList]);

  return (
    <canvas
      ref={canvasRef}
      width={OHANASHI_WIDTH}
      height={
        OHANASHI_HEIGHT * dataList.length +
        (showLogoFlg ? OHANASHI_LOGO_HEIGHT + 2 : 0)
      }
    />
  );
};

export default OhanashiView;
