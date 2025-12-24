export type Category = {
  id: string;
  name: string;
  createdAt: string;
};

export type Todo = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  completed: boolean;
  categoryId: string;
};
