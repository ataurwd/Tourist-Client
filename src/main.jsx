import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Routes/Router";
import FormData from "./context/FormData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Theme from "./context/Theme";
import { AppLoadingProvider } from "./context/AppLoading";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data stays fresh for 5 minutes — no re-fetch on every tab switch
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes after component unmounts
      gcTime: 10 * 60 * 1000,
      // Don't re-fetch just because the user switched browser tabs
      refetchOnWindowFocus: false,
      // Retry failed requests only once (default is 3, adds latency on error)
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <FormData>
          <AppLoadingProvider>
            <Router />
          </AppLoadingProvider>
        </FormData>
      </Theme>
    </QueryClientProvider>
  </StrictMode>,
);
