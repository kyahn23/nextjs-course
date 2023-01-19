import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

function EventDetailPage(props) {
  // const router = useRouter();
  // const eventId = router.query.eventid;
  const event = props.selectedEvent;
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
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
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    params: { eventid: event.id },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}
