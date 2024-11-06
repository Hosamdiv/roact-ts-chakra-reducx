import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider as ProviderUi } from "./components/ui/provider";
import { Provider as ProviderReducx } from "react-redux";

import "./index.css";
import { store } from "./App/store";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ProviderReducx store={store}>
    <QueryClientProvider client={queryClient}>
      <ProviderUi>
        <App />
      </ProviderUi>
    </QueryClientProvider>
  </ProviderReducx>
);
