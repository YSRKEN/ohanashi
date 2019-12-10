import React, { useRef, useEffect } from 'react';
import { OhanashiData, APPLICATION_FONT } from 'constant';
import { loadImage } from 'service/utility';

// 「おはなし」の大きさ
const OHANASHI_WIDTH = 320;
const OHANASHI_HEIGHT = 84;
const ICON_SIZE = 76;

// 複数行の文字列を描画する
// (描画サイズに合わせて自動で折り返す)
const fillTextEx = (canvas: CanvasRenderingContext2D, text: string, x: number, y: number, lineHeight: number, maxWidth: number | undefined) => {
  // 改行ごとに切り出す
  const splitedText = text.split('\n');

  // 自動で折り返したテキストを生成する
  const splitedText2: string[] = [];
  for (let li = 0; li < splitedText.length; li += 1) {
    // 1行取り出す
    const text2 = splitedText[li];
    const textRect = canvas.measureText(text2);
    if (typeof maxWidth !== 'undefined' && textRect.width > maxWidth) {
      // 1行が長すぎた場合、どこで分割するのが適切かを計算する
      // (位置p〜qまで切り出したものが溢れないことを確認し続けることで、
      // 位置p〜maxQまで切り出せることを確かめる)
      for (let p = 0; p < text2.length; p += 1) {
        let maxQ = 0;
        for (let q = p + 1; q <= text2.length; q += 1) {
          const text3 = text2.slice(p, q);
          const textRect2 = canvas.measureText(text3);
          if (textRect2.width <= maxWidth) {
            maxQ = q;
          } else {
            break;
          }
        }
        splitedText2.push(text2.slice(p, maxQ));
        p = maxQ - 1;
      }
    } else {
      // 1行が収まっているのでそのまま追加する
      splitedText2.push(text2);
    }
  }

  // テキストを描画する
  for (let li = 0; li < splitedText2.length; li += 1) {
    const text2 = splitedText2[li];
    if (text2.length === 0) {
      continue;
    }
    canvas.fillText(text2, x, y + lineHeight * li, maxWidth);
  }
};

