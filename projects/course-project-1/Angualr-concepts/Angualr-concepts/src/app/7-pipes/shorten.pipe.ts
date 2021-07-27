import {Pipe, PipeTransform} from "@angular/core";

/**
 * A pipe class that implements PipeTransform
 */

@Pipe({
  name:'shorten'
})
export class ShortenPipe implements PipeTransform{


  /**
   *
   * @param value holds the interpolated value used in the template it could of any type
   * @param limit is our argument which states the limit of charters we want
   */
  transform(value: any,limit:number): any {

    if(value.length > 10){
    return value.substr(0,limit) + ' ...';
    }
    return value;
  }




}
