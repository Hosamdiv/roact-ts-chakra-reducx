/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
import { toaster } from "../components/ui/toaster";
import { useAppDispatch } from "../App/store";
import { networkMode } from "../App/features/NetworkMode";

interface InternetConnectionProviderProps {
  children: ReactNode;
}

const InternetConnectionProvider = ({
  children,
}: InternetConnectionProviderProps) => {
  const dispatch = useAppDispatch();

  const [toastWarning, setToastWarning] = useState<string | null>(null);
  const [toastSuccess, setToastSuccess] = useState<string | null>(null);

  const addToastWarning = () => {
    const warning = toaster.create({
      title: "You're offline",
      description: "Please check your internet connection.",
      type: "warning",
      duration: 5000,
    });

    if (warning) {
      setToastWarning(warning);
    }
  };
  const addToastSuccess = () => {
    const success = toaster.create({
      title: "You're back online!",
      description:
        "Your internet connection has been restored. Enjoy seamless browsing!",
      type: "success",
      duration: 5000,
    });
    if (success) {
      setToastSuccess(success);
    }
  };
  const removeToastWarning = () => {
    if (toastWarning) {
      toaster.dismiss(toastWarning);
      setToastWarning(null);
    }
  };
  const removeToastSuccess = () => {
    if (toastSuccess) {
      toaster.dismiss(toastSuccess);
      setToastSuccess(null);
    }
  };
  const handleOnline = () => {
    addToastSuccess();
    removeToastWarning();
    dispatch(networkMode(true));
  };

  const handleOffline = () => {
    addToastWarning();
    removeToastSuccess();
    dispatch(networkMode(false));
  };
  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      // ** Cleanup
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [toastWarning, toastSuccess]);

  return <>{children}</>;
};

export default InternetConnectionProvider;
