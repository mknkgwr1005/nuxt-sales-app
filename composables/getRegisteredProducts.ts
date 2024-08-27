import { useIndexStore } from "@/stores/index";
import { onMounted, onUnmounted } from "vue";

export const useSearchRegisteredProducts = () => {
  const store = useIndexStore();

  // ユーザー情報を取得
  const checkLoginStatus = async () => {
    await store.fetchUserStatus();
  };
  checkLoginStatus();

  let intervalId: number | null = null;

  /**
   * APIで商品を検索する
   */
  const getProduct = async () => {
    console.log("Getting registered products");
    await store.getRegisteredProducts();
  };

  /**
   * Firestoreから登録商品を取得する
   */
  const fetchProducts = async () => {
    await store.fetchRegisterData(); // DBからデータを取得
  };

  /**
   * 登録した商品を定期的に検索する
   */
  const searchRegisteredProducts = async () => {
    await fetchProducts();
    if (intervalId === null) {
      intervalId = window.setInterval(() => {
        getProduct();
      }, 300000);
    }
  };

  const stopSearchRegisteredProducts = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  onMounted(() => {
    searchRegisteredProducts();
  });

  onUnmounted(() => {
    console.log("Component unmounted");
    stopSearchRegisteredProducts();
  });

  return { searchRegisteredProducts, stopSearchRegisteredProducts };
};
