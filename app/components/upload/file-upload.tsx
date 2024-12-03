"use client";

import DefaultLayout from "@/app/components/default-layout";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import useLocalStorage from "@/lib/hooks/uselocalstorage";

interface FormData {
  content: string;
}

const FileUpload = ({
  keyName
}) => {
  const [formData, setFormData] = useLocalStorage(keyName, []);

  // const [formData, setFormData] = useState<Array<FormData>>([{
  //   content: "",
  // }]);

  // useEffect(() => {
  //   const savedValue = localStorage.getItem(keyName);
  //   if (savedValue) {
  //     setFormData(formData);
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem(keyName, JSON.stringify(formData));
  // }, [formData]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      setFormData((prevData) => [
        ...prevData,
        { content: e.target.content.value },
      ]);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <DefaultLayout className={"flex items-center justify-center text-white"}>
      <h1>{keyName}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            :
            <textarea className="text-black"
              name="content"
              value={formData.content}
              required
            />
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
      <label>
        Saved {keyName}:
        <div>
          {formData.map((data, index) => (
            <p key={index}>{data.content}</p>
          ))}
        </div>
      </label>
      </DefaultLayout>
  );
};

export default FileUpload;


