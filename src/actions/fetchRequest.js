const fetchRequest = urlArr => (dispatch, foo) => {
  const requests = urlArr.map( url => fetch(url));

  return Promise.all(requests)
    .then(resp => Promise.all(resp.map(item => item.json())))
    .then(resp => resp.filter(item => item.Response !== "False"))
    .then(resp => {
      dispatch({
        type: 'FETCH_DATA',
        payload: resp
      })
    })
};

export default fetchRequest;
