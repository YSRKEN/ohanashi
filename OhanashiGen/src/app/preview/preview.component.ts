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
    this.talkList = this.setting.talkList;
    console.log(this.talkList);
  }
}
