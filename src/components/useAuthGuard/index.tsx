import React from "react";

const useAuthGuard = () => {
  return Boolean(localStorage.getItem("@access_token"));
};

export default useAuthGuard;
