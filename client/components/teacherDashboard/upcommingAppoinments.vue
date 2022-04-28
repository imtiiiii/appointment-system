<template>
    <div>
        <div>
            <h1>Hello World</h1>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    async created(){
        const {data} = await this.callApi('get','/appointments/upCommingAppoinments');
        console.log(data);
    }
}
</script>