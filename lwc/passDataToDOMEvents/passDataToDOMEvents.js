import { LightningElement, track } from 'lwc';

export default class PassDataToDOMEvents extends LightningElement {

    @track param = 'default';

    changeValue(event){
        if(event.target.dataset.val === 'default'){
            this.param = 'swtich';
        }else{
            this.param = 'default'
        }

        //or 

        if(event.target.dataset.val2 === 'default'){
            event.target.setAttribute('data-val2','switch');
        }else{
            event.target.setAttribute('data-val2','default');
        }
    }

}