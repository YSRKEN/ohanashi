import { Injectable } from '@angular/core';
import { TalkData } from './model/TalkData';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  /**
   * 会話一覧
   */
  talkList: TalkData[] = [];

  /**
   * 選択中の会話のID
   */
  selectTalkId: number = -1;

  constructor() {
    // サンプルデータを追加
    const data1: TalkData = new TalkData();
      data1.id = 1;
      data1.message = "いろはにほへと　ちりぬるを　わかよたれそ　つねならむ　ういのおくやま　けふこえて　あさきゆ";
      data1.name = "四条貴音";
      data1.url = "https://furugomu.github.io/ohanashi/images/takane/11005303050.png";
      this.talkList.push(data1);
    const data2: TalkData = new TalkData();
      data2.id = 2;
      data2.message = "The quick brown fox jumps over the lazy dog, 1234567890.";
      data2.name = "エミリー";
      data2.url = "https://furugomu.github.io/ohanashi/images/emily/1100e4622b9.png";
      this.talkList.push(data2);
    const data3: TalkData = new TalkData();
      data3.id = 3;
      data3.message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut la";
      data3.name = "二階堂千鶴";
      data3.url = "https://furugomu.github.io/ohanashi/images/chizuru/1100dd022c6.png";
      this.talkList.push(data3);
  }
}
