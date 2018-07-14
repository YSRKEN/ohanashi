import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TalkData } from '../model/TalkData';
import { SettingService } from '../setting.service';

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

  constructor(private setting: SettingService) { }

  ngOnInit() {
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
    return;
  }

  /**
   * プレビュー欄をタップすると、画面上部が書き換わるようにする
   */
  changeForm(selectTalk: TalkData){
    this.nowTalk.id = selectTalk.id;
    this.nowTalk.message = selectTalk.message;
    this.nowTalk.name = selectTalk.name;
    this.nowTalk.url = selectTalk.url;
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
  }
}
