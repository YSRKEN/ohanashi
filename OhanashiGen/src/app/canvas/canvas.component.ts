import { AfterContentInit, Component, OnInit } from '@angular/core';
import { SettingService } from '../setting.service';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
    standalone: false
})
export class CanvasComponent implements OnInit, AfterContentInit {

  constructor(private setting: SettingService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if (this.setting.canvas != null) {
      const div = document.getElementById('canvas');
      div.appendChild(this.setting.canvas);
    }
  }
}
