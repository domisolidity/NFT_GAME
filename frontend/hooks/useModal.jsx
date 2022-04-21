import { useState } from "react";

const useModal = () => {
  const [visible, setVisible] = useState(false);
  const [overflow, setOverflow] = useState(false);

  const toggle = () => {
    // const body = window.document.body;
    // body.classList.add("overflow-hidden");
    setVisible(!visible);
  };

  return { toggle, visible };
};

export default useModal;
