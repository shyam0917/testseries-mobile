import { Injectable, EventEmitter } from '@angular/core';
import { SnackBar, SnackBarOptions } from "nativescript-snackbar";
import { MessageConfig } from "./../config/message-config.constants";
import { AuthenticationService } from './authentication.service';
// import { TNSFancyAlert,TNSFancyAlertButton } from "nativescript-fancyalert";//TNSFancyAlertButton
//import swal  from 'sweetalert2' ;

@Injectable()
export class MessageService {
  public showLoader: EventEmitter<any> = new EventEmitter();
  public snackbar: SnackBar;
  public options: SnackBarOptions
  constructor(private authenticationService: AuthenticationService) {
    this.snackbar = new SnackBar();
  }
  public onError(error:any) {
    let message = error.json().msg;
    if (message == undefined || message == '') {
      message = "Server error";
    }
    if (error.status === 401) {
      message = MessageConfig.TOKEN_CONFIG.SESSION_TIMEOUT;
      this.snackbar.simple(message, '#fff', 'red').then((args) => { });
      this.authenticationService.logout();
    } else {
      this.snackbar.simple(message, '#fff', 'red').then((args) => { });
    }
  }
public onErrorMessage(error:string) {
    let message = error || "";
     this.snackbar.simple(message, '#fff', 'red').then(function (args) { });

}
  public onSuccess(message) {
    if (message == undefined || message == '') {
      message = "Success";
    }
    this.snackbar.simple(message, '#fff', 'green').then((args) => {

    });
  }
  /// Show an Action snack bar
  public onActionSnack(optionsParams: any, callback) {

    this.options = {
      actionText: optionsParams.actionText,
      actionTextColor: optionsParams.actionTextColor, // Optional, Android only
      snackText: optionsParams.snackText ? optionsParams.snackText : 'Error',
      textColor: optionsParams.textColor, // Optional, Android only
      hideDelay: optionsParams.hideDelay,
      backgroundColor: optionsParams.backgroundColor // Optional, Android only
    };

    this.snackbar.action(this.options).then((args) => {
      callback(args);
 
    });
  }


  //for success message
  successMessage(title: string, text: string, callback = null) {
  
  }

  //for error message
  errorMessage(title: string, text: string, callback = null) {
  
  }

  deleteConfirmation(callback = null) {
  }

  // Show message about access token required to search private videos from Youtube/Vimeo 
  tokenConfirmation(successCB = null, cancelCB = null) {

  }

  /*
  * confirmation alert
  */
  confirmation(text: string, confirmButtonText: string, callback = null, title: string = 'Are you sure?') {

  }
  showSuccess(){

}
}
