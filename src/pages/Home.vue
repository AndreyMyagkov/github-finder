<template>

  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">


        <!-- errors -->
        <div class="error" v-if="error" style="margin-bottom:20px;">
          <p>{{error}}</p>
        </div>

        <!-- search  -->
        <search
          :value="search" 
          placeholder="Type username..."
          @search="search = $event"
        />
        
        <!-- buttons  -->
        <button v-if="!repos" class="btn btnPrimary" @click="getRepos">Search!</button>
        <button v-else class="btn btnPrimary" @click="getRepos">Search Again!</button>


        <!-- user -->
        <user v-if="userInfo" :userInfo="userInfo" />

        <!-- wrapper  -->
        <div v-if="repos">

          <div class="repos__wrapper">

            <!-- sort bar -->
            <div class="repos-info repos-info__header">
              <sortBy text="Name" field="name" :currentSort="currentSort.field" :currentSortDir="currentSort.dir" @sort="sort" />

              <sortBy text="Stars" field="stargazers_count" :currentSort="currentSort.field" :currentSortDir="currentSort.dir" @sort="sort" />
            </div>

            <!-- item  -->
            <div class="repos-item" v-for="repo in reposSort"  :key="repo.id">
              <div class="repos-info">
                <a :href="repo.html_url" target="_blank" class="link">{{ repo.name }}</a>
                <span>{{ repo.stargazers_count }} ⭐</span>
              </div>
              
            </div>

          </div>

          <!-- pagination  --> 
          <pagination :current="pageCurrent" :total="repos.length" :itemPerPage="itemPerPage" @setPage="setPage" />

        </div>


      </div>
    </section>
      
  </div>

</template>

<script>
import user from '@/components/User.vue'
import sortBy from '@/components/UI/SortBy.vue'
import pagination from '@/components/UI/Pagination.vue'
import search from '@/components/Search.vue'

export default {
  components: {user, sortBy, pagination, search},
  data () {
    return {
      search:''
    }
  },
  methods: {

    getRepos (){
      if (this.search) {
        this.$store.dispatch('getRepos', this.search);
      } else {
        this.$store.commit('setError', 'Cant`t empty  user');
      }
    },

    sort (e) {
      this.$store.commit('sortRepos', e);
    },

    setPage(page) {
      this.$store.commit('setPage', page);
    }


  }, 

  computed: {
    error(){
      return this.$store.getters.getError;
    },    

    repos(){
      return this.$store.getters.getRepos;
    },

    userInfo(){
      return this.$store.getters.getUser;
    },

    reposSort(){
      return this.$store.getters.getReposSorted;
    },

    pageCurrent(){
      return this.$store.getters.getPage;
    },
    pageCurrent(){
      return this.$store.getters.getPage;
    },
    itemPerPage(){
      return this.$store.getters.getItemPerPage;
    },
    currentSort(){
      return this.$store.getters.getSort;
    }
  }


}
</script>

<style lang="scss" scoped>
.container {
  display:flex;
  align-items: center;
  flex-direction: column;
}
button {
  margin-top: 40px;
}

.repos__wrapper {
  width: 400px;
  margin: 30px auto;
}
.repos-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
}

.repos-info__header>div {
  cursor:pointer
}



.button-list {
  width: 100%;
  text-align: center;
  margin: 50px 0;

  .btn {
    border-radius: 60px;
    margin: 0 20px;
  }
} 


</style>