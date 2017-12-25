const axios = require('axios')

module.exports = function (session) {
  var Store = session.Store;

  function RestStore (endpoint) {
    var self = this

    endpoint = endpoint || '127.0.0.1'
    Store.call(self)

    self.endpoint = endpoint
  }

  RestStore.prototype.__proto__ = Store.prototype

  RestStore.prototype.get = function (sid, callback) {
    axios.get(this.endpoint + '/' + sid).then(function ({data}) {
      callback(null, data)
    }).catch(function (e) {
      if (typeof e.response != 'undefined' && e.response.status === 404) {
          callback(null, null)
          return
      }
      callback(e)
    })
  }

  RestStore.prototype.set = function (sid, data, callback) {
    axios.post(this.endpoint + '/' + sid, data).then(function () {
      callback()
    }).catch(function (e) {
      callback(e)
    })
  }

  RestStore.prototype.destroy = function (sid, callback) {
    axios.delete(this.endpoint + '/' + sid).then(function () {
      callback()
    }).catch(function (e) {
      callback(e)
    })
  }

  RestStore.prototype.clear = function (callback) {
    axios.delete(this.endpoint).then(function () {
      callback()
    }).catch(function (e) {
      callback(e)
    })
  }

  RestStore.prototype.all = function (callback) {
    axios.get(this.endpoint).then(function ({data}) {
      callback(null, data)
    }).catch(function (e) {
      callback(e)
    })
  }

  RestStore.prototype.touch = function (sid, data, callback) {
    axios.post(this.endpoint + '/' + sid + '?ping', data).then(function () {
      callback()
    }).catch(function (e) {
      callback(e)
    })
  }
  return RestStore
}
