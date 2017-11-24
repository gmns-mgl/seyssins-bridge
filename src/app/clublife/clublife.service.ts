import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {AuthentificationService} from '../core/authentification/authentification.service';

export interface Clublife {
  _id?: string;
  title?: string;
  color?: string;
  message?: string;
  createdAt?: Date;
  pictureUrl?: string;
  dropboxPath?: string;
}

export interface ClublifeContext {
  page: number;
  clublifeCount: number;
}

@Injectable()
export class ClublifeService {
  private static ROUTES = '/clublife';

  constructor(private http: Http,
              private authentificationService: AuthentificationService) {
  }

  getClublife(context: ClublifeContext): Observable<Clublife[]> {
    const options = {
      params: context
    };
    return this.http.get(ClublifeService.ROUTES, options)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteClublife(clublife: Clublife): Observable<Clublife> {
    const header = new Headers();
    header.set('Authorization', this.authentificationService.getToken());
    return this.http.delete(`${ClublifeService.ROUTES}/${clublife._id}`, {
      headers: header
    })
      .map((res: Response) => {
        return res.json();
      });
  }

  updateClublife(clublife: Clublife): Observable<Clublife> {
    const header = new Headers();
    header.set('Authorization', this.authentificationService.getToken());
    return this.http.put(`${ClublifeService.ROUTES}/${clublife._id}`,
      _.pick(clublife, ['title', 'color', 'message']),
      {
        headers: header
      })
      .map((res: Response) => {
        return res.json();
      });
  }

  createClublife(clublife: Clublife): Observable<Clublife> {
    const header = new Headers();
    header.set('Authorization', this.authentificationService.getToken());
    return this.http.post(ClublifeService.ROUTES, clublife, {
      headers: header
    })
      .map((res: Response) => {
        return res.json();
      });
  }

  uploadFile(clublife: Clublife, file: any): Observable<Clublife> {
    const formData = new FormData();
    formData.append('file', file);
    const header = new Headers();
    header.set('Authorization', this.authentificationService.getToken());
    header.delete('Content-Type');
    return this.http.post(`${ClublifeService.ROUTES}/${clublife._id}/file`, formData, {
      headers: header
    }).map((fileRes: Response) => {
      return fileRes.json();
    });
  }

  downloadFile(clublife: Clublife): Observable<any> {
    return this.http.get(`${ClublifeService.ROUTES}/${clublife._id}/file`)
      .map((fileRes: Response) => {
        return fileRes.json().url;
      });
  }
}
