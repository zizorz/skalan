import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imageSrc'
})
export class ImageSrcPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `${environment.apiBaseUrl}/images/${value}`;
  }

}
