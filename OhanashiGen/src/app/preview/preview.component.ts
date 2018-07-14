import { Component, OnInit, Input } from '@angular/core';
import { TalkData } from '../model/TalkData';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  /**
   * 会話一覧
   */
  talkList: TalkData[] = [];

  constructor(private setting: SettingService) { }

  ngOnInit() {
    this.refreshSelectDraw();
  }

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
    }else{
      this.setting.selectTalkId = -1;
    }
    this.refreshSelectDraw();
  }
}
