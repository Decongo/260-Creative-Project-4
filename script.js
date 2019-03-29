var app = new Vue({
    el: '#app',
    data: {
        days: []
    },
    computed: {

    },
    created: function () {
        this.createTable();
    },
    methods: {
        toggleSelected(time) {
            time.isSelected = !time.isSelected;
        },
        toggleDay(day) {
            this.days[day].isSelected = !this.days[day].isSelected;
            for (i in this.days[day].times) {
                this.days[day].times[i].isSelected = this.days[day].isSelected;
            }
        },
        createTable() {
            for (let i = 0; i < 7; ++i) {
                let newTimes = [];
                for (let j = 6; j < 22; j++) {
                    newTimes.push({
                        hour: j,
                        isSelected: false
                    });
                }
                this.days.push({
                    times: newTimes,
                    isSelected: false
                })
            }
        },
    }
})