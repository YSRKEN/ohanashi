import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-talk-box-double',
  templateUrl: './talk-box-double.component.html',
  styleUrls: ['./talk-box-double.component.scss']
})
export class TalkBoxDoubleComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
