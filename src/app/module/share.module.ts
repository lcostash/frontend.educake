import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ModalModule, BsModalService} from 'ngx-bootstrap/modal';

import {LocalizedDatePipe, SafeContentPipe} from '../pipe';
import {ShareService} from '../service';
import {AboutAppComponent} from './share/about-app';
import {CheckComponent} from './share/check';
import {FooterComponent} from './share/footer';
import {HeaderComponent} from './share/header';
import {LoadingComponent} from './share/loading';
import {PageNotFoundComponent} from './share/page-not-found';

@NgModule({
  declarations: [
    LocalizedDatePipe,
    SafeContentPipe,
    AboutAppComponent,
    CheckComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    BsModalService,
    ShareService
  ],
  entryComponents: [],
  exports: [
    LocalizedDatePipe,
    SafeContentPipe,
    AboutAppComponent,
    CheckComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    PageNotFoundComponent
  ]
})
export class ShareModule {
}
