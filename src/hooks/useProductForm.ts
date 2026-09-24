"use client";

import { useEffect, useState } from "react";
import { Product, Category } from "@/services/product.service";

export interface UseProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: Partial<Product>) => Promise<void>;
  initialData?: Product | null;
  categories: Category[];
}

export interface FormErrors {
  title?: string;
  category?: string;
  price?: string;
  stock?: string;
  rating?: string;
  description?: string;
  thumbnail?: string;
}

export interface ProductFormData {
  title: string;
  category: string;
  price: string;
  stock: string;
  rating: string;
  description: string;
  thumbnail: string;
}

const DEFAULT_THUMBNAIL =
  "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png";

export function useProductForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories,
}: UseProductFormProps) {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    category: "",
    price: "",
    stock: "",
    rating: "4.5",
    description: "",
    thumbnail: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [prevInitialData, setPrevInitialData] = useState(initialData);

  if (isOpen !== prevIsOpen || initialData !== prevInitialData) {
    setPrevIsOpen(isOpen);
    setPrevInitialData(initialData);
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || "",
          category: initialData.category || "",
          price: String(initialData.price ?? ""),
          stock: String(initialData.stock ?? ""),
          rating: String(initialData.rating ?? "4.5"),
          description: initialData.description || "",
          thumbnail: initialData.thumbnail || "",
        });
      } else {
        setFormData({
          title: "",
          category: categories[0]?.slug || "",
          price: "",
          stock: "",
          rating: "4.5",
          description: "",
          thumbnail: "",
        });
      }
      setErrors({});
      setServerError("");
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Product title is required.";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Please select a category.";
    }

    const priceNum = parseFloat(formData.price);
    if (!formData.price.trim()) {
      newErrors.price = "Price is required.";
    } else if (isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = "Price must be a valid positive number.";
    }

    const stockNum = parseInt(formData.stock, 10);
    if (!formData.stock.trim()) {
      newErrors.stock = "Stock count is required.";
    } else if (isNaN(stockNum) || stockNum < 0) {
      newErrors.stock = "Stock must be 0 or greater.";
    }

    const ratingNum = parseFloat(formData.rating);
    if (formData.rating.trim()) {
      if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
        newErrors.rating = "Rating must be between 0 and 5.";
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required.";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    if (formData.thumbnail.trim()) {
      try {
        new URL(formData.thumbnail);
      } catch {
        newErrors.thumbnail = "Please enter a valid URL.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      setServerError("");

      const productPayload: Partial<Product> = {
        title: formData.title.trim(),
        category: formData.category.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        rating: formData.rating ? parseFloat(formData.rating) : 4.5,
        description: formData.description.trim(),
        thumbnail: formData.thumbnail.trim() || DEFAULT_THUMBNAIL,
        images: [formData.thumbnail.trim() || DEFAULT_THUMBNAIL],
      };

      await onSubmit(productPayload);
      onClose();
    } catch (err) {
      console.error("Failed to save product:", err);
      setServerError(
        "Failed to save product. Please check your data and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    serverError,
    isEdit,
    handleChange,
    handleSubmit,
  };
}
