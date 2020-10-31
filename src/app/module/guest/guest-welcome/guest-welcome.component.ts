import {Component, OnInit} from '@angular/core';
import {AuthService, ShareService} from '../../../service';
import {AjaxResponseInterface, AuthInterface, FactorInterface, IntensityInterface} from '../../../interface';
import {AjaxActionEnum} from '../../../enum';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-guest-welcome',
  templateUrl: './guest-welcome.component.html',
  styleUrls: ['./guest-welcome.component.scss']
})
export class GuestWelcomeComponent implements OnInit {
  public auth: AuthInterface;
  public dateTime: string = environment.app.format.dateTime;
  public factors: Array<FactorInterface> = [];
  public rows: Array<IntensityInterface> = [];

  /**
   * @param authService AuthService
   * @param shareService ShareService
   */
  constructor(
    private authService: AuthService,
    private shareService: ShareService) {
    this.auth = this.authService.getAuth;
  }

  ngOnInit(): void {
    this.shareService.doAction('intensity/factors', AjaxActionEnum.View, {}).subscribe(
      (response: AjaxResponseInterface) => {
        this.factors = (response.rows ? response.rows : {}) as Array<FactorInterface>;
      }, () => {
      }
    );
    this.shareService.doAction('intensity/date', AjaxActionEnum.View, {}).subscribe(
      (response: AjaxResponseInterface) => {
        this.rows = (response.rows ? response.rows : {}) as Array<IntensityInterface>;
      }, () => {
      }
    );
  }
}
