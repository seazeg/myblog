//组件全局注册
import Vue from 'vue'
import header from './header.vue'
import footer from './footer.vue'
import float from './float.vue'
import pager from './pager.vue'

Vue.component(header.name, header);
Vue.component(footer.name, footer);
Vue.component(float.name, float);
Vue.component(pager.name, pager);