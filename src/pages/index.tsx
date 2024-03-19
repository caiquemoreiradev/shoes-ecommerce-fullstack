import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useLoadProducts } from "../hooks/useLoadProducts"
import { useCart } from "../hooks/useCart";
import { Cart } from "../components/Cart";
import { Plus } from "@phosphor-icons/react";

export default function Home() {

  const { data } = useLoadProducts();

  const { addProduct, isCartOpen } = useCart();

  const [filteredProducts, setFilteredProducts] = useState(data?.data);
  const [searchValue, setSearchValue] = useState('');

  const [selectedSize, setSelectedSize] = useState({ size: 0, itemId: '' });

  const [isUserSearching, setIsUserSearching] = useState(false);

  const searchProducts = () => {

    if (searchValue) {

      setIsUserSearching(true);

      setFilteredProducts(data?.data.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase())))
    }
  }

  const clearSearch = () => {

    setFilteredProducts(data?.data);
    setSearchValue('');

    setIsUserSearching(false);
  }

  return (
    <div className="flex-1 mb-10">

      <Header />

      <div className="flex justify-center mb-10 gap-2">
        <input
          value={searchValue}
          onChange={(e => setSearchValue(e.target.value))}
          type="text"
          placeholder="search for products..."
          className='bg-gray-100 w-4/5 py-2 px-4 rounded-xl'
        />
        <button
          onClick={searchProducts}
          className={`bg-emerald-600 px-6 py-3 text-white rounded-xl ${!searchValue && 'bg-gray-300 hover:cursor-not-allowed'}`}
        >
          search
        </button>
        {isUserSearching && (
          <button
            onClick={clearSearch}
            className="bg-red-600 px-6 py-3 text-white rounded-xl"
          >
            clear
          </button>
        )}
      </div>

      <div className="py-8 grid grid-cols-4 gap-4 justify-items-center">
        {!filteredProducts ? (
          <>
            {data?.data && data?.data?.map(item => {
              return (
                <div key={item.id} className="w-64 mx-3">
                  {item.on_promo && <p className="absolute bg-red-600 px-4 py-3 text-white font-semibold rounded-lg">Promo</p>}
                  <div className="bg-blue-100 p-5 rounded-xl">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                  </div>
                  <div className="flex justify-evenly my-4">
                    {item.sizes.map(size => (
                      <div
                        className={`p-2 hover:opacity-70 hover:cursor-pointer  ${(JSON.stringify(selectedSize) === JSON.stringify({ size, itemId: item.id })) ? 'border-emerald-600' : 'border-gray-100'}`}
                        key={size}
                      >
                        <span onClick={() => setSelectedSize({ size, itemId: item.id })}>{size}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex mt-3">
                    {item.on_promo && <p className="line-through text-2xl font-bold grow text-red-600">{(item.old_price).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                    </p>}
                    <p className="text-2xl font-bold grow">{(item.price).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                    </p>
                    <button
                      disabled={selectedSize.itemId !== item.id}
                      className="bg-emerald-400 text-white py-1 px-3 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
                      onClick={() => {
                        addProduct(item, selectedSize.size),
                          setSelectedSize({ size: 0, itemId: '' })
                      }}
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <>
            {filteredProducts && filteredProducts?.map(item => {

              return (
                <div key={item.id} className="w-64 mx-3">
                  {item.on_promo && <p className="absolute bg-red-600 px-4 py-3 text-white font-semibold rounded-lg">Promo</p>}
                  <div className="bg-blue-100 p-5 rounded-xl">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                  </div>
                  <div className="flex justify-evenly my-4">
                    {item.sizes.map(size => (
                      <div
                        className={`p-2 hover:opacity-70 hover:cursor-pointer border ${(JSON.stringify(selectedSize) === JSON.stringify({ size, itemId: item.id })) ? 'border-emerald-600' : 'border-gray-100'}`}
                        key={size}
                      >
                        <span onClick={() => setSelectedSize({ size, itemId: item.id })}>{size}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex mt-3">
                    {item.on_promo && <p className="line-through text-2xl font-bold grow text-red-600">{(item.old_price).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                    </p>}
                    <p className="text-2xl font-bold grow">{(item.price).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                    </p>
                    <button
                      disabled={selectedSize.itemId !== item.id}
                      className="bg-emerald-400 text-white py-1 px-3 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
                      onClick={() => {
                        addProduct(item, selectedSize.size),
                          setSelectedSize({ size: 0, itemId: '' })
                      }}
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>

      {isCartOpen && <Cart />}
    </div>
  )
}
