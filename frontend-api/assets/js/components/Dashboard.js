const DashboardComponent = {
    template: `
        <div class="p-6 max-w-6xl mx-auto">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <!-- Kartu statistik -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                <div class="bg-blue-600 text-white rounded-xl p-5 shadow">
                    <p class="text-3xl font-bold">{{ stats.buku }}</p>
                    <p class="text-blue-100 text-sm mt-1">Total Buku</p>
                </div>
                <div class="bg-green-500 text-white rounded-xl p-5 shadow">
                    <p class="text-3xl font-bold">{{ stats.kategori }}</p>
                    <p class="text-green-100 text-sm mt-1">Kategori</p>
                </div>
                <div class="bg-purple-600 text-white rounded-xl p-5 shadow">
                    <p class="text-3xl font-bold">{{ stats.penulis }}</p>
                    <p class="text-purple-100 text-sm mt-1">Penulis</p>
                </div>
                <div class="bg-orange-500 text-white rounded-xl p-5 shadow">
                    <p class="text-3xl font-bold">{{ stats.peminjaman }}</p>
                    <p class="text-orange-100 text-sm mt-1">Peminjaman Aktif</p>
                </div>
            </div>

            <!-- Menu navigasi cepat -->
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Menu Manajemen</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <router-link to="/buku"
                    class="bg-white hover:bg-blue-50 border border-gray-200 rounded-xl p-5 text-center shadow-sm transition">
                    <div class="text-3xl mb-2">📖</div>
                    <p class="font-semibold text-gray-700">Kelola Buku</p>
                </router-link>
                <router-link to="/kategori"
                    class="bg-white hover:bg-green-50 border border-gray-200 rounded-xl p-5 text-center shadow-sm transition">
                    <div class="text-3xl mb-2">🏷️</div>
                    <p class="font-semibold text-gray-700">Kelola Kategori</p>
                </router-link>
                <router-link to="/penulis"
                    class="bg-white hover:bg-purple-50 border border-gray-200 rounded-xl p-5 text-center shadow-sm transition">
                    <div class="text-3xl mb-2">✍️</div>
                    <p class="font-semibold text-gray-700">Kelola Penulis</p>
                </router-link>
                <router-link to="/peminjaman"
                    class="bg-white hover:bg-orange-50 border border-gray-200 rounded-xl p-5 text-center shadow-sm transition">
                    <div class="text-3xl mb-2">📋</div>
                    <p class="font-semibold text-gray-700">Kelola Peminjaman</p>
                </router-link>
            </div>
        </div>
    `,
    data() {
        return {
            stats: { buku: 0, kategori: 0, penulis: 0, peminjaman: 0 }
        }
    },
    async mounted() {
        try {
            const [buku, kategori, penulis, peminjaman] = await Promise.all([
                axios.get(`${BASE_URL}/buku`),
                axios.get(`${BASE_URL}/kategori`),
                axios.get(`${BASE_URL}/penulis`),
                axios.get(`${BASE_URL}/peminjaman`),
            ])
            this.stats.buku       = buku.data.data.length
            this.stats.kategori   = kategori.data.data.length
            this.stats.penulis    = penulis.data.data.length
            this.stats.peminjaman = peminjaman.data.data.length
        } catch (e) {
            console.error('Gagal load statistik', e)
        }
    }
}   