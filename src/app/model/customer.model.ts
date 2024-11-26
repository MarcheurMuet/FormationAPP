
export class Customer{
   
    firstname : string;
    lastname : string;
    adress : string;
    mobileNumber : string ;
    mail : string;
    
    constructor(firstname : string, lastname : string, adress : string, mobilenumber : string, mail : string){
        this.firstname = firstname;
        this.lastname = lastname;
        this.adress = adress;
        this.mobileNumber = mobilenumber;
        this.mail = mail;
    }
    

}