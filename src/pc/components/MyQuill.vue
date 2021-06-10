<template>
    <div class="edit_container">
        <quill-editor 
            v-model="content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>

<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';


import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
@Component({
  props: {
    content: {
      type: String
    }
  },
  components: {quillEditor}
})
export default class MyList extends Vue {
  editorOption: any = {}
  onEditorReady(editor) { // 准备编辑器

  }
  onEditorBlur(){} // 失去焦点事件
  onEditorFocus(){} // 获得焦点事件
  onEditorChange(){} // 内容改变事件
  get editor() {
    return this.$refs.myQuillEditor.quill
  }
}
</script>
<style lang='scss' scoped>
  ::v-deep .ql-editor{
      height:400px;
  }
</style>