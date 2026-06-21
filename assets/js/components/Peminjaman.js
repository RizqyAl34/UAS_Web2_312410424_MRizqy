const PeminjamanComponent = {
    template: `
        <div class="p-6 max-w-6xl mx-auto">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Manajemen Peminjaman</h1>
                <button @click="openModal()"
                    class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition">
                    + Tambah Peminjaman
                </button>
            </div>

            <div class="bg-white rounded-xl shadow overflow-hidden">
                <table class="w-full text-sm">
                    <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th class="px-4 py-3 text-left">No</th>
                            <th class="px-4 py-3 text-left">Peminjam</th>
                            <th class="px-4 py-3 text-left">Buku</th>
                            <th class="px-4 py-3 text-left">Tgl Pinjam</th>
                            <th class="px-4 py-3 text-left">Tgl Kembali</th>
                            <th class="px-4 py-3 text-left">Status</th>
                            <th class="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-if="list.length === 0">
                            <td colspan="7" class="text-center py-6 text-gray-400">Belum ada data peminjaman.</td>
                        </tr>
                        <tr v-for="(item, i) in list" :key="item.id" class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-gray-500">{{ i + 1 }}</td>
                            <td class="px-4 py-3 font-medium text-gray-800">{{ item.nama_peminjam }}</td>
                            <td class="px-4 py-3 text-gray-600">{{ item.judul_buku }}</td>
                            <td class="px-4 py-3 text-gray-500">{{ item.tanggal_pinjam }}</td>
                            <td class="px-4 py-3 text-gray-500">{{ item.tanggal_kembali || '-' }}</td>
                            <td class="px-4 py-3">
                                <span :class="item.status === 'dipinjam' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'"
                                    class="px-2 py-1 rounded text-xs font-medium capitalize">{{ item.status }}</span>
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
                <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                    <h2 class="text-lg font-bold text-gray-800 mb-4">{{ isEdit ? 'Edit' : 'Tambah' }} Peminjaman</h2>
                    <div class="space-y-3">
                        <div>
                            <label class="text-sm font-medium text-gray-700">Nama Peminjam</label>
                            <input v-model="form.nama_peminjam" type="text"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-700">Buku</label>
                            <select v-model="form.id_buku"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400">
                                <option value="">-- Pilih Buku --</option>
                                <option v-for="b in bukuList" :key="b.id" :value="b.id">{{ b.judul }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-700">Tanggal Pinjam</label>
                            <input v-model="form.tanggal_pinjam" type="date"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-700">Tanggal Kembali</label>
                            <input v-model="form.tanggal_kembali" type="date"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-700">Status</label>
                            <select v-model="form.status"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400">
                                <option value="dipinjam">Dipinjam</option>
                                <option value="dikembalikan">Dikembalikan</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex justify-end gap-2 mt-5">
                        <button @click="showModal = false"
                            class="px-4 py-2 rounded-lg border text-sm text-gray-600 hover:bg-gray-50">Batal</button>
                        <button @click="simpan"
                            class="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600">Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            list: [], bukuList: [],
            showModal: false, isEdit: false, editId: null,
            form: { nama_peminjam: '', id_buku: '', tanggal_pinjam: '', tanggal_kembali: '', status: 'dipinjam' },
        }
    },
    async mounted() { await this.loadData() },
    methods: {
        async loadData() {
            const [peminjaman, buku] = await Promise.all([
                axios.get(`${BASE_URL}/peminjaman`),
                axios.get(`${BASE_URL}/buku`),
            ])
            this.list     = peminjaman.data.data
            this.bukuList = buku.data.data
        },
        openModal(item = null) {
            this.isEdit = !!item
            this.editId = item ? item.id : null
            this.form   = item ? {
                nama_peminjam: item.nama_peminjam, id_buku: item.id_buku,
                tanggal_pinjam: item.tanggal_pinjam, tanggal_kembali: item.tanggal_kembali,
                status: item.status,
            } : { nama_peminjam: '', id_buku: '', tanggal_pinjam: '', tanggal_kembali: '', status: 'dipinjam' }
            this.showModal = true
        },
        async simpan() {
            try {
                if (this.isEdit) {
                    await axios.put(`${BASE_URL}/peminjaman/${this.editId}`, this.form)
                } else {
                    await axios.post(`${BASE_URL}/peminjaman`, this.form)
                }
                this.showModal = false
                await this.loadData()
            } catch (e) {
                alert('Gagal menyimpan data!')
            }
        },
        async hapus(id) {
            if (!confirm('Yakin ingin menghapus data peminjaman ini?')) return
            await axios.delete(`${BASE_URL}/peminjaman/${id}`)
            await this.loadData()
        }
    }
}