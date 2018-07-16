import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingService } from '../setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preset',
  templateUrl: './preset.component.html',
  styleUrls: ['./preset.component.scss']
})
export class PresetComponent implements OnInit {

  dataList: ShowPresetData[] = [];

  constructor(private http: HttpClient, private setting: SettingService, private router: Router) { }

  async ngOnInit() {
    const text = await this.http.get<PresetData[]>('assets/preset_list.json').toPromise();
    let i = 1;
    this.dataList = text.map(temp => {
      const temp2 = new ShowPresetData();
      temp2.name = temp.name;
      temp2.images = temp.images;
      temp2.href = "#collapse" + i;
      temp2.id = "heading" + i;
      temp2.id2 = "collapse" + i;
      ++i;
      return temp2;
    });
    console.log(this.dataList);
  }

  click(name: string, url: string){
    this.setting.setName =name;
    this.setting.setUrl = url;
    this.router.navigate(['/']);
  }
}

class PresetData{
  name: string;
  images: string[];
}

class ShowPresetData{
  name: string;
  images: string[];
  id: string;
  href: string;
  id2: string;
}
