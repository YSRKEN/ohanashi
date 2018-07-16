import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TalkData } from '../model/TalkData';
import { SettingService } from '../setting.service';
import { Router } from '@angular/router';

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

  /**
   * デレポモードにするか？
   */
  get derepoFlg2(): string{
      return this.derepoFlg ? "true" : "false";
  }

  /**
   * 会話を追加する
   */
  addTalk(){
    console.log(this.setting.talkList);
    let newId = 1;
    while(true){
      if(this.setting.talkList.filter(t => t.id == newId).length == 0){
        break;
      }else{
        ++newId;
      }
    }
    this.nowTalk.id = newId;
    this.setting.talkList.push(this.nowTalk);
    this.nowTalk = new TalkData();
    this.setting.saveSetting();
  }

  /**
   * プレビュー欄をタップすると、画面上部が書き換わるようにする
   */
  changeForm(selectTalk: TalkData){
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
  editTalk(){
    if(this.nowTalk.id == 0){
      return;
    }
    if(this.setting.talkList.filter(t => t.id == this.nowTalk.id).length > 0){
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
  deleteTalk(){
    if(this.nowTalk.id == 0){
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
  upTalk(){
    if(this.nowTalk.id == 0){
      return;
    }
    const talkIndex = this.setting.talkList.findIndex(t => t.id == this.nowTalk.id);
    if(talkIndex == 0){
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
  downTalk(){
    if(this.nowTalk.id == 0){
      return;
    }
    const talkIndex = this.setting.talkList.findIndex(t => t.id == this.nowTalk.id);
    if(talkIndex == this.setting.talkList.length - 1){
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
  async moveSelectView(){
    await this.router.navigate(['/preset']);
  }

  /**
   * プリセットデータで上書き
   */
  async setPreset(){
    this.setting.saveDefaultSetting();
    this.refreshFlg = "true";
  }

  /**
   * 全削除
   */
  async deleteAllTalk(){
    this.setting.talkList = [];
    this.setting.saveSetting();
    this.refreshFlg = "true";
  }

  /**
   * デレポフラグを変更
   */
  checkDerepoFlg(){
    this.setting.derepoFlg = !this.derepoFlg;
    this.setting.saveSetting();
  }

  /**
   * 画面更新を止める
   */
  refreshDraw(){
    setTimeout(() => this.refreshFlg = "false");
  }
}
