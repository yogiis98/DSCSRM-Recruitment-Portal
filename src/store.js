import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(reduxThunk));

function configureStore(
  state = {}
) {
  const store = createStore(rootReducer, state, enhancer);
    if (process.env.NODE_ENV !== "production") {
      if (module.hot) {
        module.hot.accept("./reducers/rootReducer", () => {
          store.replaceReducer(rootReducer);
        });
      }
    }
  return store
}

export default configureStore;
