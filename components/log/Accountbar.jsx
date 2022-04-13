import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, useClipboard } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useModal from "../../hooks/useModal";
import ConnectedModal from "../ConnectedModal";
import Modal from "../Modal";

const Accountbar = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
  const { toggle, visible } = useModal();

  useEffect(() => {
    if (!account) return;
  }, [account]);

  return (
    <div className="d-flex">
      <button className="button btn-account d-flex " onClick={toggle}>
        <div className="btn-avatar d-flex mr-2">
          <div className="d-inline-block v-align-middle line-height-0 ml-n1 mr-n1">
            <div
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                padding: "0px",
                margin: "0px",
                width: "16px",
                height: "16px",
                display: "inline-block",
                background: "rgb(252, 25, 96)",
              }}
            >
              <svg x="0" y="0" width="16" height="16">
                <rect
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                  transform="translate(-1.9648821102651668 -0.994747498470386) rotate(364.3 8 8)"
                  fill="#1598F2"
                ></rect>
                <rect
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                  transform="translate(-0.08300866174519939 8.443399956083116) rotate(179.3 8 8)"
                  fill="#F73F01"
                ></rect>
                <rect
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                  transform="translate(-11.619925695097987 -6.918734684434651) rotate(247.7 8 8)"
                  fill="#FC7500"
                ></rect>
              </svg>
            </div>
          </div>
        </div>
        <div>
          {account ? account.slice(0, 6) + "..." + account.slice(-4) : null}
        </div>
      </button>
      <Modal visible={visible} toggle={toggle}>
        <ConnectedModal toggle={toggle} />
      </Modal>
      <style jsx>{`
        .btn-account {
          color: #f47820;
          border: none;
          align-items: center;
          background: rgba(255, 255, 255, 0.16);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        }

        .btn-account:hover {
          background: rgba(255, 255, 255, 0.114)
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Accountbar;
