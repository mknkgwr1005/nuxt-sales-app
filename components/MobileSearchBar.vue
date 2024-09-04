<template>
  <div>
    <v-toolbar dense floating color="#FF6C7E">
      <v-text-field
        prepend-icon="mdi-magnify"
        v-model="store.searchKeyword"
        single-line
        hide-details
        append-inner-icon="mdi-arrow-right-circle"
        append-icon="mdi-tune-variant"
        @click:append-inner="searchProducts"
        @click:append="showSearchOptions = true"
      >
      </v-text-field>
    </v-toolbar>

    <!-- Modal -->
    <v-dialog v-model="showSearchOptions" max-width="500">
      <v-card>
        <v-card-title class="card-title"> <h4>詳細検索</h4> </v-card-title>
        <v-card-text>
          <!-- Include your search options content here -->
          <v-col cols="auto">
            <h4 class="colTitle">検索サイト</h4>
            <v-radio-group class="d-flex flex-wrap justify-center">
              <v-radio
                label="yahoo"
                value="yahoo"
                v-model="store.searchOption"
                color="info"
              >
              </v-radio>
              <v-radio
                label="rakuten"
                value="rakuten"
                v-model="store.searchOption"
                color="info"
              ></v-radio>
            </v-radio-group>
            <SearchOptions />
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showSearchOptions = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
const store = useIndexStore();
let showSearchOptions = ref(false);

const searchProducts = () => {
  store.searchOption = "yahoo";
  useSearchProducts();
};
</script>

<style>
.card-title {
  justify-content: center;
}

.rakuten-icon {
  width: 20px;
}

.custom-active-class {
  background-color: #ff6c7e !important; /* Set the active background color */
  color: white !important; /* Set the active text color */
}

.colTitle {
  margin-left: 100px;
  margin-bottom: 10px;
}

.card-title {
  justify-content: center;
  margin-left: 100px;
}
</style>
