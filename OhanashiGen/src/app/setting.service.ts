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

  /**
   * プリセット画面で選ぶ方
   */
  presetMode: number = 0;

  /**
   * 設定したいURL
   */
  setUrl: string = "assets/images/producer_p_head/P-suite.png";

  /**
   * 設定したいURL
   */
  setUrl2: string = "assets/images/kotori/1100234b19f.png";

  /**
   * 設定したい名前
   */
  setName: string = "";

  /**
   * プリセットメニューでの検索ワード
   */
  searchWord: string = "";

  /**
   * デレぽモードにするか？
   */
  derepoFlg: boolean = false;

  /**
   * ダブルモードにするか？
   */
  doubleFlg: boolean = false;

  canvas: any = null;

  constructor() {
    // サンプルデータを追加
    if(window.localStorage.getItem("saveData") == null){
      this.saveDefaultSetting();
    }else{
      this.talkList = [];
      for(let data of JSON.parse(window.localStorage.getItem("saveData"))){
        const temp = new TalkData();
        temp.id = data.id;
        temp.message = data.message;
        temp.name = data.name;
        temp.url = data.url;
        temp.url2 = data.url2;
        temp.favs = data.favs;
        temp.date = data.date;
        temp.selected = data.selected;
        this.talkList.push(temp);
      }
    }
    // デレぽモードフラグを読み込み
    if(window.localStorage.getItem("derepoFlg") != null){
      this.derepoFlg = (window.localStorage.getItem("derepoFlg") == 'true');
    }
    // ダブルモードフラグを読み込み
    if(window.localStorage.getItem("doubleFlg") != null){
      this.doubleFlg = (window.localStorage.getItem("doubleFlg") == 'true');
    }
  }

  /**
   * プリセットデータを書き込む
   */
  saveDefaultSetting(){
    this.talkList = [];
    {
      const data: TalkData = new TalkData();
      data.id = 1;
      data.message = "当ツールをご利用いただき、ありがとうございます。以下、簡単に操作説明をさせていただきます。";
      data.name = "田中琴葉";
      data.url = "assets/images/kotoha/1100aefcf25.png";
      data.url2 = "";
      data.selected = false;
      data.favs = "9999+";
      data.date = "07-17 09:00";
      this.talkList.push(data);
    }
    {
      const data: TalkData = new TalkData();
      data.id = 2;
      data.message = "と言っても見たまんまじゃない？入力欄に入力して「追加」ってするだけだよ？";
      data.name = "島原エレナ";
      data.url = "assets/images/elena/1100d030dd9.png";
      data.url2 = "";
      data.selected = false;
      data.favs = "2243";
      data.date = "07-17 09:03";
      this.talkList.push(data);
    }
    {
      const data: TalkData = new TalkData();
      data.id = 3;
      data.message = "「プレビュー欄をタップして光らせ、↑↑ボタンか↓↓ボタンで移動」というのは直感的でしょうか……";
      data.name = "田中琴葉";
      data.url = "assets/images/kotoha/1100f374c0e.png";
      data.url2 = "";
      data.selected = false;
      data.favs = "1214";
      data.date = "07-17 09:04";
      this.talkList.push(data);
    }
    {
      const data: TalkData = new TalkData();
      data.id = 4;
      data.message = "元のおはなしジェネレーターもそうだったし、許されると信じたい";
      data.name = "望月杏奈";
      data.url = "assets/images/anna/1100774c550.png";
      data.url2 = "";
      data.selected = false;
      data.favs = "5627";
      data.date = "07-17 09:20";
      this.talkList.push(data);
    }
    {
      const data: TalkData = new TalkData();
      data.id = 5;
      data.message = "ちなみにこのツールはPWAやから、スマホのホームボタンに追加できるんや！　凄いやろ？";
      data.name = "横山奈緒";
      data.url = "assets/images/nao/110032c8059.png";
      data.url2 = "";
      data.selected = false;
      data.favs = "3304";
      data.date = "01-17 09:30";
      this.talkList.push(data);
    }
    {
      const data: TalkData = new TalkData();
      data.id = 6;
      data.message = "※PWAがどう凄いかについての説明は割愛させていただきます。存分にご活用くださいませ。";
      data.name = "早坂そら";
      data.url = "assets/images/sora/2100994b563_1.png";
      data.url2 = "";
      data.selected = false;
      data.favs = "1000";
      data.date = "01-17 10:00";
      this.talkList.push(data);
    }
    this.saveSetting();
  }

  /**
   * 情報を保存
   */
  saveSetting(){
    const output: string = JSON.stringify(this.talkList);
    window.localStorage.setItem("saveData", output);
    window.localStorage.setItem("derepoFlg", this.derepoFlg ? 'true' : 'false');
    window.localStorage.setItem("doubleFlg", this.doubleFlg ? 'true' : 'false');
  }
}
