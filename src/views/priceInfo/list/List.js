export default {
    name: 'list',
    created: function () {},
    data() {
        return {
            loading: false,
            tableData: Array,
            pageShow: false,
            activeName: '1',
            tableData: [{
                    payment: '0.00-50',
                    price: '7',
                    payment2: '2000.01-2200',
                    price2: '29',
                },
                {
                    payment: '50.01-150',
                    price: '8',
                    payment2: '2200.01-2400',
                    price2: '32',
                },
                {
                    payment: '150.01-250',
                    price: '9',
                    payment2: '2400.01-2600',
                    price2: '35',
                },
                {
                    payment: '250.01-350',
                    price: '10',
                    payment2: '2600.01-2800',
                    price2: '38',
                },
                {
                    payment: '350.01-450',
                    price: '11',
                    payment2: '2800.01-3000',
                    price2: '41',
                },
                {
                    payment: '450.01-550',
                    price: '12',
                    payment2: '3000.01-3200',
                    price2: '44',
                },
                {
                    payment: '550.01-650',
                    price: '13',
                    payment2: '3200.01-3400',
                    price2: '47',
                },
                {
                    payment: '650.01-750',
                    price: '14',
                    payment2: '3400.01-3600',
                    price2: '50',
                }, {
                    payment: '750.01-850',
                    price: '15',
                    payment2: '3600.01-3800',
                    price2: '53',
                }, {
                    payment: '850.01-1000',
                    price: '16',
                    payment2: '3800.01-4000',
                    price2: '56',
                }, {
                    payment: '1000.01-1200',
                    price: '18',
                    payment2: '4000.01-4200',
                    price2: '59',
                }, {
                    payment: '1200.01-1400',
                    price: '20',
                    payment2: '4200.01-4400',
                    price2: '62',
                }, {
                    payment: '1400.01-1600',
                    price: '22',
                    payment2: '4400.01-4600',
                    price2: '65',
                }, {
                    payment: '1600.01-1800',
                    price: '24',
                    payment2: '4600.01-4800',
                    price2: '68',
                }, {
                    payment: '1800.01-2000',
                    price: '26',
                    payment2: '4800.01-5000',
                    price2: '71',
                }
            ],

            tableData2: [{
                    payment: '0.00-50',
                    price: '7',
                    payment2: '2000.01-2200',
                    price2: '29',
                },
                {
                    payment: '50.01-150',
                    price: '8',
                    payment2: '2200.01-2400',
                    price2: '32',
                },
                {
                    payment: '150.01-250',
                    price: '9',
                    payment2: '2400.01-2600',
                    price2: '35',
                },
                {
                    payment: '250.01-350',
                    price: '10',
                    payment2: '2600.01-2800',
                    price2: '38',
                },
                {
                    payment: '350.01-450',
                    price: '11',
                    payment2: '2800.01-3000',
                    price2: '41',
                },
                {
                    payment: '450.01-550',
                    price: '12',
                    payment2: '3000.01-3200',
                    price2: '44',
                },
                {
                    payment: '550.01-650',
                    price: '13',
                    payment2: '3200.01-3400',
                    price2: '47',
                },
                {
                    payment: '650.01-750',
                    price: '14',
                    payment2: '3400.01-3600',
                    price2: '50',
                }, {
                    payment: '750.01-850',
                    price: '15',
                    payment2: '3600.01-3800',
                    price2: '53',
                }, {
                    payment: '850.01-1000',
                    price: '16',
                    payment2: '3800.01-4000',
                    price2: '56',
                }, {
                    payment: '1000.01-1200',
                    price: '18',
                    payment2: '4000.01-4200',
                    price2: '59',
                }, {
                    payment: '1200.01-1400',
                    price: '20',
                    payment2: '4200.01-4400',
                    price2: '62',
                }, {
                    payment: '1400.01-1600',
                    price: '22',
                    payment2: '4400.01-4600',
                    price2: '65',
                }, {
                    payment: '1600.01-1800',
                    price: '24',
                    payment2: '4600.01-4800',
                    price2: '68',
                }, {
                    payment: '1800.01-2000',
                    price: '26',
                    payment2: '4800.01-5000',
                    price2: '71',
                }
            ],

        }
    },
    methods: {
        handleClick() {

        },

    },
}