export const toggleNav = () => {
  document.body.classList.contains('mobile-nav-open') ? document.body.classList.remove('mobile-nav-open') : document.body.classList.add('mobile-nav-open')
}

export function checker(checks: boolean, fn: string) {
  const assertionError = new Error(`Invalid values passed to ${fn}`)
  assertionError.name = 'Assertion Error'

  if (!checks) {
    if (import.meta.env.VITE_SERVER_URL === 'DEVELOPMENT') throw assertionError
    else console.error(`Invalid value passed to ${fn}`, assertionError.stack)
  }
}


export function getRequest(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        resolve(this.response)
      } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
        reject(this.response)
      }
    }

    xhr.open("GET", url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
  })
}

export function postRequest(url: string, data: object) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        resolve(this.response)
      } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
        reject(this.response)
      }
    }

    xhr.open("POST", url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  })
}