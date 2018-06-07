var crypto = require('crypto');

var genNonce = function(len) {
  return crypto.randomBytes(len).toString('hex');
};

var genChecksum = function(data){
  return crypto.createHash("sha1").update(data).digest('hex');
};

var genMD5 = function(data) {
  return crypto.createHash('md5').update(data, 'utf8').digest("hex");
};

module.exports = {
  genNonce,
  genChecksum,
  genMD5
}