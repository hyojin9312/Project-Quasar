import VueZoomer from 'vue-zoomer';
import VueHtml2Canvas from 'vue-html2canvas';
import VueSignaturePad from 'vue-signature-pad';

export default async ({Vue}) => {
    Vue.use(VueZoomer);

    Vue.use(VueHtml2Canvas);

    Vue.use(VueSignaturePad);

}