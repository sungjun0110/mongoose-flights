const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        // AAU, I want to view the list of flights by departure date in ascending order.
        if (flights.length > 1) flights.sort((flightA, flightB) => flightA.departs <= flightB.departs? -1 : 1);

        res.render('flights/index', {
            title: 'Flight List',
            flights,
        })
    })
}

function newFlight(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', {
        title: "Add a New Flight",
        departsDate,
    })
}

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function(err) {
        console.log(err);
        if (err) return res.redirect('/flights/new');
        res.redirect('/flights');
    })
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            if (flight.destinations.length > 1) {
                flight.destinations.sort((destA, destB) => destA.arrival <= destB.arrival ? -1 : 1);
            }
            let airports = ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'];
            flight.destinations.forEach(dest => airports = airports.filter(airport => airport !== dest.airport && airport !== flight.airport));
            res.render('flights/show', {title: 'Flight Detail', flight, airports, tickets});
        })
    });
}