import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './angular-material/angular-material.module';
import { TablePaginationComponent } from './angular-material/components/table-pagination/table-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LaureateNamesPipe } from './pipes/laureate-names.pipe';
import { NobelListComponent } from './components/nobel-list/nobel-list.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthGuard } from './guard/auth.guard';
import { InfoDialogComponent } from './angular-material/components/info-dialog/info-dialog.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { NobelListShowComponent } from './components/nobel-list-show/nobel-list-show.component';
import { NobelDetailsComponent } from './components/nobel-details/nobel-details.component';
import { NobelImageComponent } from './components/nobel-image/nobel-image.component';
import { NobelFilterComponent } from './components/nobel-filter/nobel-filter.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@NgModule({
  imports: [
    MatIconModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    TablePaginationComponent,
    NobelListComponent,
    NobelListShowComponent,
    NobelDetailsComponent,
    NobelImageComponent,
    LaureateNamesPipe,
    InfoDialogComponent,
    LoginComponent,
    NobelFilterComponent,
    SpinnerComponent
  ],
  entryComponents: [
    InfoDialogComponent
  ],
  providers: [
    AuthGuard,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      },
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
  
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
      {
        provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
      }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
