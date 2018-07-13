import { Component, OnInit } from '@angular/core';
import { TalkData } from '../model/TalkData';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  /**
   * 会話一覧
   */
  talkList: TalkData[] = [];

  /**
   * 現在の会話内容
   */
  nowTalk: TalkData = new TalkData();

  constructor() { }

  ngOnInit() {
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

  /**
   * 会話を追加する
   */
  addTalk(){
    console.log(this.talkList);
    this.talkList.push(this.nowTalk);
    return;
  }
}
