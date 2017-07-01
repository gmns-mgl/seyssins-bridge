export class Util {

  static copy<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
  }

}
