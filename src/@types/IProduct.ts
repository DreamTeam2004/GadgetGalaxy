interface IProduct {
    id: string;
    category: string;
    subcategory: string;
    name: string;
    description: string;
    price: number;
    newPrice?: number;
    rating: number;
    reviewsCount: number;
    images: any[];
    createdAt: string;
    updatedAt: string;
  }

  export type { IProduct };