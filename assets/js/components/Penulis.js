const PenulisComponent = {
    template: `
        <div class="p-6 max-w-6xl mx-auto">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Manajemen Penulis</h1>
                <button @click="openModal()"
                    class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition">
                    + Tambah Penulis
                </button>
            </div>

            <div class="bg-white rounded-xl shadow overflow-hidden">
                <table class="w-full text-sm">
                    <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th class="px-4 py-3 text-left">No</th>
                            <th class="px-4 py-3 text-left">Nama Penulis</th>
                            <th class="px-4 py-3 text-left">Biografi</th>
                            <th class="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-if="list.length === 0">
                            <td colspan="4" class="text-center py-6 text-gray-400">Belum ada data penulis.</td>
                        </tr>
                        <tr v-for="(item, i) in list" :key="item.id" class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-gray-500">{{ i + 1 }}</td>
                            <td class="px-4 py-3 font-medium text-gray-800">{{ item.nama_penulis }}</td>
                            <td class="px-4 py-3 text-gray-500">{{ item.biografi ? item.biografi.substring(0, 60) + '...' : '-' }}</td>
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
                <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                    <h2 class="text-lg font-bold text-gray-800 mb-4">{{ isEdit ? 'Edit' : 'Tambah' }} Penulis</h2>
                    <div class="space-y-3">
                        <div>
                            <label class="text-sm font-medium text-gray-700">Nama Penulis</label>
                            <input v-model="form.nama_penulis" type="text"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-700">Biografi</label>
                            <textarea v-model="form.biografi" rows="3"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
                        </div>
                    </div>
                    <div class="flex justify-end gap-2 mt-5">
                        <button @click="showModal = false"
                            class="px-4 py-2 rounded-lg border text-sm text-gray-600 hover:bg-gray-50">Batal</button>
                        <button @click="simpan"
                            class="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700">Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            list: [], showModal: false, isEdit: false,
            form: { nama_penulis: '', biografi: '' },
            editId: null,
        }
    },
    async mounted() { await this.loadData() },
    methods: {
        async loadData() {
            const res = await axios.get(`${BASE_URL}/penulis`)
            this.list = res.data.data
        },
        openModal(item = null) {
            this.isEdit = !!item
            this.editId = item ? item.id : null
            this.form   = item
                ? { nama_penulis: item.nama_penulis, biografi: item.biografi }
                : { nama_penulis: '', biografi: '' }
            this.showModal = true
        },
        async simpan() {
            try {
                if (this.isEdit) {
                    await axios.put(`${BASE_URL}/penulis/${this.editId}`, this.form)
                } else {
                    await axios.post(`${BASE_URL}/penulis`, this.form)
                }
                this.showModal = false
                await this.loadData()
            } catch (e) {
                alert('Gagal menyimpan data!')
            }
        },
        async hapus(id) {
            if (!confirm('Yakin ingin menghapus penulis ini?')) return
            await axios.delete(`${BASE_URL}/penulis/${id}`)
            await this.loadData()
        }
    }
}