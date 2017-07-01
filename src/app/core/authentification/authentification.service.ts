import 'rxjs/add/observable/throw';

import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Logger} from '../logger.service';
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

const log = new Logger('HttpService');

const TOKEN_KEY = 'TOKEN_SAVED';

/**
 * Provides a base framework for http service extension.
 * The default extension adds support for API prefixing, request caching and default error handler.
 */
@Injectable()
export class AuthentificationService {

  private static ROUTE = '/auth';

  constructor(private httpService: Http) {
  }

  /**
   * Performs any type of http request.
   * You can customize this method with your own extended behavior.
   */
  login(username: string, password: string): Observable<Response> {
    log.info('user authentification...');

    return this.httpService.post(AuthentificationService.ROUTE, {
      username: username,
      password: password
    })
  }

  isAuthentificated(): Promise<Boolean> {
    let header = new Headers();
    header.set('Authorization', localStorage.getItem(TOKEN_KEY));
    return this.httpService.get(AuthentificationService.ROUTE, {
      headers: header
    }).toPromise().then(() => true, () => false);
  }

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  clearToken() {
    localStorage.setItem(TOKEN_KEY, '');
  }

}
