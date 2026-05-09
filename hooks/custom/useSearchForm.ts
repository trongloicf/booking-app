import { SearchForm } from "@/type/interfaces/params";
import { useState } from "react";

export const useSearchForm = (initial: SearchForm) => {
  const [form, setForm] = useState(initial);

  const updateField = <K extends keyof SearchForm>(
    key: K,
    value: SearchForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return {
    form,
    setForm,
    updateField,
  };
};
