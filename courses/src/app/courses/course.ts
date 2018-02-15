export interface Course {
  id: number;
  duration: number;
  creationDate: number;
  name: string;
  description: string;
  topRated: boolean;
  authors: string[]
}