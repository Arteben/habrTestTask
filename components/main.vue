<template>
  <div class="mainApp">
    <h3> test task </h3>
    <div class="headerContainer">
      <div class="header">
        <span class >*</span>
        <h4>Пользователь или компания</h4>
      </div>
      <special-select
        @update-companies="onUpdateList"
        @create-input="onCreateInput"
      />
    </div>
    <scrolled-popup
      :is-data="dataList.length > 0" 
      :input="selectInput"
    >
      <company-info
        v-for="(item, index) in dataList"
        :key="index"
        :company-data="item"
      >
    </scrolled-popup>
  </div>
</template>

<script>

  const specialSelect = httpVueLoader('./special-select.vue')
  const scrolledPopup = httpVueLoader('./scrolled-popup.vue')
  const companyInfo = httpVueLoader('./company-info.vue')

  module.exports = {
    name: 'mainVue',
    components: {
      specialSelect,
      scrolledPopup,
      companyInfo,
    },
    data () {
      return {
        dataList: [],
        selectInput: null,
      }
    },
    methods: {
      onUpdateList (_list) {
        this.dataList.splice(0, this.dataList.length)
        this.dataList.push(..._list.splice(0, 10))
      },
      onCreateInput (_input) {
        this.selectInput = _input
      }
    },
  }
</script>

<style scoped>
.mainApp {
  background: whitesmoke;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 1px solid gray;
}
h3 {
  text-align: end;
  color: gray;
}

.headerContainer {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  padding: 10px;
}

.header {
  display: flex;
  align-items: center;
  margin: 5px;
}

.header span {
  color: red;
  margin: 0;
  margin-right: 3px;
}

.header h4 {
  margin: 0;
}
</style>