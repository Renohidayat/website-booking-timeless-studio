"use client";

import { useTransition, useState } from "react";
import { deleteScheduleAction, createScheduleAction, updateScheduleAction } from "@/app/admin/actions";

export function ActionButtons({ id, entityName }) {
  const [isPending, startTransition] = useTransition();

  const handleEdit = () => {
    // For simplicity in this ponytail version, we use a prompt to get a new status
    const newStatus = window.prompt(`Update status untuk ${entityName} ID ${id} (tersedia/dipesan/tidak_tersedia):`);
    if (newStatus && ["tersedia", "dipesan", "tidak_tersedia"].includes(newStatus)) {
      startTransition(() => {
        updateScheduleAction(id, { status_slot: newStatus });
      });
    } else if (newStatus) {
      alert("Status tidak valid!");
    }
  };

  const handleDelete = () => {
    const confirm = window.confirm(`Apakah Anda yakin ingin menghapus ${entityName} ini?`);
    if (confirm) {
      startTransition(() => {
        deleteScheduleAction(id);
      });
    }
  };

  return (
    <div className="flex justify-end gap-3">
      <button onClick={handleEdit} disabled={isPending} className="text-studio-600 hover:text-studio-900 font-medium text-xs uppercase tracking-wider disabled:opacity-50">Edit</button>
      <button onClick={handleDelete} disabled={isPending} className="text-red-600 hover:text-red-900 font-medium text-xs uppercase tracking-wider disabled:opacity-50">Hapus</button>
    </div>
  );
}

export function CreateButton({ label, entityName }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      tanggal: formData.get("tanggal"),
      jam_mulai: formData.get("jam_mulai"),
      jam_selesai: formData.get("jam_selesai"),
      status_slot: "tersedia"
    };

    startTransition(() => {
      createScheduleAction(data);
      setIsOpen(false);
    });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        type="button" 
        className="btn-primary block px-4 py-2 text-center text-xs tracking-widest font-semibold uppercase rounded-sm"
      >
        {label}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 max-w-sm w-full rounded-sm shadow-xl">
            <h3 className="text-lg font-serif font-bold text-studio-900 mb-4">Tambah {entityName} Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-studio-500 mb-1">Tanggal</label>
                <input type="date" name="tanggal" required className="w-full border-studio-200 rounded-sm p-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-studio-500 mb-1">Mulai</label>
                  <input type="time" name="jam_mulai" required className="w-full border-studio-200 rounded-sm p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-studio-500 mb-1">Selesai</label>
                  <input type="time" name="jam_selesai" required className="w-full border-studio-200 rounded-sm p-2 text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsOpen(false)} className="w-full py-2 border border-studio-200 rounded-sm text-xs font-semibold uppercase tracking-wider">Batal</button>
                <button type="submit" disabled={isPending} className="btn-primary w-full py-2 rounded-sm text-xs font-semibold uppercase tracking-wider disabled:opacity-50">
                  {isPending ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
