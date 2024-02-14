"use client";

import { store } from ".";
import { Provider } from "react-redux";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
