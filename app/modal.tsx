"use client";

import { motion } from "framer-motion";
import { useModal } from "@/lib/stores/modal";

export default function Modal() {
  const { text, action, setModal } = useModal();
  return (
    <>
      {text ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={
            "w-screen h-screen fixed top-0 left-0 z-30 bg-neutral-800/50 flex items-center justify-center"
          }
        >
          <div
            className={
              "w-full max-w-xl p-4 rounded-xl bg-neutral-950 text-white flex flex-col items-center justify-center"
            }
          >
            <div className={"text-2xl font-bold p-8"}>{text}</div>
            <div className={"flex gap-2 items-center justify-around w-full"}>
              <button
                className={
                  "w-full p-2 rounded-lg border-2 border-sky-600 font-semibold"
                }
                type={"button"}
                onClick={() => setModal("", () => {})}
              >
                Cancel
              </button>
              <button
                className={
                  "w-full p-2 rounded-lg bg-sky-600 text-white font-semibold"
                }
                type={"button"}
                onClick={() => {
                  action();
                  setModal("", () => {});
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  );
}
