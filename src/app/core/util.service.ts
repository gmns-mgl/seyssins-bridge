export class Util {

  static copy<T>(object: T): T {
    if (!object) {
      return;
    }
    return JSON.parse(JSON.stringify(object));
  }

}
