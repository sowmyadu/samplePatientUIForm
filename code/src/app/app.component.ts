/* tslint:disable:prefer-const */
import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';

interface Scan {
  name: string;
  amount: string;
  value:string;
  discount:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';
  saveForm: FormGroup;
  saveFormTest: FormGroup;
  genderModel;
  genders: string[] = ['Male', 'Female'];
  scan_amount;
  scan;
  calculatedAge;
  disc;
  minAppt;
  genderSelected;
  scans: Scan[] = [
    {name: 'CT BRAIN', amount: '2000',value:'1',discount:'5'},
    {name: 'CT PNS', amount: '1000',value:'2',discount:'20'},
    {name: 'MRI BRAIN', amount: '3000',value:'3',discount:'10'},
    {name:'MRI PNS',amount:'2400',value:'4',discount:'30'},
    {name:'GLUCOSE FASTING',amount:'130',value:'5',discount:'10'},
    {name:'SUGAR TESTING',amount:'300',value:'6',discount:'5'}
  ];
  constructor(private formBuilder: FormBuilder) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.saveForm = this.formBuilder.group({
      name: '',
      gender: '',
      age: '',
      dob: '',
      appointment:'',
      phone:'',
      address1:'',
      address2:'',
      address_state:'',
      country:'',
      postal:'',
      city:''
    });

    this.saveFormTest = this.formBuilder.group({
      orders:this.formBuilder.array([]),
      // medical_scan:'',
      // discount:'',
    });

    //const currentYear = moment().year();
    const currentDate= new Date()
    this.minAppt = currentDate;

  }

  showAmount(scan){
    //console.log(event.target.value);
    console.log(scan);
    this.scan_amount = scan.amount;
  }

  orders() : FormArray {
    return this.saveFormTest.get("orders") as FormArray
  }

  newOrder(): FormGroup {
    return this.formBuilder.group({
      medical_scan: this.scan,
      discount: this.disc,
    })
  }

  addOrder() {
    this.orders().push(this.newOrder());
  }

  removeOrder(i:number) {
    this.orders().removeAt(i);
  }


  get form_data(){
    return this.saveForm.controls;
  }

  public saveFormDetails(){
    const formData = this.form_data;
    console.log(this.saveForm.value);
    console.log(this.saveFormTest.value);
  }

  getAge(){
    if(this.form_data.dob){
      var timeDiff = Math.abs(Date.now() - this.form_data.dob.value);
      var age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      this.calculatedAge = age;
    }
  }

}
