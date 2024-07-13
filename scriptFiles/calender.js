
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Set the initial view to the month view
        events: [
            // Sample events (you can replace with your own data)
            {
                title: 'Meeting',
                start: '2023-09-15T10:00:00',
                end: '2023-09-15T12:00:00',
                backgroundColor: '#007BFF', // Event color
                borderColor: '#0056b3', // Event border color
                // Add more event properties as needed
            },
            {
                title: 'Assignment Due',
                start: '2023-09-20',
                allDay: true, // Full day event
                backgroundColor: '#e74c3c',
                borderColor: '#c0392b',
            },
            // Add more events as needed
        ],
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        eventClick: function(info) {
            // Handle event click (e.g., show event details)
            alert(`Event: ${info.event.title}\nStart: ${info.event.start}`);
        },
        selectable: true,
        select: function(info) {
            // Handle date selection (e.g., open a modal to add an event)
            alert(`Selected: ${info.startStr} to ${info.endStr}`);
        },
        editable: true, // Allow event dragging and resizing
        eventDrop: function(info) {
            // Handle event drag and drop (e.g., update event in database)
            alert(`Event dropped to: ${info.event.start}`);
        },
    });

    calendar.render();
});
