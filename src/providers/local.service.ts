import { Injectable } from '@angular/core'
import { ToastController, Toast } from 'ionic-angular';
import { AuthService } from './auth.service';

@Injectable()

export class LocalService {
    authenticated: boolean;

    constructor(private toaster: ToastController) {
      

    }

    presentToast(message: string, position: string, showButton: boolean, duration: number): Promise<void> {
        let toast: Toast = this.toaster.create({
            message: message,
            duration: duration,
            showCloseButton: showButton,
            position: position,
            dismissOnPageChange: false
        })
        return toast.present()
    }
}