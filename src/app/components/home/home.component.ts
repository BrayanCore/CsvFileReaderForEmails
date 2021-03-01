import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Email } from 'src/app/models/email';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  @ViewChild('csvReader') csvReader: any;

  emails: Email[] = [];

  filterRowsRepeated: boolean = false;

  filterEmailsInvalid: boolean = false;

  filterColumnsRepeated: boolean = false;

  labels: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }
  
  uploadListener($event: any): void {  
  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvArray = (<string>csvData).split(/\r\n|\n/);  
  
        this.labels = this.getHeaderArray(csvArray);  
  
        this.emails = this.getDataArrayFromCSVFile(csvArray, this.labels.length);  

      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  

  filterEmails(): void {

    // Filter rows repeated
    if(this.filterRowsRepeated) {
      
      this.emails.forEach(
        email => {

          let appearances = 0;

          this.emails.forEach(element => {
            // Comparation element == email doesnt work
            if((element.address.value == email.address.value) && (element.name.value == email.name.value) && (element.phone.value == email.phone.value)){
              appearances++;
            }
          });

          if(appearances >= 2){
            email.repeated = true
          }

        }
      )

    } else {
      this.emails.forEach(
        email => {
          email.repeated = false
        }
      )
    }

    // Filtrar correos inválidos
    if(this.filterEmailsInvalid) {

      this.emails.forEach(email => {
        email.address.valid = this.emailValid(email.address.value)
      })

    } else {
      
      this.emails.forEach(email => {
        email.address.valid = true;
      })

    }

    // Filtra columnas reptidas
    if(this.filterColumnsRepeated) {

      this.emails.forEach(
        email => {

          let correos = this.emails.filter(element => element != email)

          if(correos.some(correo => correo.address.value == email.address.value)){
            email.address.repeated = true
          }

          if(correos.some(correo => correo.name.value == email.name.value)){
            email.name.repeated = true
          }

          if(correos.some(correo => correo.phone.value == email.phone.value)){
            email.phone.repeated = true
          }
        
        }
      )

    } else {
      this.emails.forEach(
        email => {
          email.address.repeated = false;
          email.name.repeated = false;
          email.phone.repeated = false;
        }
      )
    }

  }
  
  getDataArrayFromCSVFile(csvArray: any, headerLength: any) { 

    let csvArr = [];  
  
    for (let i = 1; i < csvArray.length; i++) {  
      let currentEmail = (<string>csvArray[i]).split(',');  
      if (currentEmail.length == headerLength) {  
        let csvEmail: Email = new Email();  
        csvEmail.name.value = currentEmail[0].trim()
        csvEmail.address.value = currentEmail[1].trim()
        csvEmail.phone.value = parseInt(currentEmail[2]) 
        csvArr.push(csvEmail);  
      }  
    }

    return csvArr;  

  }  
  
  // Validate that file is a .csv file
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  // Get list headers
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.emails = [];  
  }

  emailValid(mail: string) {

    // Standar regex for an email
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(mail != "" && (mail.length <= 5 || !emailRegex.test(mail))) {
      // mail invalid
      return false;
    }

    // mail valid
    return true;

  }

}
