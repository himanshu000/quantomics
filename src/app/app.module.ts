import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSelectModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { PlotDataComponent } from './dashboard/plot-data/plot-data.component';
import { ChartsModule } from 'ng2-charts';
import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlotDataComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatSelectModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
