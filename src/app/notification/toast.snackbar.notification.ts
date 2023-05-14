import {IndividualConfig} from 'ngx-toastr/toastr/toastr-config';
import {ActiveToast, GlobalConfig, ToastrService} from 'ngx-toastr';

export enum TipoComponentEnum {
    TOAST, SNASKBAR
}

export abstract class ToastSnackbarNotification {

    private defaultSettings = <IndividualConfig>{
        enableHtml: true,
        extendedTimeOut: 800,
        progressBar: true,
        closeButton: true,
		positionClass: 'toast-top-center'
    };

    constructor(private _toastr: ToastrService, private individualConfig: GlobalConfig, private tipoComponent: TipoComponentEnum) {
    }

    success(title: string, message: string, disableTimeOut: boolean = false): ActiveToast<any> {
        return this.showMessage(title, message, disableTimeOut, disableTimeOut, 'toast-success');
    }

    error(title: string, message: string, disableTimeOut: boolean = false): ActiveToast<any> {
        return this.showMessage(title, message, disableTimeOut, disableTimeOut, 'toast-error');
    }

    warning(title: string, message: string, disableTimeOut: boolean = false): ActiveToast<any> {
        return this.showMessage(title, message, disableTimeOut, disableTimeOut, 'toast-warning');
    }

    info(title: string, message: string, disableTimeOut: boolean = false): ActiveToast<any> {
        return this.showMessage(title, message, disableTimeOut, disableTimeOut, 'toast-info');
    }

    private showMessage(title: string, message: string, closeButton: boolean, disableTimeOut: boolean, typeMessage: string): ActiveToast<any> {
        return this._toastr.show(message, title, Object.assign(this.defaultSettings, this.individualConfig,
            {
                disableTimeOut: disableTimeOut,
                closeButton: this.tipoComponent === TipoComponentEnum.SNASKBAR ? false : closeButton
            }), typeMessage);
    }
}
