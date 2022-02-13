import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

//reducer
import { ContactReducer } from './reducer/contactReducer';

const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    // add reducer here
    ContactReducer
  });

export const history = createBrowserHistory();
export default function configureStore(preloadedState) {
  const store = createStore(
    reducer(history),
    preloadedState,
    compose(
      applyMiddleware(routerMiddleware(history), thunk),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return store;
}