"use client"
import React, { useState, useEffect } from 'react';
import CreateMealModal from "@/components/reusables/modal/CreateMealModal"
export default function page() {
    const [isMealModalOpen, setIsMealModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  return (
    <section>

<button onClick={() => setIsMealModalOpen(true)} className="btn-primary">
        Add Meal
      </button>
      <button onClick={() => setIsCategoryModalOpen(true)} className="btn-primary">
        Add Category
      </button>
      
      <CreateMealModal
        isOpen={isMealModalOpen}
        onClose={() => setIsMealModalOpen(false)}
        categories={[]}
        ingredients={[]}
      />
      {/* <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      /> */}
    </section>
  )
}
