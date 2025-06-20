"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { generateFakeCategories } from "@/lib/generateFakeCategories";

const ITEMS_PER_PAGE = 5;

interface Category {
  id: number;
  name: string;
}

type PaginationItem = number | "..." | null;

export default function ProtectedPage() {
  const categoriesRef = useRef<Category[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);

 
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("categories");
      if (stored) {
        categoriesRef.current = JSON.parse(stored);
      } else {
        const generated = generateFakeCategories(35);
        categoriesRef.current = generated;
        localStorage.setItem("categories", JSON.stringify(generated));
      }

      const selectedStored = localStorage.getItem("selectedCategories");
      if (selectedStored) {
        setSelected(JSON.parse(selectedStored));
      }
    } catch (error) {
      console.error("LocalStorage access error:", error);
    }

    setMounted(true);
  }, []);

 
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn !== "true") {
      window.location.href = "/login"; 
      return;
    }

    try {
      const stored = localStorage.getItem("categories");
      if (stored) {
        categoriesRef.current = JSON.parse(stored);
      } else {
        const generated = generateFakeCategories(35);
        categoriesRef.current = generated;
        localStorage.setItem("categories", JSON.stringify(generated));
      }

      const selectedStored = localStorage.getItem("selectedCategories");
      if (selectedStored) {
        setSelected(JSON.parse(selectedStored));
      }
    } catch (error) {
      console.error("LocalStorage access error:", error);
    }

    setMounted(true);
  }, []);
  

  const toggleSelection = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const totalPages = useMemo(
    () => Math.ceil(categoriesRef.current.length / ITEMS_PER_PAGE),
    [categoriesRef.current.length]
  );

  const currentItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return categoriesRef.current.slice(start, start + ITEMS_PER_PAGE);
  }, [page, categoriesRef.current]);

  const visiblePages = useMemo(() => {
    const range: PaginationItem[] = [];
    const maxVisible = 3; // Number of pages to show around current page

    // Always show first page
    if (page > 2) {
      range.push(1);
    }

    // Add ellipsis if needed after first page
    if (page > 3) {
      range.push("...");
    }

    // Add pages around current page
    for (
      let i = Math.max(1, page - 1);
      i <= Math.min(totalPages, page + 1);
      i++
    ) {
      range.push(i);
    }

    // Add ellipsis if needed before last page
    if (page < totalPages - 2) {
      range.push("...");
    }

    // Always show last page if different from current range
    if (page < totalPages - 1 && !range.includes(totalPages)) {
      range.push(totalPages);
    }

    return range.filter((item) => item !== null);
  }, [page, totalPages]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-lg shadow-sm p-6 space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold">Please mark your interests!</h1>
          <p className="text-sm text-gray-500">We will keep you notified.</p>
        </div>

        <hr />

        <div>
          <h2 className="font-semibold text-base mb-4">My saved interests!</h2>
          <div className="space-y-3">
            {currentItems.map((item) => (
              <label
                key={`category-${item.id}`}
                className="flex items-center gap-3"
                htmlFor={`category-${item.id}`}
              >
                <Checkbox
                  id={`category-${item.id}`}
                  checked={selected.includes(item.id)}
                  onCheckedChange={() => toggleSelection(item.id)}
                  className="data-[state=checked]:bg-black"
                  aria-label={`Select ${item.name}`}
                />
                <span className="text-sm">{item.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2 items-center text-muted-foreground text-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage(1)}
            disabled={page === 1}
            aria-label="First page"
          >
            &lt;&lt;
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            &lt;
          </Button>

          {visiblePages.map((pg, i) =>
            pg === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2" aria-hidden="true">
                ...
              </span>
            ) : (
              <Button
                key={`page-${pg}`}
                variant={page === pg ? "default" : "ghost"}
                size="icon"
                onClick={() => setPage(Number(pg))}
                className={`w-8 h-8 rounded-full ${
                  page === pg ? "font-bold " : "hover:underline"
                }`}
                aria-label={`Page ${pg}`}
                aria-current={page === pg ? "page" : undefined}
              >
                {pg}
              </Button>
            )
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            &gt;
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            aria-label="Last page"
          >
            &gt;&gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
