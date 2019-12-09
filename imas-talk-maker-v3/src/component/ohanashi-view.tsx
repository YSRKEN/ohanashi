import React, { useRef, useEffect } from 'react';
import { OhanashiData } from 'constant';
import { loadImage } from 'service/utility';

// 「おはなし」の大きさ
const OHANASHI_WIDTH = 320;
const OHANASHI_HEIGHT = 84;
const ICON_SIZE = 76;

// 描画メソッド
const drawMethodImpl = async (
  canvas: CanvasRenderingContext2D,
  dataList: OhanashiData[]) => {
  // 描画用の画像を読み込む
  const bgImage = await loadImage('./asset/background.png');
  const balloon1 = await loadImage('./asset/balloon1.png');
  const balloon2 = await loadImage('./asset/balloon2.png');
  const balloon3 = await loadImage('./asset/balloon3.png');

  // 描画を行う
  for (let di = 0; di < dataList.length; di += 1) {
    // 背景の描画
    canvas.drawImage(bgImage, 0, 0, OHANASHI_WIDTH, OHANASHI_HEIGHT,
      0, OHANASHI_HEIGHT * di, OHANASHI_WIDTH, OHANASHI_HEIGHT);

    // 会話枠の描画
    switch (dataList[di].messageMode) {
      case 'normal':
        canvas.drawImage(balloon1, 0, 0, OHANASHI_WIDTH, OHANASHI_HEIGHT,
          0, OHANASHI_HEIGHT * di, OHANASHI_WIDTH, OHANASHI_HEIGHT);
        break;
      case 'double':
        canvas.drawImage(balloon2, 0, 0, OHANASHI_WIDTH, OHANASHI_HEIGHT,
          0, OHANASHI_HEIGHT * di, OHANASHI_WIDTH, OHANASHI_HEIGHT);
        break;
      case 'message-only':
        canvas.drawImage(balloon3, 0, 0, OHANASHI_WIDTH, OHANASHI_HEIGHT,
          0, OHANASHI_HEIGHT * di, OHANASHI_WIDTH, OHANASHI_HEIGHT);
        break;
      default:
        // dataList[di].messageMode === 'quartet'の場合、会話枠は描画しない
        break;
    }

    // アイコンの描画
    const iconImage = await loadImage('./asset/million/nikaido_chizuru-3.png');
    switch (dataList[di].messageMode) {
      case 'normal':
        canvas.drawImage(iconImage, 0, 0, iconImage.width, iconImage.height,
          5, OHANASHI_HEIGHT * di + 4, ICON_SIZE, ICON_SIZE);
        break;
      case 'double':
        canvas.drawImage(iconImage, 0, 0, iconImage.width, iconImage.height,
          5, OHANASHI_HEIGHT * di + 4, ICON_SIZE, ICON_SIZE);
        canvas.drawImage(iconImage, 0, 0, iconImage.width, iconImage.height,
          OHANASHI_WIDTH - 5 - ICON_SIZE, OHANASHI_HEIGHT * di + 4, ICON_SIZE, ICON_SIZE);
        break;
      case 'quartet':{
        for (let ii = 0; ii < 4; ii += 1) {
          canvas.drawImage(iconImage, 0, 0, iconImage.width, iconImage.height,
            3 + ICON_SIZE * ii + 3 * ii, OHANASHI_HEIGHT * di + 4, ICON_SIZE, ICON_SIZE);
        }
        break;
      }
      default:
        // dataList[di].messageMode === 'message-only'の場合、アイコンは描画しない
        break;
    }
  }
  canvas.save();
}

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
    }
    drawMethod();
  }, [canvasRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={OHANASHI_WIDTH}
        height={OHANASHI_HEIGHT * dataList.length}
      />
      {dataList.map((record, index) => {
        return (
          <div key={index}>
            <div>
              <span>・{record.name}</span>
              <br />
              <span>・{record.message}</span>
              <br />
              <span>・{record.messageMode}</span>
            </div>
            <div>
              {record.iconUrls.map((iconUrl, index2) => {
                const iconUrlImpl = `${process.env.PUBLIC_URL}/asset/million/${iconUrl}`;
                return (
                  <img
                    key={index2}
                    src={iconUrlImpl}
                    alt=""
                    width={40}
                    height={40}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OhanashiView;
