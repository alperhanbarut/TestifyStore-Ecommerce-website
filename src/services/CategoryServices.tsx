import axios, { type AxiosResponse } from "axios";
import type { ProductType } from "../types/Types";

class CategoryServices {
  BASE_URL = "https://fakestoreapi.com";

  getProductByCategoryName(categoryName: string): Promise<ProductType[]> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`${this.BASE_URL}/products/category/${categoryName}`)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}

export default new CategoryServices();
