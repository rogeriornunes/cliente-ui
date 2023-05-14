import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Snackbar} from './Snackbar';
import {Toast} from './toast';

@Injectable()
export class NotificationService {

    public snackbar: Snackbar;
    public toast: Toast;

    constructor(toastr: ToastrService) {
        this.snackbar = new Snackbar(toastr);
        this.toast = new Toast(toastr);
    }
}
