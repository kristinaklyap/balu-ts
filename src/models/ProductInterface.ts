
export type ImageProps = {
  id: number;
  attributes: {
    url: string;
  }

}

export interface ProductInterface {
  id: number;
  attributes: {
    images: {
      data: ImageProps[]
    },
    description: string;
    title: string;
    price: number;
    price_old: number;
  };
}
