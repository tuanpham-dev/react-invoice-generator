const fetchData = ({
  method='GET',
  url,
  body
}) => {
  return new Promise((resolve, reject) => {
    const URL = `${process.env.REACT_APP_API_BASE}${url}`
    fetch(URL, {
      method,
      mode: 'cors',
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if (res?.status === 'SUCCESS') {
        resolve(res?.data || res?.message)
      } else {
        reject(res?.message)
      }
    })
    .catch(e => {
      console.log('ERROR', e)
      reject(e)
    })
  })
}

export default fetchData;
