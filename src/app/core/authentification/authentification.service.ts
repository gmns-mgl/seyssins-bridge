import 'rxjs/add/observable/throw';

import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Logger} from '../logger.service';
import {HttpService} from "../http/http.service";
import {Observable, Subject, ReplaySubject} from "rxjs";
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
  private static USER_ROUTE = '/add-user';
  private authentificationObserver: Subject<boolean> = new ReplaySubject(1);

  constructor(private httpService: Http) {
  }

  addUser(email: string): Observable<any> {
    return this.httpService.post(AuthentificationService.USER_ROUTE, {
      email: email
    }).map((res: Response) => res.json());
  }
  /**
   * Performs any type of http request.
   * You can customize this method with your own extended behavior.
   */
  login(username: string, password: string): Observable<any> {
    log.info('user authentification...');

    return this.httpService.post(AuthentificationService.ROUTE, {
      username: username,
      password: password
    }).map((res: Response) => res.json());
  }

  isAuthentificated(): Promise<boolean> {
    if (!localStorage.getItem(TOKEN_KEY)) {
      return Promise.resolve(false);
    }
    let header = new Headers();
    header.set('Authorization', localStorage.getItem(TOKEN_KEY));
    return this.httpService.get(AuthentificationService.ROUTE, {
      headers: header
    }).toPromise().then(() => true, () => false);
  }

  get getAuthentificationObserver(): Observable<boolean> {
    return this.authentificationObserver.asObservable();
  }

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    this.authentificationObserver.next(token ? true : false);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  clearToken() {
    localStorage.setItem(TOKEN_KEY, '');
    this.authentificationObserver.next(false);
  }

}
