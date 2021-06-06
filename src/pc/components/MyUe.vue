<template>
  <div id='UE'>
      <script id='editor' type='text/plain'></script>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({})
export default class UEtor extends Vue {
  editor: any = null
  mounted(){
    this.editor = UE.getEditor('editor', this.config)
  }
  getUEContent(){
    this.editor.getContent()
  }
}
</script>