import { useState } from "react";
import { createReservation } from "../../services/reservationService";

export default function ReservationForm() {
  const [eventType, setEventType] = useState("");
  const [guestCount, setGuestCount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createReservation({
      eventType,
      guestCount,
    });

    alert("Reservation submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Event Type"
        onChange={(e) => setEventType(e.target.value)}
      />

      <input
        placeholder="Guest Count"
        onChange={(e) => setGuestCount(e.target.value)}
      />

      <button>Reserve</button>
    </form>
  );
}
