import Validators from '../model/validators/validators.js';
import NotEmpty from '../model/validators/notEmpty.js';
import IsPositiveInt from '../model/validators/isPositiveInt.js';
import IsNotZero from '../model/validators/isNotZero.js';
import CzDate from '../model/validators/czDate.js';
import IsNumber from '../model/validators/isNumber.js';
import MaxLen from '../model/validators/maxLen.js';

export default class GetValidator {
        jmeno() {
            return new Validators().addValidator(new NotEmpty().setCustomMessage('Zadejte jméno.')).addValidator(new MaxLen(20));
        }
        prijmeni() {
            return new Validators().addValidator(new NotEmpty().setCustomMessage('Zadejte příjmení.')).addValidator(new MaxLen(20));
        }
        czDatum() {
            return new Validators().addValidator(new NotEmpty().setCustomMessage('Zadejte datum narození.')).addValidator(new CzDate());
        }
        skill() {
            return new Validators().addValidator(new NotEmpty().setCustomMessage('Zadejte dovednost.')).addValidator(new MaxLen(60));
        }
        
}


