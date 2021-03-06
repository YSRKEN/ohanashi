import { IDOL_LIST } from 'constant/idol';
import { DerepoData, Idol, OhanashiData } from 'constant/type';
import { useState, useEffect } from 'react';

/**
 * 設定をローカルストレージから読み込む
 * @param key キー
 * @param defaultValue デフォルト値
 */
export const loadSetting = <T>(key: string, defaultValue: T) => {
  const data = window.localStorage.getItem(key);
  if (data === null) {
    return defaultValue;
  }

  return JSON.parse(data) as T;
};

/**
 * 設定をローカルストレージに書き込む
 * @param key キー
 * @param value 値
 */
export const saveSetting = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 画像を非同期に読み込み、HTMLImageElementとして返す
 * @param imagePath 画像のパス
 */
export const loadImage = (imagePath: string): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>(resolve => {
    const image = new Image();
    image.src = imagePath;
    image.onload = () => {
      resolve(image);
    };
  });
};

// 複数行の文字列を描画する
// (描画サイズに合わせて自動で折り返す)
/**
 * Canvasに対して文字列を描画する。ただし横幅が溢れそうな際は自動で改行する
 * @param canvas Canvas
 * @param text 文字列
 * @param x 描画を開始する左上座標
 * @param y 描画を開始する左上座標
 * @param lineHeight 行間(pixel単位)
 * @param maxWidth 描画範囲の最大横幅
 */
export const fillTextEx = (canvas: CanvasRenderingContext2D, text: string, x: number, y: number, lineHeight: number, maxWidth: number | undefined) => {
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

/**
 * 指定したURLのアイコンに対するIdol型を検索する
 */
export const findIdolByIconUrl = (url: string): Idol | null => {
  const index = IDOL_LIST.findIndex(idol => {
    const temp = idol.iconList.map(url => `${idol.category}/${url}`);
    return temp.includes(url);
  });
  if (index < 0) {
    return null;
  } else {
    return IDOL_LIST[index];
  }
};

/**
 * アイドル一覧を名前順にソートする
 * @param list アイドル一覧
 */
export const sortIdolList = (list: Idol[]) => {
  return list.sort((a: Idol, b: Idol) => (a.kana > b.kana ? 1 : a.kana < b.kana ? -1 : 0));
};

/**
 * 自動でローカルストレージに永続化するuseState
 * @param key 保存キー
 * @param defaultValue 初期値
 */
export const useLocalStorageState = <T>(key: string, defaultValue: T): [T, (t: T) => void] => {
  const [val, setVal] = useState<T>(loadSetting(key, defaultValue));

  useEffect(() => {
    saveSetting(key, val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  return [val, setVal];
};

/**
 * 「おはなし」から、名前欄を自動生成する
 * @param ohanashi 「おはなし」
 */
export const getOhanashiNameAuto = (ohanashi: OhanashiData) => {
  switch (ohanashi.messageMode) {
    case 'message-only':
      return '';
    case 'quartet':
      return '';
    case 'double': {
      const idol1 = findIdolByIconUrl(ohanashi.iconUrls[0]);
      const idol2 = findIdolByIconUrl(ohanashi.iconUrls[1]);
      if (idol1 !== null && idol2 !== null) {
        return `${idol1.shortName}＆${idol2.shortName}`;
      } else {
        return '';
      }
    }
    default: {
      const idol = findIdolByIconUrl(ohanashi.iconUrls[0]);
      return idol !== null ? idol.shortName : '';
    }
  }
};

/**
 * 「デレぽ」から、名前欄を自動生成する
 * @param derepo 「デレぽ」
 */
export const getDerepoNameAuto = (derepo: DerepoData) => {
  const idol = findIdolByIconUrl(derepo.iconUrl);
  return idol !== null ? idol.name : '';
};

/**
 * ゼロ埋めした文字列を返す
 * @param s 文字
 * @param length 文字長
 */
export const fillZero = (s: number, length: number) => {
  return ('00000000' + s).slice(-length);
};

export const tryParseInt = (s: string | undefined) => {
  if (typeof s === 'undefined') {
    return undefined;
  }
  if (s === '') {
    return 0;
  }
  try {
    return parseInt(s, 10);
  } catch {
    return undefined;
  }
};
