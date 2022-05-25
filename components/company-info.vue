<template>
  <div
    class="main"
    :class="selected && 'mainSelected' || 'unSelected'"
  >
    <img
      :src="companyData.img"
      :key="companyData.img"
      />
    <div class="names">
      <span class="companyName">{{companyData.name}}</span>
      <span>@{{companyData.name}}</span>
    </div>
  </div>
</template>

<script>
  module.exports = {
    name: 'companyInfo',
    data () {
      return {
      }
    },
    props: {
      selected: {
        type: Boolean,
        default: false,
      },
      companyData: {
        type: Object,
        default () {
          return {
            img: '',
            alias: '',
            name: '',
          }
        }
      },
    },
  }
</script>

<style scoped>
  .main {
    display: flex;
    max-width: 300px;
    overflow: hidden;
    margin: 5px;
    align-items: center;
    font-size: 16px;
    background: white;
  }

  .unSelected:hover {
    background: rgb(212, 212, 212);
  }

  .mainSelected {
    background: rgb(212, 212, 212);
  }

  img {
    width: 50px;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
  }

  .names {
    display: flex;
    flex-direction: column;
  }

  .companyName {
    font-weight: bolder;
  }
</style>