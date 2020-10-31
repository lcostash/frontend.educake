import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Subscription} from 'rxjs';
import {AuthService, ShareService} from '../../../service';
import {AjaxResponseInterface, AuthInterface, IntensityInterface} from 'src/app/interface';
import {ToastrService} from 'ngx-toastr';
import {AjaxActionEnum, UserRoleEnum} from '../../../enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public auth: AuthInterface;
  public intensity: IntensityInterface;
  private readonly authSubscription: Subscription;
  private readonly messageSubscription: Subscription;

  /**
   * @param authService AuthService
   * @param shareService ShareService
   * @param router Router
   * @param toastrService ToastrService
   * @param modalService BsModalService
   */
  constructor(
    private authService: AuthService,
    private shareService: ShareService,
    private router: Router,
    private toastrService: ToastrService,
    private modalService: BsModalService) {
    this.authSubscription = this.authService.AuthSubject.subscribe(() => {
      this.auth = this.authService.getAuth;
      if (this.auth.isLogged) {
        this.goToDefaultPage();
      }
    });
    this.messageSubscription = this.shareService.ToastrSubject.subscribe((response: AjaxResponseInterface) => {
      if (response && response.message && response.message.length !== 0) {
        if (response.status === 200) {
          this.toastrService.success(response.message, 'Request Accepted');
        } else if (response.status === 400) {
          this.toastrService.warning(response.message, 'Something Wrong');
        } else {
          this.toastrService.error(response.message, 'Something Wrong');
        }
      }
    });
  }

  ngOnInit(): void {
    this.auth = this.authService.getAuth;
    this.shareService.doAction('intensity', AjaxActionEnum.View, {}).subscribe((response: AjaxResponseInterface) => {
      this.intensity = (response.rows ? response.rows[0] : {}) as IntensityInterface;
    }, () => {
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  /**
   * @since 0.0.1
   * @return void
   */
  private goToDefaultPage(): void {
    const url: string = this.auth.role === UserRoleEnum.Guest ? '/' : this.auth.path + '/dashboard';
    this.router.navigate([url]).then();
  }
}
