import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ProductProps } from '../hooks/useLoadProducts';

interface CartProviderProps {
    children: ReactNode;
}

interface UpdateProductAmount {
    productId: string;
    amount: number;
    size: number;
}

export interface CartProducts {
    id: number;
    product: ProductProps;
    quantity: number;
    size: number
}

export interface CartContextData {
    isCartOpen: boolean;
    cart: CartProducts[];
    handleCartIsOpen: () => void;
    addProduct: (product: ProductProps, size: number) => Promise<void>;
    removeProduct: (itemId: number) => void;
    updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {

    const [cart, setCart] = useState<CartProducts[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addProduct = async (product: ProductProps, size: number) => {

        const cartItemId = Math.floor(Math.random() * 50000);

        try {

            const updatedCart = [...cart];
            const itemIndex = updatedCart.findIndex(item =>  item.product.id === product.id && item.size === size);

            if (itemIndex > -1) {

                updatedCart[itemIndex].quantity++;
                
            }

            else {

                const newProduct = {
                    id: cartItemId,
                    product,
                    quantity: 1,
                    size
                }

                updatedCart.push(newProduct);
            }



            setCart(updatedCart);

        } catch {

            console.log('Error when add product')
        }
    };

    const removeProduct = (itemId: number) => {

        try {

            const updatedCart = [...cart];
            const productIndex = updatedCart.findIndex(item => item.id === itemId);

            if (productIndex >= 0) {

                updatedCart.splice(productIndex, 1);
                setCart(updatedCart);
            }

            else {

                throw Error();
            }

        } catch {


            console.log('Error when remove product')
        }
    };

    const updateProductAmount = async ({
        productId,
        amount,
        size,
    }: UpdateProductAmount) => {

        const updatedCart = [...cart];

        try {

            if (amount <= 0) {

                return;
            }

            const itemIndex = updatedCart.findIndex(item =>  item.product.id === productId && item.size === size);

            if (itemIndex > -1) {

                updatedCart[itemIndex].quantity = amount;
                setCart(updatedCart);
            }
            else {
                throw Error();
            }

        } catch {

            //toast.error('Erro na alteração de quantidade do produto');
        }
    };

    const handleCartIsOpen = () => {

        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartContext.Provider
            value={{
                isCartOpen,
                cart,
                handleCartIsOpen,
                addProduct,
                removeProduct,
                updateProductAmount
            }}
        >
            {children}
        </CartContext.Provider>
    );
}