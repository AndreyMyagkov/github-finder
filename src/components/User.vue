<template>
    <div class="user">
        <div class="user__wrapper">
        <a :href="userInfo.html_url" target="_blank" class="user__figure">
            <img :src="userInfo.avatar_url" :alt="userInfo.name" class="user__ava">
        </a>
        <div class="user__info">
            <div class="user__name"><strong>Name:</strong> <a :href="userInfo.html_url" target="_blank">{{ userInfo.name }}</a></div>
            <div class="user__repos"><strong>Repos:</strong> {{ userInfo.public_repos }}</div>
        </div>
        </div>
    </div>  
</template>

<script>
export default {
    props:{
        userInfo: {
            type: Object,
        }
    }
}
</script>

<style>

    .user {
    margin: 50px 0 0 0;
    }
    .user__wrapper {
    width: 400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
    .user__figure {
    flex: 0 0 60px;
    }
    .user__ava {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 50%;
    }
    .user__info {
    flex: 1 1 80%;
    max-width: 320px;
    }
    .user__name {
    margin-bottom: 8px;
    }
    .user__repos {

    }
</style>
