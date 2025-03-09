"use client";

import { TodoTable } from "@/components/general/Todos";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const todosStorage = localStorage.getItem("todos");

    if (!todosStorage) return [];

    return JSON.parse(todosStorage);
  });

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Все листы</CardTitle>
          <CardDescription>Создавайте и удаляйте листы</CardDescription>
        </CardHeader>
        <CardContent>
          <TodoTable todos={todos} />
        </CardContent>
      </Card>
    </div>
  );
}
