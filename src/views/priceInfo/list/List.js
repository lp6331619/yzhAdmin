export default {
    name: 'list',
    created: function () {
    },
    data() {
        return {
            loading: false,
            tableData: Array,
            pageShow: false,
            tableData: [{
                payment: '0.00-50',
                price: '7',
                payment2: '750.01-850',
                price2: '15',
            },
            {
                payment: '50.01-150',
                price: '8',
                payment2: '850.01-1000',
                price2: '16',
            },
            {
                payment: '150.01-250',
                price: '9',
                payment2: '1000.01-100',
                price2: '18',
            },
            {
                payment: '250.01-350',
                price: '10',
                payment2: '1200.01-1400',
                price2: '20',
            },
            {
                payment: '350.01-450',
                price: '11',
                payment2: '1400.01-1600',
                price2: '22',
            },
            {
                payment: '450.01-550',
                price: '12',
                payment2: '1600.01-1800',
                price2: '24',
            },
            {
                payment: '550.01-650',
                price: '13',
                payment2: '1800.01-2000',
                price2: '26',
            },
            {
                payment: '650.01-750',
                price: '14',
                payment2: '',
                price2: '',
            }]

        }
    },
    methods: {

    },
}