"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { Product } from "@/services/product.service";
import { formatPriceInINR } from "@/utils/currencyConvertor";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteConfirmModal({
  isOpen,
  product,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIsDeleting(false);
      setDeleteError("");
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isDeleting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setDeleteError("");
      await onConfirm();
      onClose();
    } catch (err) {
      console.error("Failed to delete product:", err);
      setDeleteError("Failed to delete product. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDeleting) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-300 bg-white p-6 shadow-2xl transition-all">
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div className="pr-6">
            <h2
              id="delete-modal-title"
              className="text-lg font-semibold text-zinc-900"
            >
              Delete Product
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Are you sure you want to delete this product? This action cannot be
              undone.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3.5 rounded-xl border border-zinc-200 bg-zinc-50/80 p-3.5">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-zinc-300 bg-white">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-zinc-900">
              {product.title}
            </h3>
            <p className="mt-0.5 text-xs capitalize text-zinc-500">
              {product.category}
            </p>
            <p className="mt-1 text-xs font-semibold text-zinc-800">
              {formatPriceInINR(product.price)}
            </p>
          </div>
        </div>

        {deleteError && (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-600">
            {deleteError}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isDeleting ? "Deleting..." : "Delete Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
