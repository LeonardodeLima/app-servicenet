import { Injectable } from '@angular/core';
import { API_URL } from '../configs';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    private router_list_clients = 'client/list'
    
    private router_creat_cliente = 'client/create'
    private router_get_client = 'client/read'
    private router_update_cliente = 'client/update' 
    private router_delet_delet = 'client/delete'
    
    constructor(private httpClient: HttpClient, private externalHttpClient: HttpClient, private handler: HttpBackend) { }

    listClients(params?: any){
        let url = API_URL+this.router_list_clients;
        let queryString = this.build_query(params);
        if(queryString){
            url += '?'+queryString;
        }
    return this.httpClient.get(url).toPromise();
    }

    creatClient(params: any){
        let url = API_URL+this.router_creat_cliente;
    return this.httpClient.post(url, params).toPromise();
    }

    readClient(id:string){
        let url = API_URL+this.router_get_client+`/${id}`;
    return this.httpClient.get(url).toPromise();
    }

    updateClient(params: any, id:string){
        let url = API_URL+this.router_update_cliente+`/${id}`;
    return this.httpClient.put(url, params).toPromise();
    }

    deletClient(id:string){
        let url = API_URL+this.router_delet_delet+`/${id}`;
    return this.httpClient.delete(url).toPromise();
    }


    getAddress(cep: string):Promise<any> {  
        this.externalHttpClient = new HttpClient(this.handler);
        return this.externalHttpClient.get(`https://viacep.com.br/ws/${cep}/json`).toPromise();
    }

    getLatLong(street: string, city: string):Promise<any> {  
        this.externalHttpClient = new HttpClient(this.handler);
        return this.externalHttpClient.get(`https://nominatim.openstreetmap.org/search?street="${street}"&city=${city}&format=json`).toPromise();
    }
    

    build_query(obj) {
    var str = [];
    for (var p in obj){
        if(Array.isArray(obj[p])){
        for(let i=0; i < obj[p].length; i ++){
            str.push(encodeURIComponent(p+'[]') + "=" + encodeURIComponent(obj[p][i]));
        }
        }
        else if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
        return str.join("&");
    }

}