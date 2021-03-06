import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TalkData } from '../model/TalkData';
import { SettingService } from '../setting.service';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  /**
   * 現在の会話内容
   */
  nowTalk: TalkData = new TalkData();

  /**
   * デレぽモードにするか？
   */
  derepoFlg: boolean = false;

  /**
   * ダブルモードにするか？
   */
  doubleFlg: boolean = false;

  /**
   * プレビューを更新する際は"true"にする
   */
  refreshFlg: string = "false";

  constructor(private setting: SettingService, private router: Router) { }

  ngOnInit() {
    this.nowTalk.name = this.setting.setName;
    this.setting.setName = "";
    this.nowTalk.message = this.setting.setMessage;
    if(this.setting.presetMode == 0){
      this.nowTalk.url = this.setting.setUrl;
      this.setting.setUrl = "";
      if(this.setting.setUrl2 != ""){
        this.nowTalk.url2 = this.setting.setUrl2;
        this.setting.setUrl2 = "";
      }
    }else{
      if(this.setting.setUrl != ""){
        this.nowTalk.url = this.setting.setUrl;
        this.setting.setUrl = "";
      }
      this.nowTalk.url2 = this.setting.setUrl2;
      this.setting.setUrl2 = "";
    }
    this.derepoFlg = this.setting.derepoFlg;
    this.doubleFlg = this.setting.doubleFlg;
  }

  ngAfterViewInit(){

    var element = document.createElement('a');
    element.setAttribute('href',"https://twitter.com/share?ref_src=twsrc%5Etfw");
    element.setAttribute('class',"twitter-share-button");
    element.setAttribute('data-size',"large");
    element.setAttribute('data-text',"ミリマスもデレマスも！");
    element.setAttribute('data-url',"https://ohanashigen.firebaseapp.com");
    element.setAttribute('data-hashtags',"アイマス会話メーカー");
    element.setAttribute('data-show-count',"false");

    var script = document.createElement('script');
    script.async = true;
    script.setAttribute('src',"https://platform.twitter.com/widgets.js");
    script.setAttribute('charset','utf-8');

    var div = document.getElementById("anchor");
    div.parentNode.insertBefore(element,div.nextSibling);
    div.parentNode.insertBefore(script,div.nextSibling);
  }

  /**
   * デレぽモードにするか？
   */
  get derepoFlg2(): string {
    return this.derepoFlg ? "true" : "false";
  }

    /**
   * ダブルモードにするか？
   */
  get doubleFlg2(): string {
    return this.doubleFlg ? "true" : "false";
  }

  /**
   * 会話を追加する
   */
  addTalk() {
    let newId = 1;
    while (true) {
      if (this.setting.talkList.filter(t => t.id == newId).length == 0) {
        break;
      } else {
        ++newId;
      }
    }
    this.nowTalk.id = newId;
    if(this.doubleFlg != true){
      this.nowTalk.url2 = "";
    }
    this.setting.talkList.push(this.nowTalk);
    this.nowTalk = new TalkData();
    this.setting.saveSetting();
    this.refreshFlg = "true";
  }

  /**
   * プレビュー欄をタップすると、画面上部が書き換わるようにする
   */
  changeForm(selectTalk: TalkData) {
    this.nowTalk.id = selectTalk.id;
    this.nowTalk.message = selectTalk.message;
    this.nowTalk.name = selectTalk.name;
    this.nowTalk.url = selectTalk.url;
    this.nowTalk.url2 = selectTalk.url2;
    this.nowTalk.favs = selectTalk.favs;
    this.nowTalk.date = selectTalk.date;
    if(this.nowTalk.url2 != ""){
      this.doubleFlg = true;
      this.setting.derepoFlg = true;
    }else{
      this.doubleFlg = false;
      this.setting.derepoFlg = false;
    }
  }

  /**
   * 会話を修正する
   */
  editTalk() {
    if (this.nowTalk.id == 0) {
      return;
    }
    if (this.setting.talkList.filter(t => t.id == this.nowTalk.id).length > 0) {
      const selectTalk = this.setting.talkList.filter(t => t.id == this.nowTalk.id)[0];
      selectTalk.message = this.nowTalk.message;
      selectTalk.name = this.nowTalk.name;
      selectTalk.url = this.nowTalk.url;
      selectTalk.url2 = this.nowTalk.url2;
      if(this.doubleFlg != true){
        selectTalk.url2 = "";
      }
      selectTalk.favs = this.nowTalk.favs;
      selectTalk.date = this.nowTalk.date;
      this.setting.saveSetting();
    }
  }

  /**
   * 会話を削除する
   */
  deleteTalk() {
    if (this.nowTalk.id == 0) {
      return;
    }
    const eraseIndex = this.setting.talkList.findIndex(t => t.id == this.nowTalk.id);
    this.setting.talkList.splice(eraseIndex, 1);
    this.nowTalk.id = 0;
    this.setting.saveSetting();
    this.refreshFlg = "true";
  }

  /**
   * 選択した会話を上に移動させる
   */
  upTalk() {
    if (this.nowTalk.id == 0) {
      return;
    }
    const talkIndex = this.setting.talkList.findIndex(t => t.id == this.nowTalk.id);
    if (talkIndex == 0) {
      return;
    }
    const newTalk = new TalkData();
    newTalk.id = this.setting.talkList[talkIndex].id;
    newTalk.message = this.setting.talkList[talkIndex].message;
    newTalk.name = this.setting.talkList[talkIndex].name;
    newTalk.url = this.setting.talkList[talkIndex].url;
    newTalk.url2 = this.setting.talkList[talkIndex].url2;
    newTalk.date = this.setting.talkList[talkIndex].date;
    newTalk.favs = this.setting.talkList[talkIndex].favs;
    this.setting.talkList.splice(talkIndex, 1);
    this.setting.talkList.splice(talkIndex - 1, 0, newTalk);
    this.setting.saveSetting();
    this.refreshFlg = "true";
  }

  /**
   * 選択した会話を下に移動させる
   */
  downTalk() {
    if (this.nowTalk.id == 0) {
      return;
    }
    const talkIndex = this.setting.talkList.findIndex(t => t.id == this.nowTalk.id);
    if (talkIndex == this.setting.talkList.length - 1) {
      return;
    }
    const newTalk = new TalkData();
    newTalk.id = this.setting.talkList[talkIndex].id;
    newTalk.message = this.setting.talkList[talkIndex].message;
    newTalk.name = this.setting.talkList[talkIndex].name;
    newTalk.url = this.setting.talkList[talkIndex].url;
    newTalk.url2 = this.setting.talkList[talkIndex].url2;
    newTalk.date = this.setting.talkList[talkIndex].date;
    newTalk.favs = this.setting.talkList[talkIndex].favs;
    this.setting.talkList.splice(talkIndex, 1);
    this.setting.talkList.splice(talkIndex + 1, 0, newTalk);
    this.setting.saveSetting();
    this.refreshFlg = "true";
  }

  /**
   * プリセット画面に遷移
   */
  async moveSelectView() {
    this.setting.setMessage = this.nowTalk.message;
    this.setting.setUrl = this.nowTalk.url;
    this.setting.setUrl2 = this.nowTalk.url2;
    this.setting.presetMode = 0;
    await this.router.navigate(['/preset']);
  }

  /**
   * プリセット画面に遷移
   */
  async moveSelectView2() {
    this.setting.setUrl = this.nowTalk.url;
    this.setting.setUrl2 = this.nowTalk.url2;
    this.setting.setName = this.nowTalk.name;
    this.setting.presetMode = 1;
    await this.router.navigate(['/preset']);
  }

  /**
   * プリセットデータで上書き
   */
  async setPreset() {
    if(window.confirm("サンプル会話で上書きしますか？")){
      this.setting.saveDefaultSetting();
      this.refreshFlg = "true";
    }
  }

  /**
   * 全削除
   */
  async deleteAllTalk() {
    if(window.confirm("会話を全削除しますか？")){
      this.setting.talkList = [];
      this.setting.saveSetting();
      this.refreshFlg = "true";
    }
  }

  /**
   * デレぽフラグを変更
   */
  checkDerepoFlg() {
    this.setting.derepoFlg = !this.derepoFlg;
    this.setting.saveSetting();
  }

  /**
   * ダブルフラグを変更
   */
  checkDoubleFlg(){
    this.setting.doubleFlg = !this.doubleFlg;
    this.setting.saveSetting();
  }

  /**
   * 画面更新を止める
   */
  refreshDraw() {
    setTimeout(() => this.refreshFlg = "false");
  }

  /**
   * プレビューを保存する
   */
  savePreview() {
    html2canvas(document.querySelector("#capture"), {
      allowTaint: true,
      useCORS: true,
      proxy: true,
      onrendered: function (canvas) {
        canvas.toDataURL();
      }
    }).then(canvas => {
      // Base64データに変換
      const base64 = canvas.toDataURL();

      // blobに変換
      const blob = this.Base64toBlob(base64);

      // ファイルの保存イベントを走らせる
      this.saveBlob(blob, "ohanashi.png");
    });
  }

  /**
   * プレビュー部分をCanvas化して貼り付け
   */
  writeCanvas(){
    html2canvas(document.querySelector("#capture"), {
      allowTaint: true,
      useCORS: true,
      proxy: true
    }).then(canvas => {
      this.setting.canvas = canvas;
    }).then(async () => {
      await this.router.navigate(['/canvas']);
    });
  }

  /**
   * Base64をblobに変換する
   * @param base64 Base64
   */
  Base64toBlob(base64): Blob {
    var tmp = base64.split(',');
    var data = atob(tmp[1]);
    var mime = tmp[0].split(':')[1].split(';')[0];
    var buf = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
      buf[i] = data.charCodeAt(i);
    }
    var blob = new Blob([buf], { type: mime });
    return blob;
  }

  /**
   * blobを保存する
   * @param blob 
   */
  saveBlob(blob: Blob, fileName: string){
    const url = window.URL;
    const dataUrl = url.createObjectURL(blob);
    const event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    const a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    (a as HTMLAnchorElement).href = dataUrl;
    (a as HTMLAnchorElement).download = fileName;
    a.dispatchEvent(event);
  }

  /**
   * ファボ数を乱数で決定する
   */
  setFavAuto(){
    const num = Math.floor(Math.random() * 10001);
    if (num == 10000) {
      this.nowTalk.favs = '9999+';
    }else {
      this.nowTalk.favs = '' + num;
    }
  }

  /**
   * タイムスタンプを適当に決定する
   * ・最初の1個の場合、現在日付とする
   * ・そうでなく、かつどのおはなしも選択されていない場合、末尾に合う日付とする
   *   (末尾から1～30分以内)
   * ・どれかのおはなしが選択されていた場合、上と下を見て『間に差し込めるように』決定する
   * 　(差し込めない場合、上の日付+1分とする)
   */
  setTimestampAuto(){
    // 参考：JavaScript 日付を指定した書式の文字列にフォーマットする
    // https://zukucode.com/2017/04/javascript-date-format.html
    const formatDate = (date: Date, format: string): string => {
      format = format.replace(/yyyy/g, '' + date.getFullYear());
      format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
      format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
      format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
      format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
      format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
      format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
      return format;
    };

    // 「MM-dd HH:mm」形式の文字列をパースする
    const parseDerepoDate = (dateString: string): Date | null => {
      const pattern = /([0-9]+)-([0-9]+) ([0-9]+):([0-9]+)/;
      if (!pattern.test(dateString)) {
        return null;
      }
      const matches = dateString.match(pattern);
      if (matches.length < 5) {
        return null;
      }
      return new Date(2018, parseInt(matches[1]) - 1, parseInt(matches[2]), parseInt(matches[3]), parseInt(matches[4]));
    };

    // 選択した時刻に、0～29分まで加算した日付を返す
    const addRandomMinute = (date: Date): Date => {
      const newDate = new Date(date);
      newDate.setMinutes(newDate.getMinutes() + Math.floor(Math.random() * 30));
      return newDate;
    }

    // 選択した時刻に、0～29分まで減算した日付を返す
    const subRandomMinute = (date: Date): Date => {
      const newDate = new Date(date);
      newDate.setMinutes(newDate.getMinutes() - Math.floor(Math.random() * 30));
      return newDate;
    }

    // 省力化のため、事前に現在日付を代入しておく
    this.nowTalk.date = formatDate(new Date(), 'MM-dd HH:mm');

    // 最初の1個の場合、現在日付とする
    if (this.setting.talkList.length == 0) {
      return;
    }

    // そうでなく、かつどのおはなしも選択されていない場合、末尾に合う日付とする
    if (this.setting.selectTalkId < 0){
      const lastDateString = this.setting.talkList[this.setting.talkList.length - 1].date;
      const lastDate = parseDerepoDate(lastDateString);
      if (lastDate != null) {
        this.nowTalk.date = formatDate(addRandomMinute(lastDate), 'MM-dd HH:mm');
      }
      return;
    }

    //// いずれかのおはなしが選択されている場合

    // そもそもおはなしが1個しかない場合、現在日付とする
    if (this.setting.talkList.length == 1){
      return;
    }

    // 選択されているおはなしの、表示上のインデックスを検索する
    let index = -1;
    for (let i = 0; i < this.setting.talkList.length; ++i){
      if (this.setting.talkList[i].id == this.setting.selectTalkId) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      return;
    }

    // 表示上のインデックスが先頭や末尾だった場合の処理
    if (index == 0){
      const nextDate = parseDerepoDate(this.setting.talkList[index + 1].date);
      this.nowTalk.date = formatDate(subRandomMinute(nextDate), 'MM-dd HH:mm');
      return;
    }
    if (index == this.setting.talkList.length - 1) {
      const prevDate = parseDerepoDate(this.setting.talkList[index - 1].date);
      this.nowTalk.date = formatDate(addRandomMinute(prevDate), 'MM-dd HH:mm');
      return;
    }

    // 表示上のインデックスが中間だった場合の処理
    const prevDate = parseDerepoDate(this.setting.talkList[index - 1].date);
    const nextDate = parseDerepoDate(this.setting.talkList[index + 1].date);
    if (prevDate.getTime() > nextDate.getTime()) {
      // 矛盾していれば、直前の日付からのaddRandomMinuteを返す
      this.nowTalk.date = formatDate(addRandomMinute(prevDate), 'MM-dd HH:mm');
      return;
    }else {
      // 矛盾していないので、日付の間の時刻を返す
      const diffDate = nextDate.getTime() - prevDate.getTime();
      const newDateTime = prevDate.getTime() + Math.floor(Math.random() * diffDate);
      const newDate = new Date(newDateTime);
      this.nowTalk.date = formatDate(newDate, 'MM-dd HH:mm');
    }
  }
}
