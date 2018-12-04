const receiveData = data => dispatch => {
  dispatch({
    type: 'FETCH_DATA',
    payload: data
  })
};

const fetchRequest = (urlArr) => dispatch => {
  dispatch(
    (dispatch) => {
      const requests = urlArr.map( url => fetch(url));
      return Promise.all(requests)
        .then(resp => Promise.all(resp.map(item => item.json())))
        .then(resp => resp.filter(item => item.Response !== "False"))
        .then(resp => dispatch(receiveData(resp)));
    }
  );
};

export default fetchRequest;
