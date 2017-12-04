export interface Course {
  id: number;
  duration: number;
  creation_date: number;
  name: string;
  description: string;
  tags: Array<string>;
}