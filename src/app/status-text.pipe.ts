import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusText'
})
export class StatusTextPipe implements PipeTransform {

  transform(status: string) :string {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'reviewed':
        return 'تم مراجعة الطلب';
      case 'first acceptance':
        return 'تم الموافقه مبدئياً';
      case 'final acceptance':
        return ' تم الموافقه النهائيه';
      default:
        return ''
    }
  }

}
