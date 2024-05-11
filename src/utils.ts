import { useCallback, useRef } from "react";

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

export function useThrottle() {
  const lock = useRef(false)

  return useCallback((cb: () => void, timer: number) => {
    if (!lock.current) {
      lock.current = true

      setTimeout(() => {
        cb()
        lock.current = false
      }, timer)
    }
  }, [])
}

export function slugify(input: string) {
  return input.toLowerCase().replace(' ', '-')
}