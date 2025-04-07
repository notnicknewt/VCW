"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { initializeProjects } from "@/store/slices/projectsSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize projects from localStorage when the app loads
    store.dispatch(initializeProjects());
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}