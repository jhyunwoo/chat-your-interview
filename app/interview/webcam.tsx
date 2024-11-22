"use client";

import Webcam from "react-webcam";

export default function WebcamView() {
  return (
    <div className={"w-2/3 h-full flex justify-end"}>
      <Webcam className={"w-full bg-black"} />
    </div>
  );
}
