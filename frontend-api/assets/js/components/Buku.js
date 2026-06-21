const BukuComponent = {
    template: `
        <div class="p-6 max-w-6xl mx-auto">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Manajemen Buku</h1>
                <button @click="openModal()"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition">
                    + Tambah Buku
                </button>
            </div>

            <div class="bg-white rounded-xl shadow overflow-hidden">
                <table class="w-full text-sm">
                    <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th class="px-4 py-3 text-left">No</th>
                            <th class="px-4 py-3 text-left">Judul</th>
                            <th class="px-4 py-3 text-left">Kategori</th>
                            <th class="px-4 py-3 text-left">Penulis</th>
                            <th class="px-4 py-3 text-left">Stok</th>
                            <th class="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-if="list.length === 0">
                            <td colspan="6" class="text-center py-6 text-gray-400">Belum ada data buku.</td>
                        </tr>
                        <tr v-for="(item, i) in list" :key="item.id" class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-gray-500">{{ i + 1 }}</td>
                            <td class="px-4 py-3 font-medium text-gray-800">{{ item.judul }}</td>
                            <td class="px-4 py-3">
                                <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{{ item.nama_kategori }}</span>
                            </td>
                            <td class="px-4 py-3 text-gray-600">{{ item.nama_penulis }}</td>
                            <td class="px-4 py-3">
                                <span :class="item.stok > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                                    class="px-2 py-1 rounded text-xs font-medium">{{ item.stok }}</span>
                            </td>
                            <td class="px-4 py-3 text-center space-x-2">
                                <button @click="openModal(item)"
                                    class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">Edit</button>
                                <button @click="hapus(item.id)"
                                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Hapus</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Modal -->
            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
                    <h2 class="text-lg font-bold text-gray-800 mb-4">{{ isEdit ? 'Edit' : 'Tambah' }} Buku</h2>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="col-span-2">
                            <label class="text-sm font-medium text-gray-700">Judul Buku</label>
                            <input v-model="form.judul" type="text"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-700">Kategori</label>
                            <select v-model="form.id_kategori"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                <option value="">-- Pilih Kategori --</option>
                                <option v-for="k in kategoriList" :key="k.id" :value="k.id">{{ k.nama_kategori }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-700">Penulis</label>
                            <select v-model="form.id_penulis"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                <option value="">-- Pilih Penulis --</option>
                                <option v-for="p in penulisList" :key="p.id" :value="p.id">{{ p.nama_penulis }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-700">Penerbit</label>
                            <input v-model="form.penerbit" type="text"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-700">Tahun Terbit</label>
                            <input v-model="form.tahun_terbit" type="number" min="1900" max="2099"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-700">Stok</label>
                            <input v-model="form.stok" type="number" min="0"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                        </div>
                        <div class="col-span-2">
                            <label class="text-sm font-medium text-gray-700">Sinopsis</label>
                            <textarea v-model="form.sinopsis" rows="3"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
                        </div>
                    </div>
                    <div class="flex justify-end gap-2 mt-5">
                        <button @click="showModal = false"
                            class="px-4 py-2 rounded-lg border text-sm text-gray-600 hover:bg-gray-50">Batal</button>
                        <button @click="simpan"
                            class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            list: [], kategoriList: [], penulisList: [],
            showModal: false, isEdit: false, editId: null,
            form: { judul: '', id_kategori: '', id_penulis: '', penerbit: '', tahun_terbit: '', stok: 1, sinopsis: '' },
        }
    },
    async mounted() { await this.loadData() },
    methods: {
        async loadData() {
            const [buku, kategori, penulis] = await Promise.all([
                axios.get(`${BASE_URL}/buku`),
                axios.get(`${BASE_URL}/kategori`),
                axios.get(`${BASE_URL}/penulis`),
            ])
            this.list         = buku.data.data
            this.kategoriList = kategori.data.data
            this.penulisList  = penulis.data.data
        },
        openModal(item = null) {
            this.isEdit = !!item
            this.editId = item ? item.id : null
            this.form   = item ? {
                judul: item.judul, id_kategori: item.id_kategori,
                id_penulis: item.id_penulis, penerbit: item.penerbit,
                tahun_terbit: item.tahun_terbit, stok: item.stok, sinopsis: item.sinopsis,
            } : { judul: '', id_kategori: '', id_penulis: '', penerbit: '', tahun_terbit: '', stok: 1, sinopsis: '' }
            this.showModal = true
        },
        async simpan() {
            try {
                if (this.isEdit) {
                    await axios.put(`${BASE_URL}/buku/${this.editId}`, this.form)
                } else {
                    await axios.post(`${BASE_URL}/buku`, this.form)
                }
                this.showModal = false
                await this.loadData()
            } catch (e) {
                alert('Gagal menyimpan data!')
            }
        },
        async hapus(id) {
            if (!confirm('Yakin ingin menghapus buku ini?')) return
            await axios.delete(`${BASE_URL}/buku/${id}`)
            await this.loadData()
        }
    }
}