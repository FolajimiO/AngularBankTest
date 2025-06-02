export interface Account {
  id: string;
  name: string;
  type: 'chequing' | 'savings';
  balance: number;
}
