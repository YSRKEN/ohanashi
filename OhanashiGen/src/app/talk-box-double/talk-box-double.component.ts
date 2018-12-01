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
   * URL(右側)
   */
  @Input() url2: string;

  /**
   * キャラ名
   */
  @Input() name: string;

  /**
   * 会話内容
   */
  @Input() message: string;

  /**
   * ファボ数
   */
  @Input() favs: string;

  /**
   * タイムスタンプ
   */
  @Input() date: string;

  /**
   * 選択されている場合はtrue
   */
  @Input() selected: string;

  /**
   * デレぽモードの場合はtrue
   */
  @Input() derepoFlg: string;

  /**
   * 先頭要素の場合はtrue
   */
  @Input() firstFlg: string;

  constructor() { }

  ngOnInit() {
  }

  get setNgClass(): string{
    let temp = "";
    temp += (this.selected == "true" ? 'bg-skyblue ' : 'bg-white ');
    temp += (this.firstFlg == 'true' ? 'derepo-block-first' : 'derepo-block');
    return temp;
  }

  get favLeft(){
    return {
      left: `${350 - this.favs.length * 7 / 2}px`
    }
  }
}
