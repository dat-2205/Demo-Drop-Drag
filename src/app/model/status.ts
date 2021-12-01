import { Task } from './task';

export interface Status {
  id?: number;
  title?: string;
  position?: number;
  tasks?: Task[];
}
