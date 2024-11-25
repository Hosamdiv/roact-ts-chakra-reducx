import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Toaster } from "./components/ui/toaster";
const App = () => {
  return (
    <>
      <Toaster />

      <RouterProvider router={router} />
    </>
  );
};

export default App;
