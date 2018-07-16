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
  talkList: TalkData[] = [];

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
    const list = this.setting.talkList;
    for(let i = 0; i < list.length; ++i){
      list[i].selected = (this.setting.selectTalkId == list[i].id);
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
      this.changeForm.emit(talk);
    }else{
      this.setting.selectTalkId = -1;
    }
    this.refreshSelectDraw();
  }
}
