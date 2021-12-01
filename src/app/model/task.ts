import {Label} from './label';

export interface Task {
  id?: number;
  title?: string;
  description?: string;
  deadline?: string;
  image?: string;
  position?: number;
  labels?: Label[];
  status?: {
    id: number;
  };
}
