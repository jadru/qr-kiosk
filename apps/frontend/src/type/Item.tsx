export interface Item {
  image: any;
  item_id: string;
  name: string;
  price: string;
}
export interface CountedItem {
  image: any;
  item_id: string;
  name: string;
  price: string;
  count?: number;
}

export interface CountedItemList extends Array<CountedItem> {}
