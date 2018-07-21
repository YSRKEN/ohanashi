import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  constructor(private setting: SettingService) { }

  ngOnInit() {
  }
  
  ngAfterContentInit(){
    if(this.setting.canvas != null){
      var div = document.getElementById("canvas");
      div.appendChild(this.setting.canvas);
    }
  }
}
