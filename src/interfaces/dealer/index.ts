import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DealerInterface {
  id?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface DealerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
