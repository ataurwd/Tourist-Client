import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Routes/Router";
import FormData from "./context/FormData";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Theme from "./context/Theme";
import { AppLoadingProvider } from "./context/AppLoading";

const queryClient = new QueryClient();

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
