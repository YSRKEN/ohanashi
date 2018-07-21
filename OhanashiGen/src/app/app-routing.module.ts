import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PresetComponent } from './preset/preset.component';
import { CanvasComponent } from './canvas/canvas.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'preset', component: PresetComponent},
  {path: 'canvas', component: CanvasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
