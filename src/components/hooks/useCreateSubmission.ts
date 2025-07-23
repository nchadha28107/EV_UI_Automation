import { useState } from "react";

export const useCreateSubmission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreate = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const newTask = {
        id: crypto.randomUUID(), 
        title,
        description: description ?? "-", 
      };

      // Simulate async operation (e.g., saving to local storage)
      await new Promise((resolve) => setTimeout(resolve, 500)); // Optional delay for realism

      // Save to local storage
      const existingTasks = JSON.parse(localStorage.getItem("submissions") || "[]");
      localStorage.setItem(
        "submissions",
        JSON.stringify([...existingTasks, newTask])
      );

      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to create submission:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreate, isLoading, isError, isSuccess };
};
