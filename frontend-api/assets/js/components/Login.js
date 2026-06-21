const LoginComponent = {
    template: `
        <div class="min-h-screen bg-gray-100 flex items-center justify-center">
            <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <div class="text-center mb-6">
                    <span class="text-5xl">📚</span>
                    <h2 class="text-2xl font-bold text-gray-800 mt-2">E-Library Admin</h2>
                    <p class="text-gray-500 text-sm">Masuk ke panel administrator</p>
                </div>

                <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">
                    {{ errorMsg }}
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input v-model="form.email" type="email" placeholder="admin@elibrary.com"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"/>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input v-model="form.password" type="password" placeholder="••••••••"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"/>
                    </div>
                    <button @click="login" :disabled="loading"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50">
                        {{ loading ? 'Memproses...' : 'Login' }}
                    </button>
                </div>

                <p class="text-center text-sm text-gray-400 mt-6">
                    <router-link to="/" class="hover:text-blue-500">← Kembali ke Beranda</router-link>
                </p>
            </div>
        </div>
    `,
    data() {
        return {
            form: { email: '', password: '' },
            errorMsg: '',
            loading: false,
        }
    },
    methods: {
        async login() {
            this.errorMsg = ''
            this.loading  = true
            try {
                const res = await axios.post(`${BASE_URL}/auth/login`, this.form)
                const { token, nama, email, id } = res.data.data

                localStorage.setItem('token',      token)
                localStorage.setItem('isLoggedIn', 'true')
                localStorage.setItem('user',       JSON.stringify({ id, nama, email }))

                this.$router.push({ name: 'Dashboard' })
            } catch (e) {
                this.errorMsg = e.response?.data?.message || 'Login gagal. Periksa email dan password.'
            } finally {
                this.loading = false
            }
        }
    }
}