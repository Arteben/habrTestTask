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
        @tile-click="onClickAlias"
        :tile-list="tileList"
      />
    </div>
    <scrolled-popup
      :is-data="dataList.length > 0" 
      :input="selectInput"
    >
      <company-info
        v-for="(item, index) in availableAliasList"
        :key="index"
        :company-data="item"
        @click-company-info="onClickAlias"
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
        tileList: [],
      }
    },
    computed: {
      availableAliasList () {
        return this.dataList.filter((_item) => {
          return !this.tileList.includes(_item.alias)
        })
      }
    },
    methods: {
      onUpdateList (_resultData) {
        this.dataList = [..._resultData.items]
      },
      onCreateInput (_input) {
        this.selectInput = _input
      },
      onClickAlias (_alias) {
        const findIndex = this.tileList.findIndex((_el) => {
          return _alias == _el
        })
        if (findIndex >= 0) {
          this.tileList.splice(findIndex, 1)
        } else if (this.tileList.length == 0) {
          this.tileList = [_alias, ...this.tileList]
        }
      },
      isDisabledTile (_alias) {
        console.log('alias', _alias)
        return this.tileList.includes(_alias)
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