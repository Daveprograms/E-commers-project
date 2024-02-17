export class Product {
  id: string;
  sku: string;
  name: string;

  description: string;
  unitPrice: number;
  // unitDecimal: number;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  dateCreated: Date;
  lastUpdate: Date;
}
