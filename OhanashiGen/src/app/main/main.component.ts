import { Component, OnInit } from '@angular/core';
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
    this.setting.talkList.push(this.nowTalk);
    return;
  }
}
