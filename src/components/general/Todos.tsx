import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type TodoTableProps = {
  todos: ITodo[];
  updateTodo: (todos: ITodo[]) => void;
};

type DialogStateType = {
  isOpen: boolean;
  id: number;
  title: string;
  content: string;
};

export function TodoTable({ todos, updateTodo }: TodoTableProps) {
  const [dialog, setDialog] = useState<DialogStateType>({
    isOpen: false,
    id: NaN,
    title: "",
    content: "",
  });

  function deleteTodo(id: number) {
    const newTodo = todos.filter((todo) => todo.id !== id);
    updateTodo(newTodo);
  }

  function saveTodoChanges() {
    const newTodo = todos.map((todo) =>
      todo.id == dialog.id
        ? { id: dialog.id, content: dialog.content, title: dialog.title }
        : todo
    );

    updateTodo(newTodo);
    setDialog({ id: NaN, title: "", content: "", isOpen: false });
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {todos.map((todo) => (
        <div key={todo.id} className="w-full flex items-center border-b-2 py-2">
          <p className="font-medium">{todo.title}</p>
          <div className="ml-auto flex gap-2">
            <Button
              onClick={() => {
                setDialog({ ...todo, isOpen: true });
              }}
              variant="outline"
            >
              Изменить
            </Button>
            <Button onClick={() => deleteTodo(todo.id)} variant="destructive">
              Удалить
            </Button>
          </div>
        </div>
      ))}

      <Dialog
        open={dialog.isOpen}
        onOpenChange={(isOpen) => setDialog((prev) => ({ ...prev, isOpen }))}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Изменение</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Название
              </Label>
              <Input
                id="title"
                onChange={(event) =>
                  setDialog((prev) => ({ ...prev, title: event.target.value }))
                }
                value={dialog.title}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Контент
              </Label>
              <Input
                id="content"
                onChange={(event) =>
                  setDialog((prev) => ({
                    ...prev,
                    content: event.target.value,
                  }))
                }
                value={dialog.content}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveTodoChanges} type="submit">
              Сохранить изменение
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
