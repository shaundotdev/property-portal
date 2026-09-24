"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function MarkPaidButton({ paymentId }: { paymentId: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleMarkPaid() {
    setIsSubmitting(true);

    const { error } = await supabase
      .from("payments")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("id", paymentId);

    setIsSubmitting(false);

    if (error) {
      console.log(error);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleMarkPaid}
      disabled={isSubmitting}
      className="text-xs font-medium text-orange-600 hover:underline disabled:opacity-50"
    >
      {isSubmitting ? "Marking..." : "Mark as paid"}
    </button>
  );
}