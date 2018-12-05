const remoteDataState = {data: [], dataToDisplay: []};

export default (state = remoteDataState, action) => {

  switch (action.type) {
    case 'FETCH_DATA':
      const data = action.payload;
      const dataToDisplay = data.map(item => ({name: item.Title, show: false}));
      return {
        ...state,
        data: [...state.data, ...action.payload],
        dataToDisplay: [...state.dataToDisplay, ...dataToDisplay]
      };
    case 'TOGGLE_DISPLAY':
      const toggledItem = action.payload;
      return {
        ...state,
        dataToDisplay: state.dataToDisplay
          .map(item => (item.name === toggledItem.name) ? toggledItem : ({...item}))
      };
    default:
      return state;
  }
};
