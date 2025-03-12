"use client";

import { TodoTable } from "@/components/general/Todos";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const todosStorage = localStorage.getItem("todos");

    if (!todosStorage) {
      setTodos([]);
    } else {
      setTodos(JSON.parse(todosStorage));
    }
  }, []);

  function updateTodo(newTodo: ITodo[]) {
    setTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  }

  return (
    <div className="w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Все листы</CardTitle>
          <CardDescription className="w-full">
            Создавайте и удаляйте листы
          </CardDescription>
          <Link href="/create" className={buttonVariants({}) + " ml-auto"}>
            Создать
          </Link>
        </CardHeader>
        <CardContent className="min-h-40 flex justify-center items-center">
          {todos.length == 0 ? (
            <p>пусто</p>
          ) : (
            <TodoTable todos={todos} updateTodo={updateTodo} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
