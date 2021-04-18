import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {debounceTime} from 'rxjs/operators';
@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  formulario:FormGroup;
  constructor() { 
    this.formulario = new FormGroup({
      nombre: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
      ]),
      apellidos:new FormControl('',[
        Validators.maxLength(5)
      ]),
      edad:new FormControl('',[
        this.edadValidacion
      ]),
      dni:new FormControl('',[
        this.dniValidar
      ]),
      password:new FormControl(''),
      repitePassword:new FormControl(''),
      email:new FormControl('',[
        Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      ]),
    });
  }

  ngOnInit(): void {
    const emailControl = this.formulario.controls['email'];
    emailControl.valueChanges.pipe(debounceTime(1000)).subscribe(value=>{
      console.log(value);
    });
  }

  onSubmit(){
    console.log(this.formulario.value);
  }

  edadValidacion(formControl){
    const value = formControl.value;
    const max = 65;
    const min = 18;

    if(value >= 18 && value <=65){
      return null;
    }else{
      return {edadValidacion:{min,max}};
    }

    return null;
  }

  dniValidar(formControl){
    const value=formControl.value;
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKET'
    
    if(/^\d{8}[a-zA-Z]$/.test(value)){
      const numero = value.substr(0, value.length - 1);
      const letra = value.charAt(value.length-1);
      const calculo = numero%23;
      const letraSeleccionada = letras.charAt(calculo);
      if(letra.toLowerCase() == letraSeleccionada){
        return null;
      }else{
        return { dniValidar:'La letra no coicide con el numero'};
      }
    }else{
      return  { dniValidar:'La letra no tiene formato'};
    }
    return null;
  }

}
