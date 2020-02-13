import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import YouSync from '@/components/YouSync'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/:room/youtube',
            name: 'YouSync',
            component: YouSync,
            props: true,
            beforeEnter(to, from, next) {
                if (to.params.room) {
                    next()
                } else {
                    next({ name: 'Welcome' })
                }
            },
        },


        {
            path: '/chat/:room',
            name: 'Chat',
            component: Chat,
            props: true,
            beforeEnter(to, from, next) {
                if (to.params.name && to.params.room) {
                    next()
                } else {
                    next({ name: 'Welcome' })
                }
            },
        },
        // {
        //     path: '/chat',
        //     name: 'Chat',
        //     component: Chat,
        //     beforeEnter(to, from, next) {
        //         if (to.params.name && to.params.room) {
        //             next()
        //         } else {
        //             next({ name: 'Welcome' })
        //         }
        //     }
        // },
    ]
})