import $ from 'jquery';

export default class SendRequest {
    fullReq(method, url, data, parentObj, succCallback) {
        $.ajax({
            type: method,
            url: url,
            data: data, 
            dataType: 'json', 
            success: (data, stat) => {
                if (data.error !== undefined && data.error.code === 'ECONNREFUSED') {
                    parentObj.messages.displayError('Nemohu se připojit k databázi');
                    parentObj.serverError = true;
                }
                else {
                    succCallback(data, stat);                   
                }                       
            },
            error: () => {
                parentObj.messages.displayError('Nemohu se připojit k serveru');
            }, 
            crossDomain: true
        });
    }
    
    simpleRequest(method, url, data, parentObj, succMsg) {
        this.fullReq(method, url, data, parentObj, (data, stat) => {
            if (data.result === 'ok') {
                parentObj.messages.displayNotice(succMsg);
                parentObj.loadData();
            }
            else {
                if (data.error === 'allready exists') {
                    parentObj.messages.displayError('Toto jméno již existuje.');
                }
                else {
                    parentObj.messages.displayError('Něco se nepovedlo.');
                }
            }                        
        });
    }
}
