import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { ClientService } from "../../../_services/client.service";
import { DataSharingService }  from '../../../_services/data-sharing';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  public clients:any = [];
  public returnUpdate:string = '';
  public currentPaginate:number = 1;
  public limitPaginate:number = 1;
  public paginates:any = [];

  constructor(private dataSharingService:DataSharingService, private router: Router, private clientService: ClientService) { }

  ngOnInit() {
    
    if(!sessionStorage.getItem("userLogged")) {
      this.router.navigate(['login']);
      return;
    }

    if(history.state.data){
      this.returnUpdate = history.state.data.menssagem;
      setTimeout(() => {
        this.returnUpdate  ='';
      }, 3000);
     }

     this.loadData();
    
  }


  loadData(){
    this.paginates = [];
    this.clientService.listClients({}).then((response: any) => {
      this.dataSharingService.isUserLoggedIn.next(true);  
        this.clients = response.docs;
        this.limitPaginate = response.pages;
        for (let index = 0; index < response.pages; index++) {
          this.paginates.push(index+1);
        }
      }, error => {
        console.log(error)
      });
  }

  deleteClient(clientId:string, name:string): void {
    if(confirm(`Tem certeza que deseja excluir o registro: ${name}`)) {
      this.clientService.deletClient(clientId).then( data => {
        this.clients = this.clients.filter(client => client._id !== clientId);
      })
      this.returnUpdate = `Cliente: ${clientId} foi excluido.`;
      if(Object.keys(this.clients).length <= 1) this.loadData();
      setTimeout(() => {
        this.returnUpdate  ='';
      }, 3000);
    }
  };

  editClient(client): void {
    this.router.navigate(['edit-client'], { state: { data: { client:client}}});
  };

  addClient(): void {
    this.router.navigate(['add-client']);
  };

  updatePaginate(page:number){
    this.clientService.listClients({page:page}).then((response: any) => {
        this.clients = response.docs;
        this.currentPaginate = page;
        this.limitPaginate = response.pages
      }, error => {
        console.log(error)
      });
  }

  incrementPaginate(){
    if(this.limitPaginate >= (this.currentPaginate+1)) this.updatePaginate(this.currentPaginate+1);
  }

  
}