const state = {
  keywords: []
}

const getters = {
  KEYWORDS (state) {
    return state.keywords
  }
}

const mutations = {
  SET_KEYWORDS (state, keywords) {
    state.keywords = keywords
  }
}

module.exports = {
  state,
  getters,
  mutations
}
