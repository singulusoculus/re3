// Shared Functions
const getBGGData = (url) => {
    return new Promise((resolve, reject) => {
      checkURLStatus(url, 3, 5000)
      //fetch(url)
        .then(response => handleErrors(response))
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
        .then(data => {
          const dataJSON = xmlToJson(data)
          let bggJSONData
  
          if (dataJSON.items) {
            bggJSONData = dataJSON.items.item
          } else if (dataJSON.user.top) {
            bggJSONData = dataJSON.user.top.item
          } else {
            bggJSONData = []
          }
  
          if (!Array.isArray(bggJSONData)) {
            if (bggJSONData) {
              bggJSONData = [bggJSONData]
            } else {
              bggJSONData = []
            }
          }
          // Always resolves an array
          resolve(bggJSONData)
        }).catch((error) => {
          //console.log(error)
          alert(`There was an error fetching your collection. Check the username you entered. BGG servers may also be busy or you have made too many requests. Please try again in a minute.`)
          //resolve(error)
          reject(error)
          // disable loader
        // enable submit button
        })
    })
}

const checkURLStatus = (url, times, delay) => {
  return new Promise((resolve, reject) => {
    (function rec(i) {
      fetch(url).then((response) => {
        if (response.status === 200) {
          console.log("success");
          resolve(response)
        } else {
          console.log("fail");
          if (i !== 0) {
            setTimeout(() => rec(--i), delay )
          } else {
            throw new Error('Unable to pull collection')
          }
        }
      }).catch(error => {
        return reject(error)
      })
    })(times);
  })
}

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

const xmlToJson = (xml) => { // Changes XML to JSON
    // Create the return object
    let obj = {}
  
    if (xml.nodeType === 1) { // element
      // attributes
      if (xml.attributes.length > 0) {
        obj['@attributes'] = {}
        for (let j = 0; j < xml.attributes.length; j++) {
          let attribute = xml.attributes.item(j)
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue
        }
      }
    } else if (xml.nodeType === 3) { // text
      obj = xml.nodeValue
    }
  
    // children
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        let item = xml.childNodes.item(i)
        let nodeName = item.nodeName
        if (typeof (obj[nodeName]) === 'undefined') {
          obj[nodeName] = xmlToJson(item)
        } else {
          if (typeof (obj[nodeName].push) === 'undefined') {
            let old = obj[nodeName]
            obj[nodeName] = []
            obj[nodeName].push(old)
          }
          obj[nodeName].push(xmlToJson(item))
        }
      }
    }
    return obj
}

export  { getBGGData }