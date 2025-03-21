import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { TypeClassPipe } from './shared/pipes/type-class.pipe';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [AppComponent, MainComponent, CardComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, TypeClassPipe],
})
export class AppModule {}
