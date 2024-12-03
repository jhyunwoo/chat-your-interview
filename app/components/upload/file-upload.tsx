"use client";

import { ChangeEvent, useEffect, useState } from "react";

const FileUpload = ({ keyName }: { keyName: string }) => {
  const [text, setText] = useState<string>("");

  // onChange 핸들러 함수
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value);
  };

  function onSubmit() {
    localStorage.setItem(keyName, text);
  }

  useEffect(() => {
    const prevData = localStorage.getItem(keyName);
    if (prevData) {
      setText(prevData);
    }
  }, [keyName]);

  return (
    <div className={"flex flex-col w-full gap-4 p-4 bg-neutral-900 rounded-xl"}>
      <div>Resume Update</div>
      <textarea
        onChange={handleChange}
        value={text}
        className={"bg-neutral-800  w-full h-full p-2 rounded-lg"}
      />
      <button
        type={"button"}
        onClick={onSubmit}
        className={"p-1 bg-neutral-50 text-neutral-950 rounded-lg"}
      >
        Submit
      </button>
    </div>
  );
};

export default FileUpload;
