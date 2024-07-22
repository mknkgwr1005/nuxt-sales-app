import { useIndexStore } from "@/stores/index";
import { onMounted, onUnmounted } from "vue";

export const useSearchRegisteredProducts = () => {
  const store = useIndexStore();
  store.fetchUserStatus(); //ユーザー情報を取得
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
      }, 60000);
    }
    console.log("Interval ID after setInterval:", intervalId);
  };

  const stopSearchRegisteredProducts = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  onMounted(() => {
    console.log("Component mounted");
    searchRegisteredProducts();
  });

  onUnmounted(() => {
    console.log("Component unmounted");
    stopSearchRegisteredProducts();
  });

  return { searchRegisteredProducts, stopSearchRegisteredProducts };
};
