<script>
import native from '../../mixins/native'
import cover from '../../mixins/cover'

export default {
  name: 'CoverView',
  mixins: [native, cover],
  props: {},
  data () {
    return {
      coverType: 'text',
      coverContent: ''
    }
  },
  render (createElement) {
    let coverContent = ''
    const $slots = this.$slots.default || []
    const _slots = $slots.filter(node => node.tag)
    if (!_slots.length) {
      $slots.forEach(node => {
        if (!node.tag) {
          coverContent += node.text || ''
        }
      })
      this.coverContent = coverContent
    } else {
      coverContent = _slots
    }
    return createElement('uni-cover-view', {
      on: {
        on: this.$listeners
      }
    }, [createElement('div', {
      ref: 'container',
      staticClass: 'uni-cover-view'
    }, [].concat(coverContent))])
  }
}
</script>
<style>
uni-cover-view {
  display: block;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  pointer-events: auto;
}

uni-cover-view[hidden] {
  display: none;
}

uni-cover-view .uni-cover-view {
  width: 100%;
  height: 100%;
  visibility: hidden;
}
</style>
