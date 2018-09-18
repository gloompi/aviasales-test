import { Map } from 'immutable'

export function httpChanger(url){
  let httpsTest = /https/i
  if(httpsTest.test(url)) return url
  return url.replace(/http/i, 'https')
}

export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function arrToImmObj(arr, DataRec = Map, id = 'id'){
  return arr.reduce((acc, elem) => {
    return acc.set(elem[id], new DataRec(elem))
  }, new Map({}))
}

export function ObjToImmArr(obj){
  return obj.valueSeq().toArray()
}

export function arrToObj(arr){
  return arr.reduce((acc, elem) => {
    acc[elem.id] = elem
    return acc
  }, {})
}

export function ObjToArr(obj){
  return Object.keys(obj).map(id = obj[id])
}

export function createMarkup(content) {
  return {__html: content}
}

export function scrollIt(element, offset = 0) {
  window.scrollTo({
    'behavior': 'smooth',
    'left': 0,
    'top': element.offsetTop + offset
  })
}

export function splitBy3(numb) {
  const numbarr = []
  numb = numb + ''
  for(let i = numb.length; i > 0; i-=3){
    numbarr.push(numb.slice(i-3 <= 0 ? 0 : i-3 , i))
  }
  return numbarr.reverse().join(' ')
}