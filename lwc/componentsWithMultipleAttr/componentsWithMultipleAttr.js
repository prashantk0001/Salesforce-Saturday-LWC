import { LightningElement,api, track } from 'lwc';

export default class ComponentsWithMultipleAttr extends LightningElement {

    @track showSection = false;

    @track firstattr;
    @track secondattr;

    @api
    get attr1() {
        return this.firstattr;
    }
    set attr1(value) {
        if(value === 'true'){
            this.firstattr = value;
            if(this.firstattr === 'true' && this.secondattr === 'true') {
                this.showSection = true;
            }
        }
    }

    @api
    get attr2() {
        return this.secondattr;
    }
    set attr2(value) {
        if(value === 'true'){
            this.secondattr = value;
            if(this.firstattr === 'true' && this.secondattr === 'true'){
                this.showSection = true;
            }
        }
    }

    constructor(){
        super();
        console.log(this.showSection);
    }

    connectedCallback(){
        console.log(this.showSection);
    }

    renderedCallback(){
        console.log(this.showSection);
    }
}