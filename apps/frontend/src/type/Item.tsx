export interface Item {
  image: any;
  itemid: string;
  itemname: string;
  itemprice: string;
}
export interface CountedItem {
  image: any;
  itemid: string;
  itemname: string;
  itemprice: string;
  count?: number;
}

export interface CountedItemList extends Array<CountedItem> {}
