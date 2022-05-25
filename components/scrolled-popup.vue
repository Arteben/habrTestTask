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
      input: {
        type: HTMLInputElement,
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
    watch: {
      isData (_isData) {
        this.isShow = _isData
      },
      input: {
        immediate: true,
        handler (_el) {
          if (!_el) return

          getCornerParams.call(this, _el)
          window.onresize = () => {
            if (this.isData) {
              getCornerParams.call(this, _el)
            }
          }

          _el.oninput = () => {
            this.isShow = this.isData
          }
           _el.onfocus = () => {
            this.isShow = this.isData
          }

          // _el.onfocusin = () => {
          //   this.isShow = false
          // }
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