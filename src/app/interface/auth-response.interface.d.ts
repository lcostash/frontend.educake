import {AjaxResponseInterface} from './ajax-response.interface';
import {UserRoleEnum} from '../enum';

export declare interface AuthResponseInterface extends AjaxResponseInterface {
  token: string;
  profile: {
    uuid: string;
    firstName: string;
    lastName: string;
    role: UserRoleEnum;
  };
  settings?: string;
}
