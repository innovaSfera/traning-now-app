"use client";

import { useState } from "react";

const InputGPT = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      {/* Input */}
      <input
        type="text"
        placeholder="Pergunte alguma coisa"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
      />
    </>
  );
};

export default InputGPT;
