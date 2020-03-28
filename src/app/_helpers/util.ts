import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })

export default class Util{
  
    constructor(){ }

  
  validCPF(strCPF) {
      strCPF = strCPF.replace(/[^0-9]/g, '');
      let Soma;
      let Resto;
      Soma = 0;
    if (strCPF == "00000000000") return false;
      
    for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
    
    Soma = 0;
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;
    
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
      return true;
  }


  getQueryParam() {
   var query = location.search.slice(1);
    var params = query.split('&');
    var data:any = {};
    params.forEach(function (part) {
        var keyValue = part.split('=');
        var key = keyValue[0];
        var value = keyValue[1];
        data[key] = value;
    });

    return data;
  }
 

}
