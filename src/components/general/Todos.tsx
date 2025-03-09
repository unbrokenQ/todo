import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

export function TodoTable({ todos }: { todos: ITodo[] }) {
  return (
    <Table className="w-3xl">
      <TableCaption>Все листы</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Название</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="font-medium">{todo.title}</TableCell>
            <div className="ml-auto">
              <Button>Изменить</Button>
            </div>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
