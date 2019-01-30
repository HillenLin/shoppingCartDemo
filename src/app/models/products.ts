export const imageBasepath = './assets/images/';

export interface ProductsModel {
    title: string;
    brand: string;
    price: number;
    description: string;
    image: string;
    id?:number;
}