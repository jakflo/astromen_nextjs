import DbWrap from '../../../model/dbWrap.js';
import Model from '../../../model/model.js';
import Conf from '../../../model/conf.js';
import GetFormsValidators from '../../../model/getFormsValidators.js';

export default (req, res) => {
        var conf = new Conf();
        var dobo = new DbWrap(conf.db());
        var model = new Model(dobo);
        var getFormsValidators = new GetFormsValidators();
        
        if (req.method !== 'DELETE') {
            res.statusCode = 405;
            res.json({error: 'only DELETE method allowed'});
        }
        else {
            const {
                query: {id}
            } = req;
            var params = {id: id};
            var validatorsMulti = getFormsValidators.getId();
            var validationPassed = validatorsMulti.validate(params);
            if (!validationPassed) {
                res.send({result: 'failed', validationErrors: validatorsMulti.errors});
            }
            else {
                model.del(params)
                    .then(() => {
                        res.send({result: 'ok'});
                    })
                    .catch((err) => {
                        res.send({result: 'failed', error: err});
                    });
            }
        }
    }
    