import { useOutletContext } from "react-router-dom";
import styles from "./CartPage.module.css";
export default function CartPage() {
  const { totalProducts, setTotalProducts } = useOutletContext();
  let totalPrice = totalProducts.reduce(
    (a, b) => b.Price * b.TotalItems + a,
    0
  );
  function handleDecre(itemId) {
    let productToIncre = totalProducts.find((item) => itemId === item.Id);
    if (productToIncre.TotalItems < 2) return;
    setTotalProducts((t) =>
      t.map((item) =>
        itemId === item.Id ? { ...item, TotalItems: item.TotalItems - 1 } : item
      )
    );
  }
  function handleIncre(itemId) {
    let productToIncre = totalProducts.find((item) => itemId === item.Id);
    if (productToIncre.TotalItems > 98) return;
    setTotalProducts((t) =>
      t.map((item) =>
        itemId === item.Id ? { ...item, TotalItems: item.TotalItems + 1 } : item
      )
    );
  }
  function removeItem(itemId) {
    console.log(itemId);
    setTotalProducts((t) => t.filter((item) => item.Id !== itemId));
  }
  return (
    <div className={styles.container}>
      <div className={styles.total}>Total Order Price {totalPrice}</div>
      <div className={styles.order}>
        {totalProducts.map((item) => {
          return (
            <div className={styles.card} key={item.Id}>
              <div className={styles.text}>
                <div className={styles.title}>Title: {item.Title}</div>
                <div className={styles.price}>Price: {item.Price}</div>
                <div className={styles.total}>
                  Total Items: {item.TotalItems}
                </div>
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.incre}
                  onClick={() => handleIncre(item.Id)}
                >
                  +
                </button>
                <button
                  className={styles.decre}
                  onClick={() => handleDecre(item.Id)}
                >
                  -
                </button>
                <button
                  className={styles.remove}
                  onClick={() => removeItem(item.Id)}
                >
                  Remove Item from Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
