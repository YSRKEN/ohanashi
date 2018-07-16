import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-talk-box',
  templateUrl: './talk-box.component.html',
  styleUrls: ['./talk-box.component.scss']
})
export class TalkBoxComponent implements OnInit {

  /**
   * URL
   */
  @Input() url: string;

  /**
   * キャラ名
   */
  @Input() name: string;

  /**
   * 会話内容
   */
  @Input() message: string;

  /**
   * 選択されている場合はtrue
   */
  @Input() selected: string;

  /**
   * デレポモードの場合はtrue
   */
  @Input() derepoFlg: string;

  constructor() { }

  ngOnInit() {
  }

}
