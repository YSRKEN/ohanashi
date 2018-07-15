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

  urlList: string[] = [];

  constructor(private http: HttpClient, private setting: SettingService, private router: Router) { }

  async ngOnInit() {
    const text = await this.http.get('assets/preset_list.txt' ,{ responseType: 'text' }).toPromise();
    this.urlList = text.split("\n");
  }

  click(url: string){
    this.setting.setUrl = url;
    this.router.navigate(['/']);
  }
}
