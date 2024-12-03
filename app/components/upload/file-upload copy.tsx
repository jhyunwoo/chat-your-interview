"use client"

import DefaultLayout from "@/app/components/default-layout";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface FormData {
  content: string;
}

const FileUpload = ({
  keyName
}) => {
  const [formData, setFormData] = useState<Array<FormData>>([{
    content: "",
  }]);

  useEffect(() => {
    const savedValue = localStorage.getItem(keyName);
    if (savedValue) {
      setFormData(formData);
    }
  })

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(formData));
  }, [formData]);

  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setStatus("Saving...");

    try {
      setFormData((prevData) => ([
        ...prevData,
        {"content": e.target.content.value}
      ]));
    } catch (error) {
      console.error("Error saving data:", error);
      setStatus("An error occurred.");
    } finally {
      setStatus("Saved!")
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
      {status && <p>{status}</p>}
      </DefaultLayout>
  );
};

export default FileUpload;
