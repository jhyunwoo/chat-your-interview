
import { useState, useEffect, FormEvent } from "react";

export default function useLocalStorage<T>(keyName: string, initialValue: Array<T>) {
    const [formData, setFormData] = useState<Array<FormData>>(initialValue);

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

  return [formData, setFormData] as const;
}