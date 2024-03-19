import Link from "next/link";
import { CartProducts } from "../contexts/cart";
import { useCart } from "../hooks/useCart";
import { Trash, X } from "@phosphor-icons/react";

export const Cart = () => {

    const { cart, updateProductAmount, removeProduct, handleCartIsOpen } = useCart();

    const total =
        cart.reduce((sumTotal, item) => {
            return sumTotal + item.product.price * item.quantity;
        }, 0)

    function handleProductIncrement(item: CartProducts) {

        updateProductAmount({ productId: item.product.id, amount: item.quantity + 1, size: item.size });
    }

    function handleProductDecrement(item: CartProducts) {

        updateProductAmount({ productId: item.product.id, amount: item.quantity - 1, size: item.size });

    }

    function handleRemoveProduct(itemId: number) {

        removeProduct(itemId);
    }


    return (
        <div className="flex absolute top-0 left-0 w-full h-[100vh]">

            <div className="bg-gray-600 opacity-70 w-full" />

            <section className="bg-white w-[45%] p-6 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between">
                        <h1 className="font-bold text-2xl">Products on cart</h1>

                        <button className="hover:opacity-70 hover:cursor-pointer" onClick={handleCartIsOpen}><X /></button>
                    </div>

                    <div className="pt-10 pr-4 overflow-y-scroll h-[70vh]" style={{ scrollbarWidth: 'none' }}>
                        {cart.length > 0 ? (
                            <>
                                {cart.map(item => (
                                    <div className="my-6 flex gap-4" key={item.id}>
                                        <img className="w-24" src={item.product.image} alt={item.product.name} />

                                        <div>
                                            <div className="flex justify-between items-center">
                                                <p>{item.product.name}</p>
                                                <button className=" bg-red-600 p-2 ml-2 rounded-full text-white hover:opacity-70 hover:cursor-pointer" onClick={() => handleRemoveProduct(item.id)}><Trash /></button>
                                            </div>

                                            <span>Size: {item.size}</span>
                                            <div className="flex items-center gap-4">
                                                <div className="flex gap-4 items-center my-4">
                                                    <button className={`bg-red-500 w-6 h-6 flex items-center justify-center text-white rounded-full hover:opacity-70 hover:cursor-pointer ${item.quantity === 1 && 'bg-gray-400 hover:cursor-not-allowed'}`} onClick={() => handleProductDecrement(item)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button className="bg-emerald-500 w-6 h-6 flex items-center justify-center text-white rounded-full hover:opacity-70 hover:cursor-pointer" onClick={() => handleProductIncrement(item)}>+</button>
                                                </div>
                                                <p>Item total: <strong>
                                                    {(item.product.price * item.quantity).toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                    })}</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                }
                            </>
                        ) : (
                            <div className="flex flex-col items-center mt-20">
                                <p>There is nothing on cart right now!</p>
                                <span>Try shoppping around</span>
                            </div>
                        )}
                    </div>
                </div>

                {cart.length > 0 && (
                    <div className="flex justify-between items-center">
                        <h3>Cart Total: <strong>
                            {(total).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}</strong></h3>

                        <form action="/api/checkout_sessions" method="POST">
                            <section>
                                <Link href={'/checkout'} className="bg-emerald-500 py-3 px-6 text-white rounded-xl" type="submit" role="link">
                                    Checkout
                                </Link>
                            </section>
                        </form>
                    </div>
                )}
            </section>
        </div>
    )
}