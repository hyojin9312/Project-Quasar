<template>
    <q-page v-scroll="scroll">
        <q-img ref="topImg" class="fixed-top full-width" style="margin-top: 60px;" src="5974148.jpg"
                :style="{opacity: opacityImg}"/>

        <q-card class="q-pa-sm" :style="{marginTop: boxTop+'px'}">
            <div class="q-mt-md">
                <q-card class="cardRounded q-mb-md"> 
                    <q-video :ratio="16/9" src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"/>
                </q-card>

                <q-card class="cardRounded q-mb-md"> 
                    <q-video :ratio="16/9" src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"/>
                </q-card>

                <q-card class="cardRounded q-mb-md"> 
                    <q-video :ratio="16/9" src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"/>
                </q-card>
            </div>
        </q-card>
    </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    name: 'Tv',
    computed:{
        ...mapGetters([
            'getLayout',
        ])
    },

    data(){
        return{
            opacityImg: 1,

            boxTop: 120,
        }
    },

    methods:{
        ...mapMutations([
            'setTitle',
        ]),
        ...mapActions([]),

        scroll(v){
            this.opacityImg = 1 - (v/150).toFixed(1);
        },
    },

    beforeCreate(){},
    created(){
        //뒤로가기 이벤트
        window.onpopstate = () => {};

        //layout title
        if(this.$route.params.title){
            this.setTitle(this.$route.params.title);
        }
        else{
            this.setTitle('TV');
        }
    },
    beforeMount(){},
    mounted(){},
    beforeUpdate(){},
    updated(){},
    beforeDestroy(){},
    destroyed(){},
    
}
</script>

<style>

</style>