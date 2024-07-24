export const useSearchProducts = () => {
  const store = useIndexStore();

  if (store.searchOption === "yahoo") {
    store.getProductList();
    // 子カテゴリを取得する
    store.findCategoryDetail();
  } else if (store.searchOption === "rakuten") {
    store.getRktProductList();
    // 子カテゴリを取得する
    store.findRktChildCategory();
  } else {
    window.alert("検索できませんでした。");
  }
};
