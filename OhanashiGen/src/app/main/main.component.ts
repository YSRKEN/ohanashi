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
   * デレポモードにするか？
   */
  derepoFlg: boolean = false;

  /**
   * プレビューを更新する際は"true"にする
   */
  refreshFlg: string = "false";

  constructor(private setting: SettingService, private router: Router) { }

  ngOnInit() {
    this.nowTalk.url = this.setting.setUrl;
    this.setting.setUrl = "";
    this.nowTalk.name = this.setting.setName;
    this.setting.setName = "";
    this.derepoFlg = this.setting.derepoFlg;
  }

  ngAfterViewInit(){

    var element = document.createElement('a');
    element.setAttribute('href',"https://twitter.com/share?ref_src=twsrc%5Etfw");
    element.setAttribute('class',"twitter-share-button");
    element.setAttribute('data-size',"large");
    element.setAttribute('data-text',"ミリマスもデレマスも！");
    element.setAttribute('data-url',"https://ohanashigen.firebaseapp.com");
    element.setAttribute('data-hashtags',"おはなしジェネレーター");
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
   * デレポモードにするか？
   */
  get derepoFlg2(): string {
    return this.derepoFlg ? "true" : "false";
  }

  /**
   * 会話を追加する
   */
  addTalk() {
    console.log(this.setting.talkList);
    let newId = 1;
    while (true) {
      if (this.setting.talkList.filter(t => t.id == newId).length == 0) {
        break;
      } else {
        ++newId;
      }
    }
    this.nowTalk.id = newId;
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
    this.nowTalk.favs = selectTalk.favs;
    this.nowTalk.date = selectTalk.date;
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
   * デレポフラグを変更
   */
  checkDerepoFlg() {
    this.setting.derepoFlg = !this.derepoFlg;
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
}
