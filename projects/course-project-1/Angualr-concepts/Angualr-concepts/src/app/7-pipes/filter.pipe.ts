import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',

  // true by default which prevents the pipe running for every change that occurs on component
  // where its being used. Angular did this for performance considerations
  pure:false
})
export class FilterPipe implements PipeTransform {
  /**
   *
   * @param value  holds the interpolated value used in the template it could of any type([],string....)
   *  in this case it will be an array of server objects passed from the template
   * @param filterSting the string presenting the value of the property we want to filter by
   * @param propName property we want to filter by
   */
  transform(value: any, filterSting: string, propName: string): any {

    // return the same value (array) if empty
    if (value.length === 0 || filterSting === '') {
      return value
    }
    // created a new filtered array
    const resultArray = []
    // loop over the servers object array
    for (const item of value) {
      // if the current object's has a property name equal to the one we passed
      // and property value is equal to filterString
      // add this object to the filtered array
      if (item[propName] === filterSting) {
        resultArray.push(item)
      }
    }

    // return the filtered array of objects
    return resultArray
  }

}
