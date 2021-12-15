import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUtilsService {

  constructor() { }

  private convert(key: string) {
    return key.replace(/_([a-z])/g, word => word[1].toUpperCase());
  }

  rewriteProperties<T>(object: any) {
    const final: {[key: string]: any} = {};
    Object.entries(object).forEach(([key, value]) => {
      const newKey = this.convert(key);
      final[newKey] = value;
    })
    return final as T;
  }

}
