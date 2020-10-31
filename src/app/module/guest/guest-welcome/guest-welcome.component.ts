import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service';
import {ActionInterface, AuthInterface} from '../../../interface';

@Component({
  selector: 'app-guest-welcome',
  templateUrl: './guest-welcome.component.html',
  styleUrls: ['./guest-welcome.component.scss']
})
export class GuestWelcomeComponent implements OnInit {
  public auth: AuthInterface;
  public action: ActionInterface = {isInit: false, isBusy: false, isRefresh: false};

  /**
   * @param authService AuthService
   */
  constructor(private authService: AuthService) {
    this.auth = this.authService.getAuth;
  }

  ngOnInit(): void {

  }
}
