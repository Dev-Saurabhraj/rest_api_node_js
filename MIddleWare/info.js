const fs = require("fs");

function logreqres(fileName){
return (req, res, next)=> {
    fs.appendFile(fileName, `ip: ${req.ip}, method: ${req.method}, path: ${req.path}` ,
        (err, data)=>{
            next();
        }
    );
}
}

module.exports = { logreqres };