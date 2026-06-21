const BASE_URL = 'http://localhost/UAS_Web2_312410424_MRizqy/public/api'

// Axios interceptor — inject token otomatis ke setiap request
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, error => Promise.reject(error))

// Axios interceptor — tangkap error 401 global
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('user')
            alert('Sesi habis! Silakan login kembali.')
            router.push({ name: 'Login' })
        }
        return Promise.reject(error)
    }
)

// Root App Component
const App = {
    template: `
        <div>
            <!-- Navbar -->
            <nav v-if="isLoggedIn" class="bg-blue-700 text-white px-6 py-3 flex items-center justify-between shadow-md">
                <div class="flex items-center gap-2">
                    <span class="text-xl font-bold">📚 E-Library</span>
                </div>
                <div class="flex items-center gap-4 text-sm">
                    <router-link to="/dashboard" class="hover:text-blue-200 transition">Dashboard</router-link>
                    <router-link to="/buku"       class="hover:text-blue-200 transition">Buku</router-link>
                    <router-link to="/kategori"   class="hover:text-blue-200 transition">Kategori</router-link>
                    <router-link to="/penulis"    class="hover:text-blue-200 transition">Penulis</router-link>
                    <router-link to="/peminjaman" class="hover:text-blue-200 transition">Peminjaman</router-link>
                    <span class="text-blue-200">|</span>
                    <span class="text-blue-100">{{ user.nama }}</span>
                    <button @click="logout"
                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition">
                        Logout
                    </button>
                </div>
            </nav>

            <!-- Router View -->
            <router-view></router-view>
        </div>
    `,
    data() {
        return {
            isLoggedIn: !!localStorage.getItem('isLoggedIn'),
            user: JSON.parse(localStorage.getItem('user') || '{}'),
        }
    },
    methods: {
        async logout() {
            try {
                await axios.post(`${BASE_URL}/auth/logout`)
            } catch (e) {
                // abaikan error logout
            } finally {
                localStorage.removeItem('token')
                localStorage.removeItem('isLoggedIn')
                localStorage.removeItem('user')
                this.isLoggedIn = false
                this.user = {}
                router.push({ name: 'Login' })
            }
        }
    },
    // Update navbar saat route berubah
    watch: {
        $route() {
            this.isLoggedIn = !!localStorage.getItem('isLoggedIn')
            this.user = JSON.parse(localStorage.getItem('user') || '{}')
        }
    }
}

const app = Vue.createApp(App)
app.use(router)
app.mount('#app')