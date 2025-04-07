"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { initializeProjects } from "@/store/slices/projectsSlice";

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize projects from localStorage on client side
  useEffect(() => {
    store.dispatch(initializeProjects());
  }, []);
  
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
