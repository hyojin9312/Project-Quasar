<template>
    <q-page class="bg-grey-2">
        <section class="q-pt-md">
            <q-card>
                <q-tabs 
                    v-model="tab" 
                    active-color="primary"
                    indicator-color="primary"
                    narrow-indicator >
                    <q-tab name="service" label="서비스약관"/>
                    <q-tab name="info" label="개인정보 약관"/>
                    <q-tab name="money" label="전자금융 약관"/>
                </q-tabs>
                <q-separator />

                <q-tab-panels v-model="tab" animated class="text-S full-height">
                    <q-tab-panel name="service">
                        제1조 <br>
                        본 서비스 이용 및 ......................<br>
                        제2조<br>
                        서비스 ....................
                    </q-tab-panel>

                    <q-tab-panel name="info">
                        제1조 <br>
                        본 개인정보 및 ......................<br>
                        제2조<br>
                        서비스 ....................
                    </q-tab-panel>

                    <q-tab-panel name="money">
                        제1조 <br>
                        본 전자금융 및 ......................<br>
                        제2조<br>
                        서비스 ....................
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
        </section>
    </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'Terms',
    computed: {
        ...mapGetters([
            'getLayout',
        ]),
    },

    data(){
        return{
            //tab v-model
            tab: 'service',
        }
    },

    methods: {
        ...mapMutations([
            'setTitle',
        ]),
        ...mapActions([]),
    },

    beforeCreate(){},
    created(){
        //뒤로가기
        window.onpopstate = () => {};

        // layout title
        if(this.$route.params.title){
            this.setTitle(this.$route.params.title);
        }
        else{
            this.setTitle('약관');
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