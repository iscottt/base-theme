const getKey = (key) => {
  return '$.' + key
}

const storage = {
  local: {
    get(key) {
      return JSON.parse(localStorage.getItem(getKey(key)))
    },
    set(key, value) {
      localStorage.setItem(getKey(key), JSON.stringify(value))
    },
    remove(key) {
      localStorage.removeItem(getKey(key))
    }
  },
  session: {
    get(key) {
      return JSON.parse(sessionStorage.getItem(getKey(key)))
    },
    set(key, value) {
      sessionStorage.setItem(getKey(key), JSON.stringify(value))
    },
    remove(key) {
      sessionStorage.removeItem(getKey(key))
    }
  },
  cookie: {
    get(key) {
      const name = key + '='
      const decodedCookie = decodeURIComponent(document.cookie)
      const ca = decodedCookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    },
    set(key, value, days = 365) {
      const d = new Date()
      d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000))
      const expires = 'expires=' + d.toUTCString()
      document.cookie = key + '=' + value + ';' + expires + ';path=/'
    },
    remove(key) {
      document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }
  }
}

export default storage
