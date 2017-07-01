import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import {AuthentificationService} from "../core/authentification/authentification.service";

export interface Actuality {
  _id?: string;
  title?: string;
  color?: string;
  message?: string;
  createdAt?: Date;
  pictureUrl?: string;
}

export interface ActualitiesContext {
  page: number;
  actualityCount: number;
}

@Injectable()
export class ActualityService {
  private static ROUTES: string = '/actualities';

  constructor(private http: Http,
              private authentificationService: AuthentificationService) { }

  getActualities(context: ActualitiesContext): Observable<Actuality[]> {
    let options = {
      params: context
    };
    return this.http.get(ActualityService.ROUTES, options)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteActuality(actuality: Actuality): Observable<any> {
    let header = new Headers();
    header.set('Authorization', this.authentificationService.getToken());
    return this.http.delete(`${ActualityService.ROUTES}/${actuality._id}`, {
      headers: header
    })
      .map((res: Response) => {
        return res.json();
      });
  }

  updateActuality(actuality: Actuality): Observable<any> {
    let header = new Headers();
    header.set('Authorization', this.authentificationService.getToken());
    return this.http.put(`${ActualityService.ROUTES}/${actuality._id}`, _.pick(actuality, ['title', 'color', 'message']),{
      headers: header
    })
      .map((res: Response) => {
        return res.json();
      });
  }

  createActuality(actuality: Actuality): Observable<any> {
    let header = new Headers();
    header.set('Authorization', this.authentificationService.getToken());
    return this.http.post(ActualityService.ROUTES, actuality, {
      headers: header
    })
      .map((res: Response) => {
        return res.json();
      });
  }
}
