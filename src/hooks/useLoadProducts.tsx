import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

export interface ProductProps {
    id: string,
    name: string,
    price: number,
    old_price: number,
    image: string,
    active: boolean,
    on_promo: boolean;
    sizes: number[]
}


const loadProducts = async (): Promise<ProductProps[]> => {

    const response = await axios.get<ProductProps[]>(`http://localhost:8080/products`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Accept': 'application/json, text/plain, */*',
        }
    })

    return response.data;

}

export const useLoadProducts = () => {

    const query = useQuery({
        queryFn: loadProducts,
        queryKey: ['load-products'],
    })

    return {
        ...query,
        data: query
    };
} 