import { Component, OnInit } from '@angular/core';
import { TalkData } from '../model/TalkData';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  /**
   * 会話一覧
   */
  talkList: TalkData[] = [];

  /**
   * 現在の会話内容
   */
  nowTalk: TalkData = new TalkData();

  constructor() { }

  ngOnInit() {
  }

}
