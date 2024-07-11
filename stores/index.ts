import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "~/firebase";
import { commonProducts } from "~/types/commonProducts";
import { Category } from "~/types/rakuten/Category";
import { rktProducts } from "~/types/rakuten/rktProducts";
import type { newArriveItem } from "~/types/registerProducts/newArriveItem";
import { apiProducts } from "~/types/yahoo/apiProducts";
// import axios from "~/plugins/axios";
import axios from "axios";

export const useIndexStore = defineStore("index", {
  state: () => ({
    inputValue: "",
    searchOption: "",
    totalProductsNum: 0,
    totalPageNum: 1,
    productsPerPage: 0,
    currentPageNum: 1,
    results: 20,
    start: 1,
    filterOn: false,
    productList: new Array<apiProducts>(),
    rktProductList: new Array<rktProducts>(),
    displayData: [
      { text: "表示数", value: 0 },
      { text: "5件", value: 5 },
      { text: "10件", value: 10 },
      { text: "15件", value: 15 },
      { text: "20件", value: 20 },
    ],
    changeOrderData: [
      { text: "並び替え", value: "title" },
      { text: "おすすめ", value: "reccomend" },
      { text: "レビューが多い順", value: "popular" },
      { text: "価格が安い順", value: "cheapest" },
      { text: "価格が高い順", value: "expensive" },
    ],
    sort: "",
    yahooCategory: new Array<Category>(),
    yCategory: new Array<Category>(),
    yImagePath: "",
    rktCategory: new Array<Category>(),
    rktChildCategory: [],
    //親カテゴリ（表示用）
    genre: "",
    //子カテゴリ（表示用）
    childGenre: new Array<Category>(),
    lastHitUrl: "",
    registerData: new Array<newArriveItem>(),
    announceData: new Array<commonProducts>(),
    announceSize: 5,
    stopSearchCount: 3,
  }),
  actions: {
    /**
     *  yahooの商品を取得する
     * @param context -state
     */
    async getProductList() {
      this.rktProductList = [];
      const stateSort = this.sort;
      let sortOptions = null;

      if (stateSort.length !== 0) {
        if (stateSort === "reccomend") {
          sortOptions = "-score";
        } else if (stateSort === "popular") {
          sortOptions = "-review_count";
        } else if (stateSort === "cheapest") {
          sortOptions = "+price";
        } else if (stateSort === "expensive") {
          sortOptions = "-price";
        }
      }

      const stateGenre = this.genre;
      let sortGenre = null;

      if (stateGenre.length !== 0) {
        sortGenre = stateGenre;
      }
      let resultsNum = null;
      if (this.results !== 0) {
        this.productsPerPage = this.results;
        resultsNum = this.productsPerPage;
      }
      if (this.currentPageNum !== 1) {
        console.log(this.currentPageNum);
        this.goToNextPage();
      }
      const { $axios } = useNuxtApp();
      const config = useRuntimeConfig();

      try {
        // 通信先のHTTP以降を指定する
        const response = await $axios.get("/ShoppingWebService/V3/itemSearch", {
          //パラメータリクエスト
          params: {
            appid: config.public.YAHOO_API_APPID,
            query: this.inputValue,
            image_size: 300,
            genre_category_id: sortGenre,
            results: resultsNum,
            start: this.start,
            sort: sortOptions,
          },
        });
        const payload = response.data;
        // 商品を表示させる
        this.showProductList(payload.hits);
        // 商品を取得したら、ページ数とヒット数を表示する
        this.handlePageNum(payload);
      } catch (err: any) {
        console.log(err.message);
      }
    },
    /**
     * yahoo-カテゴリを探す
     */
    async findCategoryDetail() {
      const categoryIds = [
        13457, 2498, 2505, 2511, 2513, 2501, 2500, 2502, 2504, 2506, 2507, 2508,
        2503, 2509, 2510, 2497, 2512, 2514, 2516, 2517, 10002,
      ];
      const payload = [];
      const { $axios } = useNuxtApp();
      // すべてのカテゴリを取得する
      for (const categoryid of categoryIds) {
        const config = useRuntimeConfig();
        const response = await $axios.get(
          "/ShoppingWebService/V1/categorySearch",
          {
            params: {
              appid: config.public.YAHOO_API_APPID,
              category_id: categoryid,
              output: "json",
            },
          }
        );

        const currentCategory =
          response.data.ResultSet["0"].Result.Categories.Current;
        const childrenCategories =
          response.data.ResultSet["0"].Result.Categories.Children;

        payload.push({
          currentCategory,
          childrenCategories,
        });
      }
      this.showYahooCategory(payload);
    },
    /**
     * 楽天の商品を取得する
     * @param context
     */
    async getRktProductList() {
      this.productList = [];
      const stateSort = this.sort;
      let sortOptions = null;

      if (stateSort.length !== 0) {
        if (stateSort === "reccomend") {
          sortOptions = "-reviewAverage";
        } else if (stateSort === "popular") {
          sortOptions = "-reviewCount";
        } else if (stateSort === "cheapest") {
          sortOptions = "+itemPrice";
        } else if (stateSort === "expensive") {
          sortOptions = "-itemPrice";
        }
      }

      const stateGenre = this.genre;
      let sortGenre = null;

      if (stateGenre.length !== 0) {
        sortGenre = stateGenre;
      }

      if (this.results !== 0) {
        this.productsPerPage = this.results;
      }
      if (this.currentPageNum !== 1) {
        this.goToNextPage();
      }

      try {
        const { $axiosRakuten } = useNuxtApp();
        const config = useRuntimeConfig();

        const response = await $axiosRakuten.get(
          "/IchibaItem/Search/20170706",
          {
            params: {
              applicationId: config.public.RAKUTEN_API_APPID,
              keyword: this.inputValue,
              genreId: sortGenre,
              sort: sortOptions,
              hits: this.productsPerPage,
              page: this.start,
            },
          }
        );

        const payload = response.data;
        this.showRktProductList(payload.Items);
        this.handlePageNum(payload);
      } catch (err: any) {
        console.log(err);
      }
    },
    /**
     * 楽天－すべてのカテゴリをfetchする
     */
    async findRktChildCategory() {
      const payload = [];
      const genreIds: number[] = [];

      const { $axiosRakuten } = useNuxtApp();
      const config = useRuntimeConfig();
      const parents = await $axiosRakuten.get("/IchibaGenre/Search/20140222", {
        params: {
          applicationId: config.public.RAKUTEN_API_APPID,
          genreId: 0,
        },
      });

      const parentsData = parents.data;
      const children = parentsData.children;

      for (const genre of Object.keys(children)) {
        const data = children[genre];
        genreIds.push(data.child.genreId);
      }

      for (const genreId of genreIds) {
        const response = await $axiosRakuten.get(
          "/IchibaGenre/Search/20140222",
          {
            params: {
              applicationId: config.public.RAKUTEN_API_APPID,
              genreId: genreId,
            },
          }
        );
        payload.push(response.data);
      }

      this.showRakutenChild(payload);
    },
    /**
     * 前のカテゴリを削除する
     */
    resetGenreCategory() {
      console.log("reset");

      this.genre = "";
      this.childGenre = [];
      this.results = 20;
      this.sort = "";
      this.currentPageNum = 1;
    },
    /**
     * 速報を表示する
     * @param state
     * @param payload
     */
    async showNewArriveData(payload: commonProducts) {
      const newItem = payload;

      // 既に存在するアイテムかどうかをチェック
      const isItemExist = this.announceData.some(
        (item) => item.url === newItem.url
      );

      if (!isItemExist) {
        // 配列のサイズを制限する（例：最大10件まで）
        if (this.announceData.length >= this.announceSize) {
          this.announceData.shift(); // 古いアイテムを削除
        }

        this.announceData.push(payload);
      }
    },
    /**
     * 速報用に、検索で１番新しいURLをセットする
     * @param state
     * @param payload
     */
    setlastHitUrl(payload: any) {
      this.lastHitUrl = payload.hits[0].url;
    },
    /**
     * 監視する商品を登録する
     * @param state
     * @param payload
     */
    async setRegisterData(payload: any) {
      const searchOption = this.searchOption;
      const payloadData =
        searchOption === "yahoo"
          ? {
              searchOption: this.searchOption,
              keyword: this.inputValue,
              name: payload.name,
              brand: payload.brand.name,
              genre: payload.genreCategory.name,
              genreId: payload.genreCategory.id,
              image: payload.image.medium,
              url: payload.url,
              lastHitUrl: this.lastHitUrl,
            }
          : {
              searchOption: this.searchOption,
              keyword: this.inputValue,
              name: payload.itemName,
              genreId: payload.genreId,
              image: payload.itemUrl,
              url: payload.itemUrl,
              lastHitUrl: this.lastHitUrl,
            };

      // データの重複をチェック
      const registerDataCollection = collection(db, "registerData");
      const querySnapshot = await getDocs(
        query(
          registerDataCollection,
          where("name", "==", payloadData.name),
          where("genreId", "==", payloadData.genreId),
          where("url", "==", payloadData.url)
        )
      );

      if (!querySnapshot.empty) {
        return window.alert("同じデータが既に存在します");
      } else {
        // firebaseに送るメソッド
        const registerDataRef = db.collection("registerData");
        registerDataRef.doc().set(payloadData, { merge: true });
      }
    },
    /**
     * 登録した商品を取得する
     * @param state
     */
    fetchRegisterData() {
      const registerDataRef = db.collection("registerData");

      // stateにセットする
      registerDataRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          this.registerData.push({
            searchOption: data.searchOption,
            keyword: data.keyword,
            name: data.name,
            image: data.image,
            brand: data.brand,
            genreId: data.genreId,
            genre: data.genre,
            url: data.url,
            lastHitUrl: data.lastHitUrl,
          });
        });
      });
    },
    /**
     * 登録商品の削除
     * @param payload
     */
    async deleteRegisteredProduct(payload: any) {
      // データの重複をチェック
      const registerDataCollection = collection(db, "registerData");
      const queryData = query(
        registerDataCollection,
        where("name", "==", payload.name),
        where("genreId", "==", payload.genreId),
        where("url", "==", payload.url)
      );

      const deleteData = await getDocs(queryData);
      if (deleteData) {
        // ドキュメントをループして削除
        deleteData.forEach(async (documentSnapshot) => {
          try {
            await deleteDoc(doc(db, "registerData", documentSnapshot.id));
            window.alert("商品を削除しました");
          } catch (error) {
            window.alert("Error removing document: " + error);
          }
        });
        // stateの削除
        const newRegisterData = this.registerData.filter(
          (item) =>
            item.name !== payload.name &&
            item.genreId !== payload.genreId &&
            item.url !== payload.url
        );
        this.registerData = newRegisterData;
      } else {
        return;
      }
    },
    /**
     * yahooの商品を表示するメソッド
     * @param state - yahooの商品リスト
     * @param payload - apiから取得した商品リスト
     */
    showProductList(payload: any) {
      this.productList = new Array<apiProducts>();
      for (const product of payload) {
        this.productList.push(
          new apiProducts(
            product.index,
            product.name,
            product.description,
            product.headLine,
            product.url,
            product.inStock,
            product.code,
            product.condition,
            product.imageId,
            product.image,
            product.review,
            product.offiliateRate,
            product.price,
            product.premiumPrice,
            product.premiumPriceStatus,
            product.premiumDiscountRate,
            product.premiumDiscountType,
            product.priceLabel,
            product.point,
            product.shipping,
            product.genreCategory,
            product.parentGenreCategories,
            product.brand,
            product.parentBrands,
            product.janCode,
            product.payment,
            product.releaseDate,
            product.seller,
            product.delivery
          )
        );
      }
    },
    /**
     * yahooの子カテゴリを表示する
     * @param state
     * @param payload
     */
    showYahooCategory(payload: any) {
      const displayCategory = [];

      for (const { currentCategory, childrenCategories } of payload) {
        displayCategory.push({
          text: currentCategory.Title.Medium,
          value: currentCategory.Id,
        });

        const selectedGenre = this.genre;
        const currentGenreId = String(currentCategory.Id);
        const displayChildCategory = [];

        //  子カテゴリの表示
        if (selectedGenre === currentGenreId) {
          for (const key in childrenCategories) {
            if (key === "_container") continue;
            const child = childrenCategories[key];
            displayChildCategory.push({
              text: `- ${child.Title.Medium}`,
              value: child.Id,
            });
          }
          this.childGenre = displayChildCategory;
        }

        if (this.yahooCategory.length < 1) {
          // Vueのステートにカテゴリ情報を設定する
          this.yahooCategory = displayCategory;
        }
      }
    },
    /**
     * 楽天の商品を表示するメソッド
     * @param state ―楽天の商品リスト
     * @param payload ―apiから取得した楽天の商品
     */
    showRktProductList(payload: any) {
      this.rktProductList = new Array<rktProducts>();
      for (const rktProduct of payload) {
        this.rktProductList.push(
          new rktProducts(
            rktProduct.Item.affiliateRate,
            rktProduct.Item.affiliateUrl,
            rktProduct.Item.asurakuArea,
            rktProduct.Item.asurakuClosingTime,
            rktProduct.Item.asurakuFlag,
            rktProduct.Item.availability,
            rktProduct.Item.catchcopy,
            rktProduct.Item.creditCardFlag,
            rktProduct.Item.endTime,
            rktProduct.Item.genreId,
            rktProduct.Item.giftFlag,
            rktProduct.Item.imageFlag,
            rktProduct.Item.itemCaption,
            rktProduct.Item.itemCode,
            rktProduct.Item.itemName,
            rktProduct.Item.itemPrice,
            rktProduct.Item.itemUrl,
            rktProduct.Item.mediumImageUrls,
            rktProduct.Item.pointRate,
            rktProduct.Item.pointRateEndTime,
            rktProduct.Item.pointRateStartTime,
            rktProduct.Item.postageFlag,
            rktProduct.Item.reviewAverage,
            rktProduct.Item.reviewCount,
            rktProduct.Item.shipOverseasArea,
            rktProduct.Item.shipOverseasFlag,
            rktProduct.Item.shopAffiliateUrl,
            rktProduct.Item.shopCode,
            rktProduct.Item.shopName,
            rktProduct.Item.shopOfTheYearFlag,
            rktProduct.Item.shopUrl,
            rktProduct.Item.smallImageUrls,
            rktProduct.Item.startTime,
            rktProduct.Item.tagIds,
            rktProduct.Item.taxFlag
          )
        );
      }
    },
    /**
     * 楽天のカテゴリを表示する
     * @param state
     * @param payload
     */
    showRakutenChild(payload: any) {
      const categories = payload;
      const displayCategory = this.rktCategory;
      const rktChildCategory = [];

      for (const category of categories) {
        const current = category.current;
        displayCategory.push({
          text: current.genreName, // プロパティ名に'?'は不要
          value: current.genreId,
        } as Category); // 型アサーションを使用

        const currentGenreId = String(current.genreId);
        const genreId = String(this.genre);

        // 子カテゴリの表示
        if (currentGenreId == genreId) {
          const children = category.children;
          for (const child of children) {
            rktChildCategory.push({
              text: "―" + child.child.genreName,
              value: child.child.genreId,
            } as Category); // 型アサーションを使用
          }
          this.childGenre = rktChildCategory;
        }
      }
    },
    /**
     * ページ数と商品数の表示
     * @param state
     * @param payload
     */
    handlePageNum(payload: any) {
      if (this.searchOption === "yahoo") {
        // 総商品数
        const apiProductHit = payload.totalResultsAvailable;
        this.totalProductsNum = apiProductHit;
        // 表示件数
        const totalResults = this.results;
        this.productsPerPage = totalResults;
        // 総ページ数
        this.totalPageNum = Math.ceil(this.totalProductsNum / totalResults);
      } else if (this.searchOption === "rakuten") {
        // 総商品数
        const rktTotalProduct = payload.count;
        this.totalProductsNum = rktTotalProduct;
        // 表示件数
        const totalResults = this.results;
        this.productsPerPage = totalResults;
        // 総ページ数
        this.totalPageNum = Math.ceil(this.totalProductsNum / totalResults);
        if (this.totalPageNum >= 100) {
          this.totalPageNum = 50;
        }
      } else {
        return;
      }
    },
    /**
     * 次のページに行く
     * @param state
     * @param payload
     */
    goToNextPage() {
      console.log("go to next page");
      if (this.searchOption === "yahoo") {
        let lastIndex = 0;
        lastIndex = this.currentPageNum * this.results - 1;
        this.start = lastIndex;
      } else if (this.searchOption === "rakuten") {
        this.start = this.currentPageNum;
      }
    },
    /**
     * フィルター機能をONにする
     * @param state
     */
    setFilterOn() {
      this.filterOn = true;
    },
    /**
     * 絞り込み機能
     * @param state
     * @param newId
     */
    sortGenre(payload: string) {
      this.currentPageNum = 1;
      this.genre = payload;
    },
    /**
     * 登録した商品を取得する
     * @param context
     */
    async getRegisteredProducts() {
      this.stopSearchCount++;

      // 検索を最大5回に制限
      if (this.stopSearchCount > 5) {
        return;
      }

      for (const registeredProduct of this.registerData) {
        const searchOption = registeredProduct.searchOption;
        let newUrl = "";
        let nowData = null;
        const searchKeyword = registeredProduct.keyword;

        try {
          if (searchOption === "yahoo") {
            // Yahooのとき
            const { $axios } = useNuxtApp();
            const config = useRuntimeConfig();

            const response = await $axios.get(
              "/ShoppingWebService/V3/itemSearch",
              {
                params: {
                  appid: config.public.YAHOO_API_APPID,
                  query: searchKeyword,
                  image_size: 300,
                  genre_category_id: registeredProduct.genreId,
                  results: 5,
                },
              }
            );
            nowData = response.data.hits[0];
            newUrl = nowData.url;
          } else if (searchOption === "rakuten") {
            // 楽天のとき
            const { $axiosRakuten } = useNuxtApp();
            const config = useRuntimeConfig();

            const response = await $axiosRakuten.get(
              "/IchibaItem/Search/20170706",
              {
                params: {
                  applicationId: config.public.RAKUTEN_API_APPID,
                  keyword: searchKeyword,
                  genreId: registeredProduct.genreId,
                },
              }
            );

            nowData = response.data.Items[0].Item;
            newUrl = nowData.itemUrl;
          }

          const registeredUrl = registeredProduct.url;

          // 新しく取得したデータの先頭と、登録している商品のURLが違うときに速報に表示する
          if (newUrl && newUrl !== registeredUrl) {
            // 速報に表示する commit
            const commonProduct =
              searchOption === "yahoo"
                ? new commonProducts(
                    nowData.name,
                    nowData.url,
                    nowData.image.medium,
                    nowData.price,
                    nowData.review.count,
                    nowData.review.rate
                  )
                : new commonProducts(
                    nowData.itemName,
                    nowData.itemUrl,
                    nowData.mediumImageUrls[0],
                    nowData.itemPrice,
                    nowData.reviewCount,
                    nowData.reviewAverage
                  );

            this.showNewArriveData(commonProduct);
          }
        } catch (err: any) {
          window.alert(`Error in getRegisteredProducts: ${err.message}`);
        }
      }
    },
    getters: {},
  },
});
