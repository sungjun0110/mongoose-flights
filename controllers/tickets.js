const Ticket = require('../models/ticket');

module.exports = {
    create,
    new: newTicket,
    delete: deleteTicket,
}

function newTicket(req, res) {
    Ticket.find({}, function (err, tickets) {
        res.render('tickets/new', {
            title: 'Add a Ticket',
            flightId: req.params.flightId,
            tickets,
        })
    })
}

function create(req, res) {
    Ticket.create(req.body, function(err, ticket) {
        ticket.flight = req.params.flightId;
        ticket.save(function(err){
            console.log(ticket)
            res.redirect(`/flights/${req.params.flightId}`);
        })
    });
}

function deleteTicket(req, res) {
    Ticket.findByIdAndDelete(req.params.id, function(err, ticket) {
        res.redirect('back')
    });
}