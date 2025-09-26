import axios, { type AxiosResponse } from "axios";
import type { ProductType } from "../types/Types";

class ProductService {
  BASE_URL = "https://fakestoreapi.com";

  getAllProducts(): Promise<ProductType[]> {
    return new Promise((resolve, reject) => {
      axios
        .get<ProductType[]>(`${this.BASE_URL}/products`)
        .then((response: AxiosResponse<ProductType[]>) =>
          resolve(response.data)
        )
        .catch((error) => reject(error));
    });
  }

  getProductById(productId: number): Promise<ProductType> {
    return new Promise((resolve, reject) => {
      axios
        .get<ProductType>(`${this.BASE_URL}/products/${productId}`)
        .then((response: AxiosResponse<ProductType>) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }
}

export default new ProductService();
