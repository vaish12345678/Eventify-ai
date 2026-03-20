
import EventsClient from "./EventClient";

export default async function EventsPage() {
  const res = await fetch("http://localhost:3000/api/events", {
    cache: "no-store"
  });

  const events = await res.json();

  return <EventsClient events={events} />;
}