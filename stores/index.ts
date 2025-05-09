import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { auth, db, FirebaseTimestamp } from "@/firebase";
import { commonProducts } from "@/types/commonProducts";
import { Category } from "@/types/rakuten/Category";
import { rktProducts } from "@/types/rakuten/rktProducts";
import type { newArriveItem } from "@/types/registerProducts/newArriveItem";
import { apiProducts } from "@/types/yahoo/apiProducts";
import { userInfo } from "@/types/user/userInfo";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { rktPriceItem } from "@/types/rakuten/rktPriceItem";

export const useIndexStore = defineStore("index", {
  state: () =>
    ref({
      searchKeyword: "",
      searchOption: "",
      totalProductsNum: 0,
      totalPageNum: 0,
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
      newAnnounceData: new Array<commonProducts>(),
      announceSize: 3,
      stopSearchCount: 0,
      loginStatus: false,
      loginUser: {
        id: "",
        name: "",
        mailAddress: "",
      },
      currentUser: false,
      currentIndex: 0,
      leftCarousel: true, //戻る
      rightCarousel: false, //次へ
      priceLabel: [],
      maxPrice: null,
      minPrice: null,
      reviewStar: 0,
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
        this.goToNextPage();
      } else if (this.currentPageNum === 1) {
        this.start = 1;
      }

      const { data, error, pending } = await useFetch("/api/yahoo", {
        method: "GET",
        query: {
          query: this.searchKeyword,
          image_size: 300,
          genre_category_id: sortGenre,
          price_from: this.minPrice,
          price_to: this.maxPrice,
          results: resultsNum,
          start: this.start,
          sort: this.sort,
        },
        headers: { "Content-Type": "application/json" },
      });

      if (error.value) {
        console.error("Yahoo 検索 API エラー:", error.value);
        return;
      }

      if (!pending.value && data.value) {
        // 商品一覧
        const hits = data.value.hits;
        this.showProductList(hits);
        // ページング情報
        this.handlePageNum(data.value);
      }
    },
    /**
     * yahoo-カテゴリを探す
     */
    async findCategoryDetail() {
      // サーバーサイドのプロキシ API を呼ぶ
      const { data, error } = await useFetch("/api/yahoo-category");

      if (error.value) {
        console.error("カテゴリ取得失敗:", error.value);
        return;
      }

      // data.value は server/api/yahoo-category.ts の return 値
      this.showYahooCategory(data.value);
    },
    /**
     * カテゴリの表示
     * @param payload カテゴリのresponse値
     */
    showYahooCategory(payload: any[]) {
      // 既存ロジックそのまま
      const display: Array<{ text: string; value: number }> = [];
      payload.forEach(({ currentCategory, childrenCategories }) => {
        display.push({
          text: currentCategory.Title.Medium,
          value: currentCategory.Id,
        });
      });
      this.yahooCategory = display;
      // 必要なら childrenCategories の整形も同様に行ってください
    },
    /**
     * 楽天の商品を取得する
     * @param context
     */
    async getRktProductList() {
      const keyword = this.searchKeyword.replace(/　/g, " ");
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
              keyword: keyword,
              genreId: sortGenre,
              sort: sortOptions,
              hits: this.productsPerPage,
              page: this.start,
              minPrice: this.minPrice,
              maxPrice: this.maxPrice,
            },
          }
        );

        const payload = response.data;

        if (payload) {
          this.showRktProductList(payload.Items);
          this.handlePageNum(payload);
        }
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
     * dataの初期化
     */
    resetStoreData() {
      this.totalPageNum = 0;
      this.genre = "";
      this.childGenre = [];
      this.results = 20;
      this.sort = "";
      this.maxPrice = null;
      this.minPrice = null;
      this.currentPageNum = 1;
    },
    /**
     * 速報をstateに保存する
     * @param state
     * @param payload
     */
    async setNewArriveData(payload: commonProducts) {
      const newItem = payload;

      // 既に存在するアイテムかどうかをチェック
      const isItemExist = this.announceData.some(
        (item) => item.url === newItem.url
      );

      if (!isItemExist) {
        this.announceData.push(payload);
        this.handleAnnouncement();
      }
    },
    /**
     *　入荷情報で、表示用のデータを変更する
     */
    handleAnnouncement() {
      if (window.innerWidth < 768) {
        this.announceSize = 1;
      } else {
        this.announceSize = 3;
      }
      const start = this.currentIndex;
      const end = start + this.announceSize;

      const displayData = this.announceData.slice(start, end);
      this.newAnnounceData = displayData;
      if (this.currentIndex - this.announceSize < 0) {
        this.leftCarousel = true;
      } else {
        this.leftCarousel = false;
      }
      if (
        this.currentIndex + this.announceSize >
        this.announceData.length - 1
      ) {
        this.rightCarousel = true;
      } else {
        this.rightCarousel = false;
      }
    },
    /**
     * 速報の表示‐次ページへ行く
     * @returns
     */
    updateIndex() {
      const allData = this.announceData.length;
      if (this.currentIndex + this.announceSize < allData) {
        this.currentIndex += this.announceSize;
      } else {
        return;
      }
    },
    /**
     * 速報の表示－前のページへ行く
     */
    backIndex() {
      if (this.currentIndex - this.announceSize >= 0) {
        this.currentIndex -= this.announceSize;
      } else {
        return;
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
              userId: this.loginUser.id,
              searchOption: this.searchOption,
              keyword: this.searchKeyword,
              name: payload.name,
              brand: payload.brand.name,
              genre: payload.genreCategory.name,
              genreId: payload.genreCategory.id,
              image: payload.image.medium,
              url: payload.url,
              lastHitUrl: this.lastHitUrl,
            }
          : {
              userId: this.loginUser.id,
              searchOption: this.searchOption,
              keyword: this.searchKeyword,
              name: payload.itemName,
              genreId: payload.genreId,
              image: payload.mediumImageUrls[0].imageUrl,
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
        const registerDataRef = collection(db, "registerData");
        await addDoc(registerDataRef, payloadData);
        window.alert("Product registered successfully.");
        this.fetchRegisterData();
      }
    },
    /**
     * 登録した商品を取得する
     * @param state
     */
    async fetchRegisterData() {
      if (!this.currentUser) {
        window.alert("ログインしてください。");
      } else {
        try {
          const registerDataRef = collection(db, "registerData");
          // Firestore クエリを実行
          const registerSnapshot = await getDocs(
            query(registerDataRef, where("userId", "==", this.loginUser.id))
          );

          // DBから1個1個取り出す
          const items = registerSnapshot.docs.map((item) => {
            const eachItem = item.data();
            return {
              searchOption: eachItem.searchOption,
              keyword: eachItem.keyword,
              name: eachItem.name,
              image: eachItem.image,
              brand: eachItem.brand,
              genreId: eachItem.genreId,
              genre: eachItem.genre,
              url: eachItem.url,
              lastHitUrl: eachItem.lastHitUrl,
            };
          });

          // stateにセットする
          this.registerData = items;
        } catch (error) {
          console.error("Error fetching registered data:", error);
        }
      }
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
     * 商品説明を文字数制限する
     * @param text
     * @param maxLength
     * @returns
     */
    truncateText(text: string | undefined | null, maxLength: number): string {
      if (!text) {
        return "";
      }
      if (text.length <= maxLength) {
        return text;
      }
      return text.slice(0, maxLength) + "...";
    },
    /**
     * yahooの商品を表示するメソッド
     * @param state - yahooの商品リスト
     * @param payload - apiから取得した商品リスト
     */
    showProductList(payload: any) {
      this.productList = new Array<apiProducts>();
      if (this.reviewStar !== 0) {
        payload = payload.filter((item: any) => {
          return item.review.rate >= this.reviewStar;
        });
      }
      this.productList = payload.map((item: any) => ({
        ...item,
        truncatedDescription: this.truncateText(item.description, 100), // 文字数を制限する
      }));
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
      this.rktProductList = payload.map((item: any) => ({
        ...item.Item,
        truncatedDescription: this.truncateText(item.Item.itemCaption, 100), // 文字数を制限する
      }));
      if (this.reviewStar !== 0) {
        this.rktProductList = this.rktProductList.filter((item: any) => {
          return item.reviewAverage >= this.reviewStar;
        });
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
        if (this.totalPageNum >= 100) {
          this.totalPageNum = 50;
        }
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
      if (this.searchOption === "yahoo") {
        let lastIndex = 0;
        lastIndex = (this.currentPageNum - 1) * this.results + 1;

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
      if (this.registerData.length === 0) {
        console.log(
          "商品データがゼロのため、ユーザーのログイン状態を確認します"
        );
        this.fetchUserStatus();
        return;
      }

      // 検索を最大5回に制限
      if (this.stopSearchCount > 5) {
        if (this.stopSearchCount === 5) {
          window.alert("最大検索数に達しました。ページを更新してください。");
        }
        return;
      }

      for (const registeredProduct of this.registerData) {
        const searchOption = registeredProduct.searchOption;
        let newUrl = "";
        let nowData = null;
        const searchKeyword = registeredProduct.keyword;

        try {
          if (searchOption === "yahoo") {
            // Yahooのとき    // サーバーサイドプロキシ API を呼び出し
            const { data, error, pending } = await useFetch("/api/yahoo", {
              method: "GET",
              query: {
                query: searchKeyword,
                image_size: 300,
                genre_category_id: registeredProduct.genreId,
                results: 5,
              },
            });

            if (error.value) {
              console.error("Yahoo 登録商品チェック API エラー:", error.value);
              return;
            }
            // pending.value が false になるまで待つ
            while (pending.value) {
              await new Promise((resolve) => setTimeout(resolve, 100));
            }

            const hits = data.value?.hits;
            if (Array.isArray(hits) && hits.length > 0) {
              const nowData = hits[0];
              newUrl = nowData.url;
            } else {
              console.warn("ヒットなし or 想定外のレスポンス:", data.value);
              return;
            }
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
            let rakutenImageUrl = "";
            if (searchOption === "rakuten") {
              const rakutenImageUrls = nowData.mediumImageUrls;
              rakutenImageUrl = rakutenImageUrls[0].imageUrl;
            }
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
                    rakutenImageUrl,
                    nowData.itemPrice,
                    nowData.reviewCount,
                    nowData.reviewAverage
                  );

            this.setNewArriveData(commonProduct);
          }
        } catch (err: any) {
          window.alert(`Error in getRegisteredProducts: ${err.message}`);
        }
      }
    },
    /**
     * ユーザーの新規登録
     * @param uid
     * @param mailAddress
     * @param password
     */
    async setUserInfo(uid: string, mailAddress: string) {
      const initialData = {
        id: uid,
        name: "",
        mailAddress: mailAddress,
      };
      // stateに保存
      this.loginUser = {
        id: uid,
        name: "",
        mailAddress: mailAddress,
      };
      // firestoreに保存
      try {
        const userDocRef = doc(db, "userInformation", uid); // ドキュメント参照を取得
        await setDoc(userDocRef, initialData); // ドキュメントにデータをセット
        window.alert("ユーザー登録しました");
      } catch (error) {
        console.error("Error saving user information: ", error);
        window.alert("ユーザー登録に失敗しました");
      }
    },
    /**
     * ログイン状態を取得
     */
    async fetchUserStatus() {
      // ログイン状況を確認し、stateにセットする
      const authedUser = auth.currentUser;
      if (authedUser) {
        this.currentUser = true;
      } else {
        this.currentUser = false;
      }
      onAuthStateChanged(auth, (user: any) => {
        if (user) {
          this.loginUser = {
            id: user.uid,
            name: "",
            mailAddress: user.email,
          };
          this.loginStatus = true;
        } else {
          this.loginUser = {
            id: "",
            name: "",
            mailAddress: "",
          };
          this.loginStatus = false;
        }
      });
    },
    /**
     * ログアウト
     */
    async logout() {
      await signOut(auth)
        .then(() => {
          this.loginUser = {
            id: "",
            name: "",
            mailAddress: "",
          };
          this.announceData = [];
          this.loginStatus = false;
          this.currentUser = false;
          reloadNuxtApp();
          window.alert("ログアウトしました");
        })
        .catch((error) => {
          window.alert(error.message);
        });
    },
  },
  getters: {},
});
