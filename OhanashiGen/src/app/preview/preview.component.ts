import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TalkData } from '../model/TalkData';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  /**
   * タップ時の処理
   */
  @Output() changeForm: EventEmitter<TalkData> = new EventEmitter();

  /**
   * 会話一覧
   */
  talkList: {firstFlg: string, talk: TalkData}[] = [];

  constructor(private setting: SettingService) { }

  ngOnInit() {
    this.refreshSelectDraw();
  }

  /**
   * デレポモードの場合はtrue
   */
  @Input() derepoFlg: string;

  /**
   * 画面の内容を更新
   */
  refreshSelectDraw(){
    const list = [];
    for(let i = 0; i < this.setting.talkList.length; ++i){
      const temp = {firstFlg: "false", talk: this.setting.talkList[i]};
      if(i == 0){
        temp.firstFlg = "true";
      }
      temp.talk.selected = (this.setting.selectTalkId == this.setting.talkList[i].id);
      list.push(temp);
    }
    this.talkList = list;
  }

  /**
   * 選択を切り替え
   * @param id 選択された会話のID
   */
  select(id: number){
    if(this.setting.selectTalkId != id){
      this.setting.selectTalkId = id;
      const talk = new TalkData();
      const nowTalk = this.setting.talkList.filter(t => t.id == id)[0];
      talk.id = nowTalk.id;
      talk.message = nowTalk.message;
      talk.name = nowTalk.name;
      talk.url = nowTalk.url;
      talk.favs = nowTalk.favs;
      talk.date = nowTalk.date;
      this.changeForm.emit(talk);
    }else{
      this.setting.selectTalkId = -1;
      const talk = new TalkData();
      this.changeForm.emit(talk);
    }
    this.refreshSelectDraw();
  }
}
