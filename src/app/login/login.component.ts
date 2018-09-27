import { Component } from '@angular/core';
import { UserService } from '../api/user.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public credentials = {username: '', password: ''};
  private redirect: string;

  constructor(public user: UserService, private router: Router, route: ActivatedRoute) {
    route.queryParams.subscribe(params => this.redirect = params['redirect']);
  }

  public login() {
    this.user.login(this.credentials).then(() => {
      if (this.redirect) this.router.navigateByUrl(this.redirect).then();
      else this.router.navigate(['']).then();
    }, (error) => console.error(error));
  }

}
