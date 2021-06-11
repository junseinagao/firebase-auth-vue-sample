<template>
  <div>
    <div class="signed-in-user-profile" v-if="user">
      <div>uid : {{ user.uid }}</div>
      <div>displayName : {{ user.displayName }}</div>
      <div class="signed-in-user-profile__photo">
        <img v-bind:src="user.photoURL ? user.photoURL : 'https://via.placeholder.com/150'" />
      </div>
    </div>
    <div v-else>No User Signed In</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    }
  },
}
</script>

<style scoped>
.signed-in-user-profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signed-in-user-profile__photo {
  height: 10rem;
}

.signed-in-user-profile__photo img {
  height: 100%;
  object-fit: contain;
}
</style>
