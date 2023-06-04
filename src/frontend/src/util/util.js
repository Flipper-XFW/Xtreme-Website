import { untar } from '../untar/untar.js'
import pako from 'pako'
import { unzipSync } from 'fflate'

const cloud = 'https://cloud.cynthialabs.net'
const webdav = '/public.php/webdav/'
const updaterShare = 'fWQpJpwgKFeHxwd'
const packsShare = 'Qb8Dto32sw8yP8X'

class Operation {
  // eslint-disable-next-line
  constructor() {
    this.resolve = undefined
    this.reject = undefined
  }

  create (worker, operation, data) {
    return new Promise((resolve, reject) => {
      worker.postMessage({ operation: operation, data: data })
      this.resolve = resolve
      this.reject = reject
    })
  }

  terminate (event) {
    if (event.status === 1) {
      this.resolve(event.data)
    } else {
      this.reject(event.error)
    }
  }
}

async function fetchPacks () {
  const response = await fetch(`${cloud}${webdav}`, {
    method: 'PROPFIND',
    headers: {
      Authorization: `Basic ${btoa(packsShare + ':')}`
    }
  })
  if (response.status >= 400) {
    throw new Error('Failed to fetch asset packs (' + response.status + ')')
  }
  const data = await response.text()

  const res = (new DOMParser()).parseFromString(data, 'text/xml')
  const packs = []
  for (const file of res.getElementsByTagName('d:response')) {
    const path = file.getElementsByTagName('d:href')[0].textContent.trim()
    if (!(path.startsWith(webdav) && path.endsWith('.zip'))) continue
    const [name, author] = decodeURI(path.slice(webdav.length, -'.zip'.length)).split('.')
    const url = `${cloud}/s/${packsShare}/download?path=/&files=${name}.${author}`
    packs.push({
      name: name,
      author: author,
      description: '',
      image: url + '.png',
      download: url + '.zip'
    })
  }
  return packs
}

async function fetchPack (url) {
  const buffer = await fetch(url)
    .then(async response => {
      if (response.status >= 400) {
        throw new Error('Failed to fetch resources (' + response.status + ')')
      }
      const buffer = await response.arrayBuffer()
      return unzipSync(new Uint8Array(buffer))
    })

  return buffer
}

async function fetchVersions (target) {
  const response = await fetch(`${cloud}${webdav}`, {
    method: 'PROPFIND',
    headers: {
      Authorization: `Basic ${btoa(updaterShare + ':')}`
    }
  })
  if (response.status >= 400) {
    throw new Error('Failed to fetch firmware versions (' + response.status + ')')
  }
  const data = await response.text()

  const res = (new DOMParser()).parseFromString(data, 'text/xml')
  const versions = {}
  for (const file of res.getElementsByTagName('d:response')) {
    const path = file.getElementsByTagName('d:href')[0].textContent.trim()
    if (!(path.startsWith(webdav) && path.endsWith('.tgz'))) continue
    const version = path.slice(webdav.length, -'.tgz'.length)
    const url = `${cloud}/s/${updaterShare}/download?path=/&files=${version}`
    const date = version.split('_')[1]
    versions[version] = {
      value: version,
      label: version.split('_')[0],
      date: `${date.slice(0, 2)}-${date.slice(2, 4)}-${date.slice(4)}`,
      url: url + '.tgz',
      changelog: null,
      changelogUrl: url + '.md',
      files: [{
        url: url,
        target: target,
        type: 'update_tgz'
      }]
    }
  }
  return versions
}

async function fetchFirmware (url) {
  const buffer = await fetch(url)
    .then(async response => {
      if (response.status >= 400) {
        throw new Error('Failed to fetch resources (' + response.status + ')')
      }
      const buffer = await response.arrayBuffer()
      return unpack(buffer)
    })

  return buffer
}

function unpack (buffer) {
  const ungzipped = pako.ungzip(new Uint8Array(buffer))
  return untar(ungzipped.buffer)
}

function bytesToSize (bytes) {
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / (1024 ** i)).toFixed(1)}${sizes[i]}`
}

export {
  Operation,
  fetchPacks,
  fetchPack,
  fetchVersions,
  fetchFirmware,
  unpack,
  bytesToSize
}
