import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { TosatNotifyCommonWrapper } from "./TosatNotifyCommon.styled";
import { Bounce, ToastContainer, toast } from "react-toastify";

interface TosatNotifyCommonProps {
  message: "error" | "warning" | "success"; // Message type for toast
  errorMessage?: string | null; // Error message passed from the parent
}

const TosatNotifyCommon = forwardRef(
  ({ message, errorMessage }: TosatNotifyCommonProps, ref) => {
    // Function to trigger a simple error toast
    const notifyError = () => {
      if (errorMessage) {
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
      }
    };

    // Function to trigger a warning toast
    const notifyWarning = () => {
      if (errorMessage) {
        toast.warning(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
      }
    };

    // Function to trigger a success toast
    const notifySuccess = () => {
      if (errorMessage) {
        toast.success(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
      }
    };

    // Automatically trigger the toast based on `message` and `errorMessage`
    useEffect(() => {
      if (!errorMessage) return;

      if (message === "error") notifyError();
      if (message === "warning") notifyWarning();
      if (message === "success") notifySuccess();
    }, [message, errorMessage]);

    // Expose functions to the parent component via ref
    useImperativeHandle(ref, () => ({
      triggerNotifyError: notifyError,
      triggerNotifyWarning: notifyWarning,
      triggerNotifySuccess: notifySuccess,
    }));

    return (
      <TosatNotifyCommonWrapper data-testid="TosatNotifyCommon">
        <div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </div>
      </TosatNotifyCommonWrapper>
    );
  }
);

export default TosatNotifyCommon;
