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
      console.log(toggledItem);
      const neww = state.dataToDisplay
        .map(item => (item.name === toggledItem.name) ? toggledItem : ({...item}));
      console.log(neww);
      return {
        ...state,
        dataToDisplay: neww
      };
    default:
      return state;
  }
};
