"use client";

export function ActionButtons({ id, entityName }) {
  const handleEdit = () => {
    alert(`[MOCK] Membuka form edit untuk ${entityName} ID: ${id}\n\n(Fitur ini akan terhubung ke form sesungguhnya saat database Data Connect aktif)`);
  };

  const handleDelete = () => {
    const confirm = window.confirm(`Apakah Anda yakin ingin menghapus ${entityName} ini?`);
    if (confirm) {
      alert(`[MOCK] ${entityName} berhasil dihapus dari tampilan!\n\n(Data di-reset saat server restart karena masih menggunakan memori lokal)`);
    }
  };

  return (
    <div className="flex justify-end gap-3">
      <button onClick={handleEdit} className="text-indigo-600 hover:text-indigo-900 font-medium">Edit</button>
      <button onClick={handleDelete} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
    </div>
  );
}

export function CreateButton({ label, entityName }) {
  const handleCreate = () => {
    alert(`[MOCK] Membuka form tambah ${entityName}...\n\n(Fitur ini akan menyimpan data ke database production nantinya)`);
  };

  return (
    <button 
      onClick={handleCreate}
      type="button" 
      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
    >
      {label}
    </button>
  );
}
