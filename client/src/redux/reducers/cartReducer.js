// reducer.js
const initialState = {
    cartItems: [] // Initialize as an empty array
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        console.log(state);
        localStorage.setItem('cart', JSON.stringify(state.cart));
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload]   
        };
      case 'DELETE_FROM_CART':
        localStorage.setItem('cart', JSON.stringify(state.cart));
        return {
          ...state,
          cart: state.cartItems.filter(item => item !== action.payload)
        };
        case 'SET_REDUCERS':
          return {
            cart: action.payload
          };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  