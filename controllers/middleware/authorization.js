let E = require('../../exceptions');

module.exports = (req, res, next)=> {

    //TODO
    let token = req.header('x-access-token');

    if(req.method !== 'OPTIONS' && token !== 'secret_token_1'){
        return next(new E.AuthenticationFailed('You are not authorized'))
    }else{
        return next();
    }
};