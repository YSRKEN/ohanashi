import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PresetComponent } from './preset/preset.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'preset', component: PresetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
