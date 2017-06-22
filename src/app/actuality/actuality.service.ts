import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const routes = {
  actualities: (c: ActualitiesContext) => `/api/actuality?page=${c.page}&count=${c.actualityCount}`
};

export interface Actuality {
  title: string;
  titleColor: string;
  message: string;
  creationDate: Date;
  pictureUrl?: string;
}

export interface ActualitiesContext {
  page: number;
  actualityCount: number;
}

@Injectable()
export class ActualityService {

  constructor(private http: Http) { }

  getActualities(context: ActualitiesContext): Observable<Actuality[]> {
    /*return this.http.get(routes.actualities(context))
      .map((res: Response) => {
        // return res.json();*/
        return new Observable((observer) => {
          observer.next([{
            title: 'Fermeture exceptionnelle !',
            titleColor: '#ff0011',
            creationDate: new Date('2017-03-01T11:00:00.000Z'),
            message: 'La salle de bridge sera exceptionnellement fermée le mardi 27/12/2016. Tous les tournois seront annulés et reportés au 28/12/2016.'
          }, {
            title: 'Fêtes de fin d\'année',
            titleColor: '#548431',
            creationDate: new Date('2017-03-01T10:00:00.000Z'),
            message: 'La salle de bridge sera exceptionnellement fermée le mardi 27/12/2016. Tous les tournois seront annulés et reportés au 28/12/2016.'
          }, {
            title: 'Fermeture exceptionnelle !',
            titleColor: '#11e411',
            creationDate: new Date('2017-02-01T18:00:00.000Z'),
            message: 'La salle de bridge sera exceptionnellement fermée le mardi 27/12/2016. Tous les tournois seront annulés et reportés au 28/12/2016.'
          }, {
            title: 'Fermeture exceptionnelle !',
            titleColor: '#11e411',
            creationDate: new Date('2017-01-01T11:00:00.000Z'),
            message: 'La salle de bridge sera exceptionnellement fermée le mardi 27/12/2016. Tous les tournois seront annulés et reportés au 28/12/2016.'
          }, {
            title: 'Fermeture exceptionnelle !',
            titleColor: '#11e411',
            creationDate: new Date('2017-01-01T11:00:00.000Z'),
            message: 'La salle de bridge sera exceptionnellement fermée le mardi 27/12/2016. Tous les tournois seront annulés et reportés au 28/12/2016.'
          }, {
            title: 'Fermeture exceptionnelle !',
            titleColor: '#11e411',
            creationDate: new Date('2017-01-01T11:00:00.000Z'),
            message: 'La salle de bridge sera exceptionnellement fermée le mardi 27/12/2016. Tous les tournois seront annulés et reportés au 28/12/2016.'
          }, {
            title: 'Fermeture exceptionnelle !',
            titleColor: '#11e411',
            creationDate: new Date('2017-01-01T11:00:00.000Z'),
            message: 'La salle de bridge sera exceptionnellement fermée le mardi 27/12/2016. Tous les tournois seront annulés et reportés au 28/12/2016.'
          }, {
            title: 'Fermeture exceptionnelle !',
            titleColor: '#11e411',
            creationDate: new Date('2017-01-01T11:00:00.000Z'),
            message: 'La salle de bridge sera exceptionnellement fermée le mardi 27/12/2016. Tous les tournois seront annulés et reportés au 28/12/2016.'
          }, {
            title: 'Fermeture exceptionnelle !',
            titleColor: '#11e411',
            creationDate: new Date('2017-01-01T11:00:00.000Z'),
            message: 'La salle de bridge sera exceptionnellement fermée le mardi 27/12/2016. Tous les tournois seront annulés et reportés au 28/12/2016.'
          }, {
            title: 'Fermeture exceptionnelle !',
            titleColor: '#11e411',
            creationDate: new Date('2017-01-01T11:00:00.000Z'),
            message: 'La salle de bridge sera exceptionnellement fermée le mardi 27/12/2016. Tous les tournois seront annulés et reportés au 28/12/2016.'
          }]);
          observer.complete();
        });
      //});
  }

}
