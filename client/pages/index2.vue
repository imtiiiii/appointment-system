<template>
    <div>
        <div class="_1main_content">
            <div class="_layout">
                <div class="_layout_row">
                   <h1 class="text-center" style="margin-top:150px;">Hello {{authUser.first_name}} {{authUser.last_name}}!</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
  middleware:'auth',
  data(){
    return{
      
    }
  },


  methods:{
    
  },
  
  created(){
    
  }
}
</script>