import {GlobalConfig, ToastrService} from 'ngx-toastr';
import {TipoComponentEnum, ToastSnackbarNotification} from './toast.snackbar.notification';

export class Snackbar extends ToastSnackbarNotification {

    constructor(toastr: ToastrService) {
        super(toastr, <GlobalConfig>{
            positionClass: 'toast-top-center',
            closeButton: false,
            progressBar: false
        }, TipoComponentEnum.SNASKBAR);
    }
}