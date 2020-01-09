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
              <sortBy text="Name" field="name" :currentSort="currentSort" :currentSortDir="currentSortDir" @sort="sort" />

              <sortBy text="Stars" field="stargazers_count" :currentSort="currentSort" :currentSortDir="currentSortDir" @sort="sort" />
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
          <pagination :current="page.current" :total="repos.length" :itemPerPage="page.length" @setPage="setPage" />

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
import axios from 'axios'

export default {
  components: {user, sortBy, pagination, search},
  data () {
    return {
      search:'',
      error: null,
      repos: null,
      userInfo: null,
      currentSort: 'name',
      currentSortDir: 'asc',
      page: {
        current: 1,
        length: 3
      }

    }
  },
  methods: {
    getRepos (){
      this.page.current=1;
      this.currentSortDir = 'asc';
      this.currentSort = 'name';

      const getUser = axios.get(`https://api.github.com/users/${this.search}`);
      const getRepos = axios.get(`https://api.github.com/users/${this.search}/repos`);

      Promise.all([getUser, getRepos])
        .then(res => {

          this.userInfo = res[0].data;
          this.repos = res[1].data;
          this.error = null
        })
        .catch(err => {
          console.log(err);
          this.userInfo = null;
          this.repos = null;
          this.error='Cant`t find this user'
        })

    },

    sort (e) {
      if (e===this.currentSort){
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc': 'asc'
      } else {
        this.currentSortDir = 'asc'
      }
      this.currentSort = e
    },

    setPage(page) {
      this.page.current=page
    }


  }, 

  computed: {
    reposSort(){
      return this.repos.sort((a,b)=>{
        let mod = 1
        if (this.currentSortDir === 'desc'){
          mod = -1
        }
        if (a[this.currentSort] < b[this.currentSort]){
          return -1*mod
        }
        if (a[this.currentSort] > b[this.currentSort]){
          return 1*mod
        }
        return 0
      }).filter((row, index)=>{
        let start = (this.page.current-1)*this.page.length;
        let end = this.page.current * this.page.length
        if (index >= start && index <end) return true
      })
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