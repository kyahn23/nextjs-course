import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data";

export default function AllEventPage() {
  const events = getAllEvents();

  return (
    <div>
      <EventList items={events} />
    </div>
  );
}
