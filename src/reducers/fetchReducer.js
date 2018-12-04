const fetchState = [];

export default (state = fetchState, action) => {

  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state, data: action.payload
      };
    default:
      return state;
  }
};
