import DbWrap from '../../model/dbWrap.js';
import Model from '../../model/model.js';
import Conf from '../../model/conf.js';
import GetFormsValidators from '../../model/getFormsValidators.js';

export default (req, res) => {
        var conf = new Conf();
        var dobo = new DbWrap(conf.db());
        var model = new Model(dobo);
        var getFormsValidators = new GetFormsValidators();
        
        if (req.method !== 'GET') {
            res.statusCode = 405;
            res.json({error: 'only GET method allowed'});
        }
        else {            
            var url = require('url');
            var params = url.parse(req.url, true).query;
            var validatorsMulti = getFormsValidators.getIsExists();
            var validationPassed = validatorsMulti.validate(params);
            if (!validationPassed) {
                res.statusCode = 200;
                res.json({result: false, validationErrors: validatorsMulti.errors});
            }
            else {
                model.isExists(params)
                    .then((result) => {
                        res.statusCode = 200;
                        res.json({result: result});
                    })
                    .catch((err) => {
                        res.statusCode = 200;
                        res.json({error: err});
                    })
                    ;
            }
        }
    }

