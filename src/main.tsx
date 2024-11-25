import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider as ProviderChakra } from "./components/ui/provider";
import { Provider as ProviderRedux } from "react-redux";

import "./index.css";
import { store } from "./App/store";
import InternetConnectionProvider from "./services/InternetConnectionProvider";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ProviderRedux store={store}>
      <InternetConnectionProvider>
        <ProviderChakra>
          <App />
        </ProviderChakra>
      </InternetConnectionProvider>
    </ProviderRedux>
  </QueryClientProvider>
);
