import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { ClientService } from "../../../_services/client.service";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private clientService: ClientService) { }

  public userEdit = [];
  public editForm: FormGroup;
  public erroCep:string = '';


  public texto:string = 'Busto de Tamandaré';
  public lat:number = -7.1193352;
  public lng:number = -34.8257926;
  public zoom:number = 15;
  public objMap: any;

 
  ngOnInit() {
    
    if(!JSON.parse(sessionStorage.getItem("userLogged")).token) {
      this.router.navigate(['login']);
      return;
    }
 
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      addrZipcode: ['', Validators.required],
      addrStreet: ['', Validators.required],
      addrNumber: ['', Validators.required],
      addrCity: ['', Validators.required],
      addrState: ['', Validators.required],
      addrCountry: ['BR', Validators.required]
    });

  }

  onSubmit() {
    this.clientService.creatClient(this.editForm.value).then( data => {
          this.router.navigate(['list-client'], { state: { data: { menssagem:`Cliente cadastrado com sucesso.`}}});
    }).catch(errorResponse => {
      alert(errorResponse.error.message);
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
    }).catch(errorResponse => {
      alert(errorResponse.error.message);
    });
  }

}
