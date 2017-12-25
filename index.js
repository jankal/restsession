import axios from 'axios'

export default class HTTPStore {

  constructor(endpoint) {
    this.endpoint = endpoint
  }

  get (sid, callback) {
    axios.get(this.endpoint + '/' + sid).then(function (data) {
      callback(null, data)
    }).catch(function (e) {
      callback(e)
    })
  }

  set (sid, data, callback) {
    axios.post(this.endpoint + '/' + sid, data).then(function () {
      callback()
    }).catch(function (e) {
      callback(e)
    })
  }

  destroy (sid, callback) {
    axios.delete(this.endpoint + '/' + sid).then(function () {
      callback()
    }).catch(function (e) {
      callback(e)
    })
  }

  clear (callback) {
    axios.delete(this.endpoint).then(function () {
      callback()
    }).catch(function (e) {
      callback(e)
    })
  }

  all (callback) {
    axios.get(this.endpoint).then(function (data) {
      callback(null, data)
    }).catch(function (e) {
      callback(e)
    })
  }

  touch (sid, data, callback) {
    axios.post(this.endpoint + '/' + sid + '?ping', data).then(function () {
      callback()
    }).catch(function (e) {
      callback(e)
    })
  }
}
