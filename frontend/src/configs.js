import API from 'api'

let config

export function load () {
  return API.Config
    .load()
    .then((response) => {
      config = response.data
    })
}

export default function get () {
  return Object.assign({}, config)
}
