<template>
  <section class="extract-view  mb-4 mt-4 m-auto">
    <h4>Copy data to clipboard</h4>
    OR<br>
    <h6>
      <button 
        class="btn btn-sm btn-outline-primary" 
        @click="zipit">download</button>
        as txt file
    </h6>
    <div class="mb-3 mt-3">
        <button 
          class="copybtn btn btn-sm" 
          @click="copyToclipboard"
          :class="{ 'btn-secondary': !copied, 'btn-success': copied }"
        >
          {{btnTxt}}
        </button>
        <pre id="highlighting"  aria-hidden="true" :class="{'copied': copied }">
          <code 
            class="language-html" 
            ref="textplace" 
            id="highlighting-content">
          </code>
        </pre>
    </div>
  </section>
</template>



<script>

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default {

  name: 'ExtractView',
  components: {

  },
  props: {

  },
  data() {
    return {
      copied: false
    }
  },
  computed: {
    btnTxt(){
      if(this.copied){
        return 'Copied';
      }
      return 'Copy';
    }
  },
  methods: {

    copyToclipboard(){
      let txt = this.$refs.textplace.innerHTML;
      this.copyTextToClipboard(txt);
    },

    copyTextToClipboard(text) {
      let THAT = this;
      if (!navigator.clipboard) {
        this.fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(function() {
        THAT.copied = true;
      }, function(err) {
        THAT.copied = false;
      });
    },

    fallbackCopyTextToClipboard(text) {

      let textArea = this.$refs.textplace;
      textArea.focus();
      textArea.select();

      try {
        let successful = document.execCommand('copy');
        this.copied = true;
      } catch (err) {
        console.error('Fallback:', err);
        this.copied = false;
      }

    },

    fillData(){
      this.$refs.textplace.innerHTML = JSON.stringify( this.$store.getters.getUsers(), null, '\t' );
    },


    zipit() {
      const zip = new JSZip();
      let data = this.$refs.textplace.innerHTML;

      zip.file("data-sample.txt", data);
      zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "data-sample.zip");
      });

    }

  },

  mounted(){

    this.fillData();
  },
  watch: {
  '$store.state.users': {
      deep: true,
      handler(newVal) {

          this.fillData();        
      }
    }
  }   

}
</script>

<style scoped>
  .copybtn {
    position: absolute;
    top: 0px;
    right: 0;
    z-index: 4;
  }

  #highlighting {
    height: 500px;
    max-width: 500px;
    width: 100%;
    overflow: scroll;
    border: 1px solid #c9bfbf;
    text-align: left;
  }
  .highlighting-content{
    min-height: 400px;
    min-width: 280px;
  }

  .highlighting-content.copied,
  #highlighting.copied {
    background-color: black;
    color: wheat; 
  }


  @media (max-width: 576px) {
    #highlighting {
      max-width: 400px;
    }
  }
</style>
