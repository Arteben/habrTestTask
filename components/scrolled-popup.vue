<template>
  <div
    v-show="isShow"
    class="popup"
    :style="posParams"
  >
    <slot></slot>
  </div>
</template>

<script>

  const getCornerParams = function (_el) {
    const boundRect = _el.getBoundingClientRect()
    if (boundRect) {
      this.posParams.top = boundRect.bottom + 'px'
      this.posParams.left = boundRect.left + 'px'
    }
  }

  module.exports = {
    name: 'scrolledPopup',
    props: {
      select: {
        type: HTMLDivElement,
        default: null
      },
      isData: {
        type: Boolean,
        default: false,
      }
    },
    data () {
      return {
        isShow: false,
        posParams: {
          top: 0,
          left: 0,
        }
      }
    },
    computed: {
      input () {
        if (this.select && this.select.querySelector) {
          return this.select.querySelector('input.textInput')
        } else {
          return null
        }
      }
    },
    watch: {
      isData (_isData) {

        const calcPopupPos = () => {
          getCornerParams.call(this, this.select)
        }

        const showInput = () => {
          this.isShow = this.isData
        }

        const hideForOutFocus = (_event) => {
          if (_event.target != this.input) {
            this.isShow = false
          }
        }

        if (_isData) {
          this.isShow = _isData
          calcPopupPos()
          if (this.select) {
            window.addEventListener('resize', calcPopupPos)
          }
          if (this.input) {
            this.input.addEventListener('input', showInput)
            this.input.addEventListener('focus', showInput)
            window.addEventListener('click', hideForOutFocus)
          }
        } else {
          if (this.select) {
            window.removeEventListener('resize', calcPopupPos)
          }
          if (this.input) {
            this.input.removeEventListener('input', showInput)
            this.input.removeEventListener('focus', showInput)
            window.removeEventListener('click', hideForOutFocus)
          }
        }
      },
    },
  }
</script>

<style scoped>
.popup {
  position: absolute;
  background: gray;
  width: 300px;
  overflow: hidden;
  overflow-y: auto;
  max-height: 305px;
  border: 2px solid black;
}
</style>