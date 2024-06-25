<template>
  <div>
    <nav class="navbar navbar-light" style="background-color: #e3f2fd">
      <!-- Navbar content -->
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link active" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/registerProducts">商品登録ページ</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#!">設定</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>
