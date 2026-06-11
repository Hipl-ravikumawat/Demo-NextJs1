"use client";

import { ToastContainer } from "react-toastify";

const ToastProvider = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
        />
    );
};

export default ToastProvider;