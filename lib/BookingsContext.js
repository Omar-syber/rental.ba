"use client";

import { createContext, useCallback, useContext, useState } from "react";

// In-memory only, on purpose — a real booking would write to a database,
// but this demo just needs the state to survive client-side navigation
// between the property page and /appointments, not a hard refresh.
// PRODUCT.md: no backend yet, visual/working-until-refresh is the spec.
const BookingsContext = createContext(null);

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  const addBooking = useCallback((booking) => {
    const record = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      requestedAt: new Date().toISOString(),
      ...booking,
    };
    setBookings((prev) => [record, ...prev]);
    return record;
  }, []);

  return <BookingsContext.Provider value={{ bookings, addBooking }}>{children}</BookingsContext.Provider>;
}

export function useBookings() {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error("useBookings must be used within BookingsProvider");
  return ctx;
}
