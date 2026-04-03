import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from './components/ui/button/button';
import { Input } from './components/ui/input/input';

@NgModule({
  declarations: [Button, Input],
  imports: [CommonModule],
})
export class SharedModule {}
