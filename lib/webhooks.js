var utils = require('./utils');

var validateRequest = function(appsecret, headers, body) {
  var md5      = utils.genMD5(JSON.stringify(body));
  var checksum = utils.genChecksum(appsecret + md5 + headers.curtime);
  return headers.md5 === md5 && headers.checksum === checksum;
}

// connect middleware
var webhook = function() {
  var appsecret = this._o.appsecret;
  return function hook(req, res, next) {
    var valid = validateRequest(appsecret, req.headers, req.body);
    if (valid) {
      next();
    } else {
      res.writeHead(403);
      res.end(JSON.stringify({code: 403, message: 'Netease IM Request Validation Failed'}));
    }
  }
}

module.exports = webhook;