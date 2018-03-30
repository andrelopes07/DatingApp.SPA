import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../_services/auth.service';
import 'rxjs/add/operator/catch';
import { UserService } from '../_services/user.service';
import { Message } from '../_models/message';

@Injectable()
export class MessageResolver implements Resolve<Message[]> {
    pageSize = 5;
    pageNumber = 1;
    messageContainer = 'Unread';

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
            return this.userService.getMessages(this.authService.decodedToken.nameid,
                this.pageNumber, this.pageSize, this.messageContainer).catch(error => {
                    this.alertify.error('Problem retrieving data');
                    this.router.navigate(['/members']);
                    return Observable.of(null);
                });
        }
}
