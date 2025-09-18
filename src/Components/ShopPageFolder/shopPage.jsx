import { useEffect, useState } from "react";
import fetchData from "./shopFetchData";
import styles from "./shopPage.module.css";
import { useOutletContext } from "react-router-dom";

export default function ShopPage() {
  const [products, setProducts] = useState();
  const { totalProducts, setTotalProducts } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState({});

  useEffect(() => {
    fetchData("https://fakestoreapi.com/products?limit=8").then((results) => {
      setProducts(results.data);
      setLoading(false);
    });
  }, [setProducts]);
  function handleIncrement(productId) {
    if (inputValue[productId] <= 98 && inputValue[productId]) {
      setInputValue((i) => ({
        ...i,
        [productId]: i[productId] + 1,
      }));
    }
  }
  function handleDecrement(productId) {
    console.log(productId);
    console.log(inputValue);
    if (inputValue[productId] > 1) {
      setInputValue((i) => ({
        ...i,
        [productId]: i[productId] - 1,
      }));
    }
  }
  function handleInputChange(e, productId) {
    const value = parseInt(e.target.value || 0);
    if (value <= 99 && value >= 0) {
      setInputValue((i) => ({
        ...i,
        [productId]: value,
      }));
    }
  }
  function addToCart(itemId, itemTitle, itemPrice) {
    let totalItems = inputValue[itemId];
    let includes = totalProducts.find((item) => {
      return item.Id === itemId;
    });
    if (includes) {
      setTotalProducts((t) =>
        t.map((item) =>
          item.Id === itemId ? { ...item, TotalItems: totalItems } : item
        )
      );
    } else {
      console.log(totalItems);
      setTotalProducts((t) => {
        return [
          ...t,
          {
            Id: itemId,
            Title: itemTitle,
            Price: itemPrice,
            TotalItems: totalItems,
          },
        ];
      });
    }
    console.log(totalProducts);
  }
  if (loading) return <div className={styles.spinner}>S</div>;

  return (
    <div className={styles.container}>
      {products.map((item) => {
        return (
          <div className={styles.card} key={item.id}>
            <div className={styles.top}>
              <div key={item.title} className={styles.title}>
                {item.title}
              </div>
            </div>
            <img
              key={item.image}
              src={item.image}
              alt={item.title}
              className={styles.image}
            />
            <div className={styles.middle}>
              <div key={item.price} className={styles.price}>
                Price: {item.price}
              </div>
              <div key={item.rating} className={styles.rating}>
                Rating: {item.rating.rate}
              </div>
            </div>
            <div className={styles.bottom}>
              <input
                onChange={(e) => handleInputChange(e, item.id)}
                className={styles.input}
                value={inputValue[item.id] || ""}
              />
              <button
                className={styles.cart}
                onClick={() => addToCart(item.id, item.title, item.price)}
              >
                Add To Cart
              </button>
              <div className={styles.buttons}>
                <button
                  className={styles.increment}
                  onClick={() => handleIncrement(item.id)}
                >
                  +
                </button>
                <button
                  className={styles.decrement}
                  onClick={() => handleDecrement(item.id)}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
