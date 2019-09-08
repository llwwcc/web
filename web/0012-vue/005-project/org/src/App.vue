<template>
  <div id="app">
    
    <!-- <Header /> -->
    <Item />
    <Footer />
  </div>
</template>

<script>
  // import Header from './pages/header.vue'
  import Item from './pages/item.vue'
  import Footer from './pages/footer.vue'

  export default {
    name: 'app',
    components:{
      // Header,
      Footer,
      Item
    },
  }
</script>
 <style >
   #app{
      width: 600px;
      margin: 100px auto;
   }
 </style>



