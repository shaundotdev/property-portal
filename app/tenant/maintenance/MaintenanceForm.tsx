"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Plus, X } from "lucide-react";

// TODO: hardcoded until auth exists — replace with the logged-in tenant's real id
const TENANT_ID = "2d7640ea-3932-4e86-b49e-2347f1fe75ff";

export default function MaintenanceForm() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const { error } = await supabase.from("maintenance_requests").insert({
      tenant_id: TENANT_ID,
      title: title,
      description: description,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage("Something went wrong. Please try again.");
      return;
    }

    setTitle("");
    setDescription("");
    setIsOpen(false);
    router.refresh();
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-orange-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl"
      >
        <Plus size={16} />
        New Request
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">New Maintenance Request</h2>
        <button type="button" onClick={() => setIsOpen(false)} className="text-gray-400">
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Leaking kitchen faucet"
          required
          className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add any extra detail..."
          rows={3}
          className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 text-sm"
        />
      </div>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-orange-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl self-start disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}