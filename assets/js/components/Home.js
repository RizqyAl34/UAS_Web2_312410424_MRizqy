const HomeComponent = {
    template: `
        <div class="min-h-screen bg-gray-50">

            <!-- Hero -->
            <div class="bg-blue-700 text-white py-14 px-6 text-center shadow">
                <h1 class="text-4xl font-bold mb-2">📚 E-Library Digital</h1>
                <p class="text-blue-100 text-lg mb-6">Sistem Informasi Rental Buku & Komik Digital</p>
                <router-link to="/login"
                    class="bg-white text-blue-700 font-semibold px-6 py-2 rounded-full hover:bg-blue-50 transition">
                    Login Admin →
                </router-link>
            </div>

            <!-- Statistik -->
            <div class="max-w-5xl mx-auto px-6 py-10">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
                    <div class="bg-white rounded-xl shadow p-5 text-center border border-gray-100">
                        <p class="text-4xl font-bold text-blue-600">{{ stats.buku }}</p>
                        <p class="text-gray-500 text-sm mt-1">Total Buku</p>
                    </div>
                    <div class="bg-white rounded-xl shadow p-5 text-center border border-gray-100">
                        <p class="text-4xl font-bold text-green-600">{{ stats.kategori }}</p>
                        <p class="text-gray-500 text-sm mt-1">Kategori</p>
                    </div>
                    <div class="bg-white rounded-xl shadow p-5 text-center border border-gray-100">
                        <p class="text-4xl font-bold text-purple-600">{{ stats.penulis }}</p>
                        <p class="text-gray-500 text-sm mt-1">Penulis</p>
                    </div>
                    <div class="bg-white rounded-xl shadow p-5 text-center border border-gray-100">
                        <p class="text-4xl font-bold text-orange-500">{{ stats.peminjaman }}</p>
                        <p class="text-gray-500 text-sm mt-1">Peminjaman Aktif</p>
                    </div>
                </div>

                <!-- Filter & Search -->
                <div class="flex flex-col md:flex-row items-center gap-3 mb-6">
                    <h2 class="text-xl font-bold text-gray-800 flex-1">📖 Koleksi Buku Tersedia</h2>
                    <input v-model="search" type="text" placeholder="Cari judul buku..."
                        class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    <select v-model="filterKategori"
                        class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option value="">Semua Kategori</option>
                        <option v-for="k in kategoriList" :key="k.id" :value="k.nama_kategori">{{ k.nama_kategori }}</option>
                    </select>
                </div>

                <!-- Daftar Buku -->
                <div v-if="loading" class="text-center py-12 text-gray-400">Memuat data buku...</div>

                <div v-else-if="bukuFiltered.length === 0" class="text-center py-12 text-gray-400">
                    Tidak ada buku yang sesuai pencarian.
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div v-for="buku in bukuFiltered" :key="buku.id"
                        class="bg-white rounded-xl shadow border border-gray-100 p-5 hover:shadow-md transition">

                        <!-- Cover placeholder -->
                        <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-32 flex items-center justify-center mb-4">
                            <span class="text-5xl">📗</span>
                        </div>

                        <h3 class="font-bold text-gray-800 text-base mb-1 line-clamp-2">{{ buku.judul }}</h3>
                        <p class="text-gray-500 text-sm mb-1">✍️ {{ buku.nama_penulis }}</p>
                        <p class="text-gray-400 text-xs mb-3">📅 {{ buku.tahun_terbit || '-' }} · {{ buku.penerbit || '-' }}</p>

                        <div class="flex items-center justify-between">
                            <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                                {{ buku.nama_kategori }}
                            </span>
                            <span :class="buku.stok > 0
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-600'"
                                class="text-xs px-2 py-1 rounded-full font-medium">
                                {{ buku.stok > 0 ? '✅ Tersedia (' + buku.stok + ')' : '❌ Habis' }}
                            </span>
                        </div>

                        <p v-if="buku.sinopsis" class="text-gray-400 text-xs mt-3 line-clamp-3 italic">
                            {{ buku.sinopsis }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center text-gray-400 text-sm py-8 border-t border-gray-200 mt-6">
                © 2025 E-Library Digital — M. Rizqy Al Rasyd (312410424)
            </div>
        </div>
    `,
    data() {
        return {
            bukuList: [],
            kategoriList: [],
            search: '',
            filterKategori: '',
            loading: true,
            stats: { buku: 0, kategori: 0, penulis: 0, peminjaman: 0 }
        }
    },
    computed: {
        bukuFiltered() {
            return this.bukuList.filter(b => {
                const cocokSearch   = b.judul.toLowerCase().includes(this.search.toLowerCase())
                const cocokKategori = this.filterKategori === '' || b.nama_kategori === this.filterKategori
                return cocokSearch && cocokKategori
            })
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
            this.bukuList     = buku.data.data
            this.kategoriList = kategori.data.data
            this.stats.buku       = buku.data.data.length
            this.stats.kategori   = kategori.data.data.length
            this.stats.penulis    = penulis.data.data.length
            this.stats.peminjaman = peminjaman.data.data.length
        } catch (e) {
            console.error('Gagal load data', e)
        } finally {
            this.loading = false
        }
    }
}