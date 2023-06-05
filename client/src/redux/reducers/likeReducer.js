// reducer.js
const initialState = {
    likedItems: [] // Initialize as an empty array
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LIKE_ITEM':
        localStorage.setItem('likedItems', JSON.stringify(state.likedItems));
        return {
          ...state,
          likedItems: [...state.likedItems, action.payload._id]   
        };
      case 'UNLIKE_ITEM':
        localStorage.setItem('likedItems', JSON.stringify(state.likedItems));
        return {
          ...state,
          likedItems: state.likedItems.filter(item => item !== action.payload._id)
        };
        case 'SET_REDUCERS':
          return {
            likedItems: action.payload
          };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  