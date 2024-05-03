export const toggleNav = () => {
  document.body.classList.contains('mobile-nav-open') ? document.body.classList.remove('mobile-nav-open') : document.body.classList.add('mobile-nav-open')
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

export class Throttle {
  lock: boolean
  callback: () => void
  timer: number

  constructor() {
    this.lock = false
    this.callback = () => undefined
    this.timer = 0
  }

  private setCallback(fn: () => void) {
    this.callback = fn
  }

  private setTimer(timer: number) {
    this.timer = timer
  }

  private executeCallback() {
    if (!this.lock) {
      this.lock = true

      setTimeout(() => {
        this.callback()
        this.lock = false
      }, this.timer)
    }
  }

  public run(fn: () => void, timer: number) {
    this.setCallback(fn)
    this.setTimer(timer)

    this.executeCallback()
  }
}