var app = new Vue({
    el: '#app',
    data: {
        week: {
            days: [] // turn to object containing array
        }
    },
    computed: {

    },
    created: function () {
        this.createTable();
    },
    methods: {
        async deleteWeek() {
            try {
                axios.delete("/api/week");
                this.week.days = [];
                this.createTable();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async saveWeek() {
            try {
                await axios.post('/api/week', this.week);
            } catch (error) {
                console.log(error);
            }
        },
        async getWeek() {
            try {
                let response = await axios.get("/api/week");
                console.log(response.data[0].days);
                Vue.set(app.week, 'days', response.data[0].days);

                return true;
            } catch (error) {
                console.log(error);
            }
        },
        toggleSelected(time) {
            time.isSelected = !time.isSelected;
        },
        toggleDay(day) {
            this.week.days[day].isSelected = !this.week.days[day].isSelected;
            for (i in this.week.days[day].hours) {
                this.week.days[day].hours[i].isSelected = this.week.days[day].isSelected;
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
                this.week.days.push({
                    hours: newTimes,
                    isSelected: false
                })
            }
        },
    }
})