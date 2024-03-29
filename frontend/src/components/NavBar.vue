<script setup>
import { ref, watch, onMounted } from "vue";
import logo from "@/assets/logo.png";
import {
  HomeFilled,
  DocumentAdd,
  Ticket,
  Watch,
  User,
  Operation,
} from "@element-plus/icons-vue";

import { useAuth0 } from "@auth0/auth0-vue";
import { getUserInfo } from "../services/user";

const {
  loginWithRedirect: login,
  user,
  isAuthenticated,
  logout,
  isLoading,
} = useAuth0();

async function loginWithRedirect() {
  await login();
}

function logoutWithRedirect() {
  logout({ returnTo: window.location.origin });
}

const activeIndex = ref("1");

const adminPriv = ref(false);
const userInfo = ref({});
const loading = ref(true);

watch(user, async (loadingNew) => {
  // I don't understand why user.email returns undefined but this works.
  userInfo.value = await getUserInfo(loadingNew.email);
  adminPriv.value = ["user", "admin"].every((val) =>
    userInfo.value.role.includes(val)
  );
  loading.value = false;
});

onMounted(async () => {
  const currentUrl = window.location.href;

  if (currentUrl.endsWith("/add-flight")) {
    activeIndex.value = "2";
  } else if (currentUrl.endsWith("/flight-events")) {
    activeIndex.value = "3";
  } else if (currentUrl.endsWith("/bookings")) {
    activeIndex.value = "4";
  } else if (currentUrl.endsWith("/user-profile")) {
    activeIndex.value = "5";
  }
});
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="app-nav-bar"
    mode="horizontal"
    :ellipsis="true"
    router
  >
    <el-image :src="logo" />
    <div class="flex-grow"></div>
    <el-menu-item index="1" route="/">
      <el-icon><HomeFilled /></el-icon>
      Home
    </el-menu-item>
    <el-menu-item v-if="!loading && adminPriv" index="2" route="/add-flight">
      <el-icon><DocumentAdd /></el-icon>
      Add Flight
    </el-menu-item>
    <el-menu-item index="3" route="/flight-events">
      <el-icon><Watch /></el-icon>
      Flight Events
    </el-menu-item>
    <el-menu-item index="4" route="/bookings">
      <el-icon><Ticket /></el-icon>
      My Bookings
    </el-menu-item>
    <el-menu-item index="5" route="/user-profile">
      <el-icon><User /></el-icon>
      User Profile
    </el-menu-item>
    <el-menu-item v-if="!isAuthenticated" index="6" @click="loginWithRedirect"
      ><el-icon><Operation /></el-icon>Log In</el-menu-item
    >
    <el-menu-item v-if="isAuthenticated" index="7" @click="logoutWithRedirect"
      ><el-icon><Operation /></el-icon>Log Out</el-menu-item
    >
  </el-menu>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}

.el-image {
  object-fit: scale-down;
  width: 180px;
  height: 55px;
  margin-bottom: 10px;
}
</style>
