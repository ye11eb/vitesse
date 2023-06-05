// const localStorageMiddleware = (store) => (next) => (action) => {
//     const result = next(action); // Let the action continue through the middleware chain
  
//     if (action.type === 'LIKE_ITEM' || action.type === 'UNLIKE_ITEM') {
//       // Get the updated liked items from the store state
//       const likedItems = store.getState().likedItems;
  
//       // Save the liked items to local storage
//       localStorage.setItem('likedItems', JSON.stringify(likedItems));
//     }
  
//     return result;
//   };
  
//   export default localStorageMiddleware;