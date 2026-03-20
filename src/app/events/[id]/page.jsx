

import OrganizerEventDetailsClient from "./Client";

export default async function OrganizerEventPage({ params }) {
  const { id } = await params; 
  try {
    const res = await fetch(
      `http://localhost:3000/api/events/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch event");
    }

    const event = await res.json();

    return <OrganizerEventDetailsClient event={event} />;
  } catch (err) {
    console.error(err);
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load event
      </div>
    );
  }
}