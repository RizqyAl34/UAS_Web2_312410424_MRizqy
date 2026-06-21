const { createRouter, createWebHashHistory } = VueRouter

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeComponent,
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/buku',
        name: 'Buku',
        component: BukuComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/kategori',
        name: 'Kategori',
        component: KategoriComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/penulis',
        name: 'Penulis',
        component: PenulisComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/peminjaman',
        name: 'Peminjaman',
        component: PeminjamanComponent,
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// Navigation Guard — cek token sebelum masuk halaman admin
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (to.meta.requiresAuth && !isLoggedIn) {
        alert('Sesi habis! Silakan login terlebih dahulu.')
        next({ name: 'Login' })
    } else {
        next()
    }
})