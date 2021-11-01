const router = require('express').Router();
const {User, Holding, Transaction} = require('../../models');

router.get('/', (req, res) => {
    Holding.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: Transaction
            }
        ]
    })
    .then(holdings => res.json(holdings))
    .catch(err => console.log(err));
});

router.get('/:symbol', (req, res) => {
    Holding.findAll({
        where: {
            user_id: req.session.user_id,
            symbol: req.params.symbol
        },
        include: [
            {
                model: Transaction
            }
        ]
    })
    .then(holdings => {
        if(holdings.length < 1){
            return res.status(404).json({message: 'No holdings found with this symbol.'});
        }
        return res.render('single-stock', {
            holdings: holdings.map(holding => holding.toJSON())
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json(err);
    });
});

// create a new holding
router.post('/', (req, res) => {
    // this will create a new holding if the user doesnt own that stock already
    // Holding.create({
    //     shares: req.body.shares,
    //     symbol: req.body.symbol,
    //     user_id: req.body.user_id
    //     // user_id: req.session.user_id
    // })
    // .then(holdings => {
    //     return res.json(holdings);
    // });

    const transactionType = req.body.type;

    if(transactionType === "buy"){
        Holding.increment({
            shares: req.body.quantity
        }, 
        {
            where: {
                symbol: req.body.symbol,
                user_id: req.session.user_id
            }
        })
    }

    if(transactionType === "sell"){
        Holding.increment({
            shares: -req.body.quantity
        }, 
        {
            where: {
                symbol: req.body.symbol,
                user_id: req.session.user_id
            }
        })
    }
})

module.exports = router;