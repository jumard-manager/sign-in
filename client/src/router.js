import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('./views/Home'),
        },

        {
            path: '/signin',
            name: 'signin',
            component: () =>
                import ('./views/SignIn')
        },

        {
            path: '/signed_page',
            name: 'signedpage',
            component: () =>
                import ('./views/SignedPage'),
            meta: { requiresAuth: true }
        },
    ]
})

router.beforeEach((to, from, next) => {
    const issigned = store.getters['auth/issigned'];
    const token = store.getters['auth/authtoken'];
    console.log('>> to.path=', to.path);
    console.log('>> isSigned=', issigned);
    console.log('>> token=', token);

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (issigned) {
            console.log('already signed in');
            next();
        } else {
            if (token != null) {
                console.log('require to reload');
                store.dispatch('auth/reload')
                    .then(() => {
                        console.log('successed to signed in');
                        next();
                    })
                    .catch(() => {
                        console.log('faild signed in');
                        forceToLoginPage(to, next);
                    });
            } else {
                console.log('faild signed in');
                forceToLoginPage(to, next);
            }
        }
    } else {
        console.log('public page');
        next();
    }
});

function forceToLoginPage(to, next) {
    console.log('force to redirect signin page');
    next({
        path: '/signin',
        query: { username: store.getters['auth/username'] }
        //query: { redirect: to.fullPath }
    });
}

export default router;