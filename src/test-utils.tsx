import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./state/reducers";
import thunk from "redux-thunk";
const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = compose(...enhancers);

function render(
  ui: any,
  {
    initialState,
    store = createStore(rootReducer, initialState, composedEnhancers as any),
    ...renderOptions
  } = {} as any
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions } as any);
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
