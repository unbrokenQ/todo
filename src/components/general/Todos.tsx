import { Button } from "../ui/button";

export function TodoTable({ todos }: { todos: ITodo[] }) {
  return (
    <div className="w-full flex flex-col gap-2">
      {todos.map((todo) => (
        <div key={todo.id} className="w-full flex items-center border-b-2 py-2">
          <p className="font-medium">{todo.title}</p>
          <div className="ml-auto flex gap-2">
            <Button variant="outline">Изменить</Button>
            <Button variant="secondary">Удалить</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
