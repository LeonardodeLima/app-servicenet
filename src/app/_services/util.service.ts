import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export default class UtilService {

    constructor(private httpClient: HttpClient) { }

    getAddress(cep: string):Promise<any> {   
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json`).toPromise();
    }

}
