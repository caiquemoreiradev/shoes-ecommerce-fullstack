import { useCart } from "../hooks/useCart"

export const Header = () => {

    const { cart, handleCartIsOpen } = useCart();

    return (
        <header className="flex justify-between p-8 items-center bg-emerald-600 mb-12">

            <img className="w-12" src="https://cdn-icons-png.flaticon.com/512/2742/2742674.png" alt="store__logo" />

            <div onClick={handleCartIsOpen} className="bg-white p-4 rounded-full flex items-center justify-center hover:opacity-70 hover:cursor-pointer">
                {cart.length > 0 &&
                    <div className="bg-red-600 absolute w-6 h-6 rounded-full top-6 right-8 flex justify-center text-white">
                        <span>{cart.length}</span>
                    </div>}
                <img className="w-8" src="https://cdn-icons-png.flaticon.com/512/4290/4290854.png" alt="cart_icon" />
            </div>
        </header>
    )
}