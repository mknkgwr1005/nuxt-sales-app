import { useIndexStore } from "~/stores/index";
import { onMounted, onUnmounted } from "vue";

export const useSearchRegisteredProducts = () => {
  const store = useIndexStore();
  let intervalId: number | null = null;

  /**
   * DBから登録している商品を取得してくる
   */
  const getProduct = async () => {
    console.log("Getting registered products");
    await store.getRegisteredProducts();
    console.log("Products fetched");
  };

  /**
   * 登録した商品を定期的に検索する
   */
  const searchRegisteredProducts = () => {
    console.log("searchingRegisteredProducts");
    console.log("Interval ID before setInterval:", intervalId);
    store.fetchRegisterData(); // DBからデータを取得
    if (intervalId === null) {
      intervalId = window.setInterval(() => {
        console.log("Interval tick");
        getProduct();
      }, 6000);
    }
    console.log("Interval ID after setInterval:", intervalId);
  };

  onMounted(() => {
    console.log("Component mounted");
    searchRegisteredProducts();
  });

  onUnmounted(() => {
    console.log("Component unmounted");
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  });

  //   各Componentや、ページで使えるようにする
  return { searchRegisteredProducts };
};