// 描画メソッド
const drawMethodImpl = async (canvas: CanvasRenderingContext2D, dataList: OhanashiData[]) => {
  // 描画用の画像を読み込む
  const bgImage = await loadImage('./asset/background.png');
  const balloon1 = await loadImage('./asset/balloon1.png');
  const balloon2 = await loadImage('./asset/balloon2.png');
  const balloon3 = await loadImage('./asset/balloon3.png');

  // 描画を行う
  for (let di = 0; di < dataList.length; di += 1) {
    // 背景の描画
    canvas.drawImage(bgImage, 0, 0, OHANASHI_WIDTH, OHANASHI_HEIGHT, 0, OHANASHI_HEIGHT * di, OHANASHI_WIDTH, OHANASHI_HEIGHT);

    // 会話枠の描画
    switch (dataList[di].messageMode) {
      case 'normal':
        canvas.drawImage(balloon1, 0, 0, OHANASHI_WIDTH, OHANASHI_HEIGHT, 0, OHANASHI_HEIGHT * di, OHANASHI_WIDTH, OHANASHI_HEIGHT);
        break;
      case 'double':
        canvas.drawImage(balloon2, 0, 0, OHANASHI_WIDTH, OHANASHI_HEIGHT, 0, OHANASHI_HEIGHT * di, OHANASHI_WIDTH, OHANASHI_HEIGHT);
        break;
      case 'message-only':
        canvas.drawImage(balloon3, 0, 0, OHANASHI_WIDTH, OHANASHI_HEIGHT, 0, OHANASHI_HEIGHT * di, OHANASHI_WIDTH, OHANASHI_HEIGHT);
        break;
      default:
        // dataList[di].messageMode === 'quartet'の場合、会話枠は描画しない
        break;
    }

    // アイコンの描画
    switch (dataList[di].messageMode) {
      case 'normal': {
        const iconImage = await loadImage(`./asset/${dataList[di].iconUrls[0]}`);
        canvas.drawImage(iconImage, 0, 0, iconImage.width, iconImage.height, 5, OHANASHI_HEIGHT * di + 4, ICON_SIZE, ICON_SIZE);
        break;
      }
      case 'double': {
        const iconImage1 = await loadImage(`./asset/${dataList[di].iconUrls[0]}`);
        const iconImage2 = await loadImage(`./asset/${dataList[di].iconUrls[1]}`);
        canvas.drawImage(iconImage1, 0, 0, iconImage1.width, iconImage1.height, 5, OHANASHI_HEIGHT * di + 4, ICON_SIZE, ICON_SIZE);
        canvas.drawImage(iconImage2, 0, 0, iconImage2.width, iconImage2.height, OHANASHI_WIDTH - 5 - ICON_SIZE, OHANASHI_HEIGHT * di + 4, ICON_SIZE, ICON_SIZE);
        break;
      }
      case 'quartet': {
        for (let ii = 0; ii < 4; ii += 1) {
          const iconImage = await loadImage(`./asset/${dataList[di].iconUrls[ii]}`);
          canvas.drawImage(iconImage, 0, 0, iconImage.width, iconImage.height, 3 + ICON_SIZE * ii + 3 * ii, OHANASHI_HEIGHT * di + 4, ICON_SIZE, ICON_SIZE);
        }
        break;
      }
      default:
        // dataList[di].messageMode === 'message-only'の場合、アイコンは描画しない
        break;
    }

    // テキストの描画
    switch (dataList[di].messageMode) {
      case 'normal':
        // 準備
        canvas.font = `14px ${APPLICATION_FONT}`;
        canvas.textBaseline = 'top';

        // 名前部分を描画
        canvas.fillStyle = '#f33281';
        canvas.fillText(dataList[di].name, ICON_SIZE + 16, OHANASHI_HEIGHT * di + 8, 214);

        // メッセージ部分を描画
        canvas.fillStyle = 'black';
        fillTextEx(canvas, dataList[di].message, ICON_SIZE + 16, OHANASHI_HEIGHT * di + 23, 17.5, 214);
        break;
      case 'double':
        // 準備
        canvas.font = `14px ${APPLICATION_FONT}`;
        canvas.textBaseline = 'top';

        // 名前部分を描画
        canvas.fillStyle = '#f33281';
        canvas.fillText(dataList[di].name, ICON_SIZE + 16, OHANASHI_HEIGHT * di + 8, 140);

        // メッセージ部分を描画
        canvas.fillStyle = 'black';
        fillTextEx(canvas, dataList[di].message, ICON_SIZE + 16, OHANASHI_HEIGHT * di + 23, 17.5, 140);
        break;
      case 'message-only':
        // 準備
        canvas.font = `14px ${APPLICATION_FONT}`;
        canvas.textBaseline = 'top';

        // 名前部分を描画
        canvas.fillStyle = '#f33281';
        canvas.fillText(dataList[di].name, 14, OHANASHI_HEIGHT * di + 8, 292);

        // メッセージ部分を描画
        canvas.fillStyle = 'black';
        fillTextEx(canvas, dataList[di].message, 14, OHANASHI_HEIGHT * di + 23, 17.5, 292);
        break;
      default:
        // dataList[di].messageMode === 'quartet'の場合、テキストは描画しない
        break;
    }
  }
  canvas.save();
};

const OhanashiView: React.FC<{ dataList: OhanashiData[] }> = ({ dataList }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 描画に必要なコンテキストが得られたなら描画を行う
  useEffect(() => {
    const drawMethod = async () => {
      // 描画できない際は飛ばす
      if (canvasRef.current === null) {
        return;
      }
      const canvas = canvasRef.current.getContext('2d');
      if (canvas === null) {
        return;
      }

      // 描画を実施
      await drawMethodImpl(canvas, dataList);
    };
    drawMethod();
  }, [canvasRef]);

  return <canvas ref={canvasRef} width={OHANASHI_WIDTH} height={OHANASHI_HEIGHT * dataList.length} />;
};

export default OhanashiView;
