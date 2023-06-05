// rootReducer.js
// rootReducer.js
import { combineReducers } from 'redux';
import likedItemsReducer from './likeReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  likedItems: likedItemsReducer,
  cartItems: cartReducer,
});

export default rootReducer;