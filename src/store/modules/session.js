const state = {
  isLoading: false
}

const getters = {
  isLoading (state) {
    return state.isLoading
  }
}

const mutations = {
  changeLoadingStatus (state, status) {
    state.isLoading = status
  }
}

module.exports = {
  state,
  getters,
  mutations
}
