import axios from 'axios';
const API_URL_GITHUB = 'https://api.github.com';


export default {
    state: {
        user: null,
        repos: null,
        page: {
            current: 1,
            itemPerPage: 3
        },
        sort: {
            field: 'name',
            dir: 'asc'
        },
    },

    mutations: {
        setPage(state, payload) {
            state.page.current = payload;
        },
        setSort(state, payload) {
            state.sort = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setRepos(state, payload) {
            state.repos = payload;
        },
        sortRepos(state, payload) {
            if (payload === state.sort.field) {
                state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
            } else {
                state.sort.dir = 'asc'
            }
            state.sort.field = payload;
        },
    },

    actions: {
        getRepos({ commit }, search){

        commit('setPage', 1);
        commit('setSort', {field:'name', dir: 'asc'});


        const getUser = axios.get(`https://api.github.com/users/${search}`);
        const getRepos = axios.get(`https://api.github.com/users/${search}/repos`);

        Promise.all([getUser, getRepos])
            .then(res => {
                if (res[0].status === 200) {
                    commit('setUser', res[0].data);
                    commit('setRepos', res[1].data);
                    commit('setError', null);
                } else {
                    commit('setError', `Can't find user ${search}.`);
                }
                
            })
            .catch(err => {
                console.log(err);
                commit('setUser', null);
                commit('setRepos', null);
                commit('setError', 'Cant`t find this user');
            })
        }

    },


    getters: {
        getUser(state) {
            return state.user;
        },
        getRepos(state) {
            return state.repos;
        },
        getPage(state) {
            return state.page.current;
        },
        getItemPerPage(state) {
            return state.page.itemPerPage;
        },
        getSort(state) {
            return state.sort;
        },
        getReposSorted(state) {
            return state.repos.sort((a, b) => {
                let mod = 1
                if (state.sort.dir === 'desc') {
                    mod = -1
                }
                if (a[state.sort.field] < b[state.sort.field]) {
                    return -1 * mod
                }
                if (a[state.sort.field] > b[state.sort.field]) {
                    return 1 * mod
                }
                return 0
            }).filter((row, index) => {
                    let start = (state.page.current - 1) * state.page.itemPerPage;
                    let end = state.page.current * state.page.itemPerPage
                    if (index >= start && index < end) return true
            })

        }

    }
};