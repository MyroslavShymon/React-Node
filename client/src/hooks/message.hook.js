import React from "react";

export const useMessage = () => {
  return React.useCallback((text) => {
    if (window.M && text) {
      window.M.toast({ html: text });
    }
  });
};
