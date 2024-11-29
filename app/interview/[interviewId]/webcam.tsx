"use client";

import { motion } from "framer-motion";
import Webcam from "react-webcam";
import { useCam } from "@/lib/stores/cam";
import {
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/outline";

export default function WebcamView() {
  const { cam, toggleCam } = useCam((state) => state);

  return (
    <motion.div
      className={"w-2/3 h-full flex justify-end relative p-4"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button
        type={"button"}
        onClick={toggleCam}
        className={
          "absolute right-6 top-6 z-10 p-2 bg-red-500 text-white rounded-full"
        }
      >
        {cam ? (
          <VideoCameraIcon className={"size-6"} />
        ) : (
          <VideoCameraSlashIcon className={"size-6"} />
        )}
      </button>
      {cam ? (
        <motion.div
          className={"w-full h-full rounded-2xl shadow-lg shadow-orange-300/50"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Webcam className={"w-full  h-full rounded-2xl"} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={
            "w-full h-full bg-neutral-900 flex items-center justify-center rounded-2xl"
          }
        >
          <div className={"text-xl font-semibold text-white"}>Camera OFF</div>
        </motion.div>
      )}
    </motion.div>
  );
}
