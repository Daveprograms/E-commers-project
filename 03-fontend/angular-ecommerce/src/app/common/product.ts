export class Product {
    constructor(
      public sku: string,
      public name: string,
      public description: string,
      public unitprice: number, // note the lowercase 'p'
      public imageUrl: string,
      public active: boolean,
      public unitsInStock: number,
      public dateCreated: Date,
      public lastUpdated: Date // note the lowercase 'L'
    ) {}
  }
  