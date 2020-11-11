import DbWrap from '../../model/dbWrap.js';
import Model from '../../model/model.js';
import Conf from '../../model/conf.js';

export default (req, res) => {
        var conf = new Conf();
        var dobo = new DbWrap(conf.db());
        var model = new Model(dobo);
        
        if (req.method !== 'GET') {
            res.statusCode = 405;
            res.json({error: 'only GET method allowed'});
        }
        else {
            model.getAll()
                .then((result) => {
                    res.statusCode = 200;
                    res.json({result: result});
                })
                .catch((err) => {
                    res.statusCode = 200;
                    res.json({error: err});
                });
        }
    }

