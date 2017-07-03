import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import {AuthentificationService} from '../core/authentification/authentification.service';

export interface Competition {
  _id?: string;
  title?: string;
  color?: string;
  message?: string;
  createdAt?: Date;
  pictureUrl?: string;
}

export interface CompetitionsContext {
  page: number;
  competitionCount: number;
}

@Injectable()
export class CompetitionService {
  private static ROUTES: string = '/competitions';

  constructor(private http: Http,
              private authentificationService: AuthentificationService) { }

  getCompetitions(context: CompetitionsContext): Observable<Competition[]> {
    let options = {
      params: context
    };
    return this.http.get(CompetitionService.ROUTES, options)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteCompetition(competition: Competition): Observable<any> {
    let header = new Headers();
    header.set('Authorization', this.authentificationService.getToken());
    return this.http.delete(`${CompetitionService.ROUTES}/${competition._id}`, {
      headers: header
    })
      .map((res: Response) => {
        return res.json();
      });
  }

  updateCompetition(competition: Competition): Observable<any> {
    let header = new Headers();
    header.set('Authorization', this.authentificationService.getToken());
    return this.http.put(`${CompetitionService.ROUTES}/${competition._id}`, _.pick(competition, ['title', 'color', 'message']),{
      headers: header
    })
      .map((res: Response) => {
        return res.json();
      });
  }

  createCompetition(competition: Competition): Observable<any> {
    let header = new Headers();
    header.set('Authorization', this.authentificationService.getToken());
    return this.http.post(CompetitionService.ROUTES, competition, {
      headers: header
    })
      .map((res: Response) => {
        return res.json();
      });
  }
}
