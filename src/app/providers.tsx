"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider } from "@heroui/toast";
import { Provider } from "react-redux";
import { persistor, store } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HeroUIProvider navigate={router.push}>
          <ToastProvider placement="top-center" />
          {children}
        </HeroUIProvider>
      </PersistGate>
    </Provider>
  );
}
