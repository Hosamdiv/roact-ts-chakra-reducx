export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
}

export interface IProducts {
  id: number;
  price: number;
  thumbnail: string;
  title: string;
  qty?: number;
}
