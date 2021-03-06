import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingService } from '../setting.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-preset',
  templateUrl: './preset.component.html',
  styleUrls: ['./preset.component.scss']
})
export class PresetComponent implements OnInit {

  dataList: ShowPresetData[] = [];

  searchWord: string = "";

  scrollObservable = new Subject();

  notLazyLoadFlg: boolean = false;

  setUrl = "";
  setUrl2 = "";

  constructor(private http: HttpClient, private setting: SettingService, private router: Router) {}

  async ngOnInit() {
    this.searchWord = this.setting.searchWord;
    this.setUrl = this.setting.setUrl;
    this.setUrl2 = this.setting.setUrl2;
    const text = await this.http.get<PresetData[]>('assets/preset_list.json').toPromise();
    let i = 1;
    this.dataList = text.map(temp => {
      const temp2 = new ShowPresetData();
      temp2.name = temp.name;
      temp2.ruby = temp.ruby;
      temp2.images = temp.images;
      temp2.href = "#collapse" + i;
      temp2.id = "heading" + i;
      temp2.id2 = "collapse" + i;
      ++i;
      return temp2;
    });
  }

  /**
   * 画像をタップするとメイン画面に戻る
   * @param name キャラ名
   * @param url 画像URL
   */
  click(name: string, url: string){
    if(this.setting.presetMode == 1){
      this.setting.setUrl = this.setUrl;
      this.setting.setUrl2 = url;
    }else{
      this.setting.setUrl2 = this.setUrl2;
      this.setting.setName = name;
      this.setting.setUrl = url;
    }
    this.router.navigate(['/']);
  }

  /**
   * 絞り込み後の一覧
   */
  get dataList2(): ShowPresetData[]{
    if(this.searchWord == ""){
      return this.dataList;
    }else{
      return this.dataList.filter(
        data => data.name.includes(this.searchWord)
        || (/\u3057\u3044\u304B/.test(data.ruby) ? "\u304F\u308D\u3044\u3057\u3044\u304B" : data.ruby).includes(this.searchWord)
        || (/\u306F\u3084\u307F\u304B\u306A\u3067/.test(data.ruby) ? "\u3082\u307F\u3084\u3067" : data.ruby).includes(this.searchWord));
    }
  }

  /**
   * https://github.com/tjoskar/ng-lazyload-image/issues/197
   */
  workaround(){
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    this.scrollObservable.next();
  }

  /**
   * 入力した検索ワードを記録する
   * @param event 検索ワード
   */
  changeSearchWord(event: string){
    this.setting.searchWord = this.searchWord = event;
  }

  get lazyLoadFlg() {
    return !this.notLazyLoadFlg;
  }
}

class PresetData{
  name: string;
  ruby: string;
  images: string[];
}

class ShowPresetData{
  name: string;
  ruby: string;
  images: string[];
  id: string;
  href: string;
  id2: string;
}
