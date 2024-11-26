import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyAfter'
})
export class CurrencyAfterPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    if (value == null) {
      return ''; 
    }
    const formattedValue = value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${formattedValue} €`;  
  }
}
