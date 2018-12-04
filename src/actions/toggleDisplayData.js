const toggleDisplayData = data => dispatch => {
  dispatch({
    type: 'TOGGLE_DISPLAY',
    payload: data
  })
};
export default toggleDisplayData;
