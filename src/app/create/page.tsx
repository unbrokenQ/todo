"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type TodoErrorType = {
  title: boolean;
  content: boolean;
};

type TodoValuesType = {
  title: string;
  content: string;
};

export default function CreateTodoPage() {
  const router = useRouter();
  const [todoError, setTodoError] = useState<TodoErrorType>({
    title: false,
    content: false,
  });

  const [todoValue, setTodoValue] = useState<TodoValuesType>({
    title: "",
    content: "",
  });

  function handleInputValue(name: string, value: string) {
    setTodoValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddTodo() {
    if (todoValue.title.length < 10) {
      toast("Ошибка", {
        description: "Название меньше 10 символов",
      });
      setTodoError((prev) => ({ ...prev, content: false }));
      setTodoError((prev) => ({ ...prev, title: true }));
      return;
    }

    if (todoValue.content.length < 10) {
      toast("Ошибка", {
        description: "Контент меньше 10 символов",
      });

      setTodoError((prev) => ({ ...prev, title: false }));
      setTodoError((prev) => ({ ...prev, content: true }));
      return;
    }

    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    console.log(todos);

    const newTodos = JSON.stringify([
      { ...todoValue, id: Date.now() },
      ...todos,
    ]);
    localStorage.setItem("todos", newTodos);
    setTodoError({ content: false, title: false });
    toast("Успешно", {
      description: "Вы успешно добавили лист",
    });
    router.back();
  }

  return (
    <div className="w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Создать новый лист</CardTitle>
          <CardDescription>Создавайте и удаляйте листы</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[15rem] grid gap-2">
          <div className="flex flex-col gap-2">
            <Label>Название</Label>
            <Input
              placeholder="Название"
              onChange={(event) =>
                handleInputValue(event.target.name, event.target.value)
              }
              value={todoValue.title}
              type="text"
              name="title"
              aria-invalid={todoError.title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Контент</Label>
            <Textarea
              placeholder="Контент"
              onChange={(event) =>
                handleInputValue(event.target.name, event.target.value)
              }
              name="content"
              aria-invalid={todoError.content}
            />
          </div>
          <div className="flex gap-4">
            <Button onClick={handleAddTodo} className="">
              Создать
            </Button>
            <Link href="/" className={buttonVariants({ variant: "outline" })}>
              Назад
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
