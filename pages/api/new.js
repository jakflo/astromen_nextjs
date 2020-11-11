import DbWrap from '../../model/dbWrap.js';
import Model from '../../model/model.js';
import Conf from '../../model/conf.js';
import GetFormsValidators from '../../model/getFormsValidators.js';

export default (req, res) => {
        var conf = new Conf();
        var dobo = new DbWrap(conf.db());
        var model = new Model(dobo);
        var getFormsValidators = new GetFormsValidators();
        
        if (req.method !== 'POST') {
            res.statusCode = 405;
            res.json({error: 'only POST method allowed'});
        }
        else {
                var params = req.body;
                var validatorsMulti = getFormsValidators.getNew();
                var validationPassed = validatorsMulti.validate(params);
                if (!validationPassed) {
                    res.send({result: false, validationErrors: validatorsMulti.errors});
                }
                else {
                    model.addNew(params)
                        .then((id) => {
                            res.send({result: 'ok', newId: id});
                        })
                        .catch((err) => {
                            res.send({result: 'failed', error: err});
                        });
                }
        }
    }
