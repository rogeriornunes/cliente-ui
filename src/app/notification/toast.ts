import {GlobalConfig, ToastrService} from 'ngx-toastr';
import {TipoComponentEnum, ToastSnackbarNotification} from './toast.snackbar.notification';

export class Toast extends ToastSnackbarNotification {

    constructor(toastr: ToastrService) {
        super(toastr, <GlobalConfig>{
            newestOnTop: false
        }, TipoComponentEnum.TOAST);
    }
}
