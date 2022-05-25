<template>
  <div
    class="main"
    :class="selected && 'mainSelected' || 'unSelected'"
    @click="$emit('click-company-info', companyData.alias)"
  >
    <img
      :src="companyData.img"
      :key="companyData.img"
    />
    <div class="names">
      <span class="companyName">{{companyData.name}}</span>
      <span>{{companyData.alias}}</span>
    </div>
  </div>
</template>

<script>
  module.exports = {
    name: 'companyInfo',
    props: {
      selected: {
        type: Boolean,
        default: false,
      },
      companyData: {
        type: Object,
        default () {
          return { img: '', alias: '', name: '' }
        },
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
    cursor: pointer;
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