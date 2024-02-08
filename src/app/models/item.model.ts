export class Item {
  constructor(
    public id?: number,
    public name: string = '',
    public description: string = '',
    public variation: string = '',
    public price: number = 0,
    public category: string = '',
    public deliveryPrice: number = 0,
    public pickupPrice: number = 0,
    public dineInPrice: number = 0,
    public image?: string
  ) {}
}