import { LightningElement, track } from 'lwc';

export default class GetterProps extends LightningElement {

    @track name = 'SFDC';
    @track products = ['Sales Cloud', 'Service Cloud']; 

    @track isNameSFDC = false;
    @track productHasSalesCloud = false;

    constructor(){
        super();
        if(this.name === 'SFDC'){
            this.isNameSFDC = true;
        }
        if(this.products.includes('Sales Cloud')){
            this.productHasSalesCloud = true;
        }

        console.log(this.isNameSFDCAndHasSalesCloud);
    }

    get isNameSFDCAndHasSalesCloud(){
        if(this.name === 'SFDC' && this.products.includes('Sales Cloud')){
            return true;
        }
        return false;
    }

}