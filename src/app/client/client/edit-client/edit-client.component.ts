import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ClientService } from "../../../_services/client.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  public userEdit = [];
  public editForm: FormGroup;
  public erroCep:string = '';


  public texto:string = 'Busto de Tamandaré';
  public lat:number = -7.1193352;
  public lng:number = -34.8257926;
  public zoom:number = 15;
  public objMap: any;

  constructor(private formBuilder: FormBuilder,private router: Router, private clientService: ClientService) { }

  ngOnInit() {
    
   if(!history.state.data){
    this.router.navigate(['list-client']);
    return;
   }
 
   this.userEdit  = history.state.data.client;

    this.editForm = this.formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      addrZipcode: ['', Validators.required],
      addrStreet: ['', Validators.required],
      addrNumber: ['', Validators.required],
      addrCity: ['', Validators.required],
      addrState: ['', Validators.required],
      addrCountry: ['BR', Validators.required],
      datetime: [null],
      __v: [null],
    });

    this.editForm.setValue(this.userEdit);
    if(this.editForm.value.addrZipcode.length == 8 ) this.getCep()
  }

  onSubmit() {
    this.clientService.updateClient(this.editForm.value, this.editForm.get("_id").value).then( data => {
          this.router.navigate(['list-client'], { state: { data: { menssagem:`Registro ${this.editForm.get("_id").value} atualizado.`}}});
    }, error => {
      alert(error);
    });
  }

  cepOnKeydownEvent(){
    if(this.editForm.value.addrZipcode.length == 8 ){
       this.getCep()
    } 
  }

  getCep(){
    this.clientService.getAddress(this.editForm.value.addrZipcode).then( response =>{
      if(response.erro){
        this.erroCep = "Verifique o cep digitado", 'Ocorreu um erro!';
        return null
      }
      this.editForm.patchValue({
        addrStreet: response.logradouro,
        addrCity: response.localidade,
        addrState: response.uf
      });
      this.mountMapClient(response.logradouro, response.localidade);
    });
  }

  mapReady(event:any){
    this.objMap = event;
  }

  mountMapClient(street:string, city:string){
    this.clientService.getLatLong(street, city).then( data => {
      this.texto = street;
      this.lat= data[0].lat;
      this.lng = data[0].lon;
      this.zoom = 15;
      this.objMap.setCenter({ lat: parseFloat(data[0].lat), lng:parseFloat(data[0].lon) });
      }, error => {
        alert(error);
      });
  }

}