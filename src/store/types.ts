export type State = {
  restaurants: Restaurant[];
  restaurantsLoading: boolean;
  selectedRestaurant: Restaurant | null;
  selectedPizza: Product | null;
  products: ProductMap;
  productsLoading: boolean;
  selectedItems: Item[];
  prices: PriceMap;
};

export type Restaurant = {
  address1: string;
  address2?: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
};

type ProductMap = {
  [id: number]: Product[];
};

type Category = "Pizza" | "Dryck" | "Tillbehör";

export type Product = {
  category: Category;
  id: string;
  name: string;
  price: number;
  rank?: number;
  topping?: string[];
};

export type Item = {
  restaurant: Restaurant;
  pizza: Product;
  id: string;
};

type PriceMap = {
  [id: string]: number;
};
