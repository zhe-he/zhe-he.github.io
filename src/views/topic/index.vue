<template>
    <div>
        <common-nav></common-nav>
        <br/>

        <ul>
            <li><router-link exact to="/topic/">/rendering</router-link></li>
            <li><router-link to="/topic/components">/components</router-link></li>
            <li><router-link to="/topic/props-v-state">/props-v-state</router-link></li>
        </ul>
        
        <br/>
        <br/>
        <router-view></router-view>
    </div>
</template>

<script type="text/javascript">
    export default {
        data(){
            return {}
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/base";
    .yellow{
        color: $yellow;
    }
    a.router-link-active{
        color: $blue;
    }
</style>