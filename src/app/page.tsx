"use client";

import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const todosStorage = localStorage.getItem("todos");
    return [];
  });
  return <div className=""></div>;
}
