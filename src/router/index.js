import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import SignIn from '@/views/SignIn.vue';
import Join from '@/views/Join.vue';
import Main from '@/views/Main.vue';
import Profile from '@/views/sub-views/Profile.vue';
import Library from '@/views/sub-views/Library.vue';
import Post_Message from '@/views/sub-views/Post_Message.vue';
import Feed from '@/views/sub-views/Feed.vue';
import MessageList from '@/views/sub-views/MessageList.vue';
import Directory from '@/views/sub-views/Directory.vue';
import Chat from '@/views/sub-views/Chat.vue';
 
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'/main',
            component: Main,
            children: [
                {
                    path: '',
                    name: 'main',
                    components: {
                        leftCell: Library,
                        centerCell: Feed,
                        rightCell: MessageList
                    },
                    meta: {
                        authRequired: true
                    }
                },
                {
                    path: 'profile',
                    components:{
                        leftCell: Library,
                        centerCell: Profile
                    },
                    meta: {
                        authRequired: true
                    }
                },
                {
                    path: 'post-message',
                    components: {
                        centerCell: Post_Message,
                        rightCell: MessageList
                    },
                    meta: {
                        authRequired: true
                    }
                },
                {
                    path: 'inbox',
                    children: [
                        {
                            path: '',
                            components: {
                                leftCell: Directory,
                            },
                            props: true,
                            meta: {
                                authRequired: true
                            }
                        },
                        {
                            path: ':userId/chat',
                            components: {
                                leftCell: Directory,
                                centerCell: Chat
                            },
                            props: true,
                            meta: {
                                authRequired: true
                            }
                        }
                    ]
                }
            ]
        },

        {
            path:'/signin',
            name:'sign_in',
            component: SignIn,
            meta: {
                authRequired: false
            }
        },
        {
            path: '/join',
            name: 'join',
            component: Join,
            meta: {
                authRequired: false
            }
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                authRequired: false
            }
        }
    ],
})

router.beforeEach(async (to, from) => {
    if (to.matched.length === 0){
        if (localStorage.getItem('token')){
            return {
                path: '/main'
            }
        }
        else {
            return {
                path: ''
            }
        }
    }
    
    if (to.meta.authRequired && !localStorage.getItem('token')){
        return {
            path: '/signin',
            query: {redirect: to.fullPath},
        }
    }
});
 
export default router