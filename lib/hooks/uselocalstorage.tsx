import { useState, useEffect } from "react";

export default function useLocalStorage<T>(
  keyName: string,
  initialValue: Array<T>,
) {
  const [formData, setFormData] = useState<Array<FormData>>(initialValue);

  useEffect(() => {
    const savedValue = localStorage.getItem(keyName);
    if (savedValue) {
      setFormData(formData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(formData));
  }, [formData]);

  return [formData, setFormData] as const;
}
