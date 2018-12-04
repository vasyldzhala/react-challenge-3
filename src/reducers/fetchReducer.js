const fetchState = {data: []};

export default (state = fetchState, action) => {

  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state, data: [...state.data, ...action.payload]
      };
    default:
      return state;
  }
};
