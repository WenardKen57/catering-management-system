import { useEffect, useState } from "react";
import { getMyReservations } from "../../services/reservationService";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getMyReservations();
      setReservations(data);
    };

    fetch();
  }, []);

  return (
    <div>
      <h2>My Reservations</h2>

      {reservations.map((r) => (
        <p key={r._id}>{r.eventType}</p>
      ))}
    </div>
  );
}
