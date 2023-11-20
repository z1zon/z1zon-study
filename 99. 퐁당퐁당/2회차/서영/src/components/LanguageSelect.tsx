import { languages } from "@/utils";
import { type ChangeEvent } from "react";

const LanguageSelect = ({ lang }: { lang: string }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.currentTarget.value;
    const slug = window.location.pathname.split("/").slice(2).join("/");
    window.location.pathname = `/${newLang}/${slug}`;
  };

  return (
    <select value={lang} onChange={handleChange} style={{ width: "100px" }}>
      {Object.entries(languages).map(([code, name]) => (
        <option key={name} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelect;
