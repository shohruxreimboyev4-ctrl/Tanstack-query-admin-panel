import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// App
import App from "./App.jsx";

// ===================== Redux slice =====================
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = uiSlice.actions;

// ===================== Redux store =====================
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

// ===================== TanStack Query client =====================
const queryClient = new QueryClient();

// ===================== Render =====================
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
