import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage'
import OrderPage from '@/components/OrderPage'
import SelfPage from '@/components/SelfPage'
import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import InfoPage from "@/components/InfoPage.vue";
import OrderHistoryPage from "@/components/OrderHistoryPage.vue";
import finalorder from "@/components/final_order.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/Main',
            name: 'MainPage',
            component: MainPage
        },//主界面
        {
            path: '/Order/',
            name: 'OrderPage',
            component:OrderPage
        },//订单界面
        {
            path: '/Self',
            component:SelfPage,
            children:[
                {
                    path: 'Info',
                    name: 'InfoPage',
                    component:InfoPage
                },//个人信息界面
                {
                    path:'OrderHistory',
                    name:'OrderHistoryPage',
                    component:OrderHistoryPage
                },
                ]
        },//个人中心界面
        {
            path: '/',
            name:'LoginPage',
            component:LoginPage
        },//登录界面
        {
            path:'/Register',
            name:'RegisterPage',
            component:RegisterPage
        },//注册界面
        {
            path: '/finalorder',
            name: 'finalorder',
            component:finalorder
        }

    ]
})

export default router