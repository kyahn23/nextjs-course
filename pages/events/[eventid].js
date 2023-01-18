import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getAllEvents, getEventById } from "../../helpers/api-util";

function EventDetailPage(props) {
  // const router = useRouter();
  // const eventId = router.query.eventid;
  const event = props.selectedEvent;
  if (!event) {
    return <p>No Event found!</p>;
  }
  return (
    <div>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </div>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const eId = context.params.eventid;

  const event = await getEventById(eId);

  return {
    props: {
      selectedEvent: event,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({
    params: { eventid: event.id },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
