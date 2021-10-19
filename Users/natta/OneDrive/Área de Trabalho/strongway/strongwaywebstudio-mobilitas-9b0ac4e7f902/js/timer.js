(function($){
	Vue.component('vue-timer', {
        data: function() {
            return{
                current_time: {
                    unix: new Date().getTime()
                },
                target_time: {
                    unix: new Date(this.end_promotion +'T00:00:00-03:00').getTime() + 86400000 // + 1 dia
                },
            }
        },
        props: {
    		end_promotion: this.end_promotion,
    		timer_id: this.timer_id
        },
        computed: {
            remaining_time: function () {
                remaining_time = {};

                difference = new Date(this.target_time.unix - this.current_time.unix);

                remaining_time.unix = difference.getTime();
                remaining_time.days = remaining_time.unix / 1000 / 60 / 60 / 24;
                remaining_time.hours = (remaining_time.days - parseInt(remaining_time.days)) * 24;
                remaining_time.minutes = (remaining_time.hours - parseInt(remaining_time.hours)) * 60;
                remaining_time.seconds = (remaining_time.minutes - parseInt(remaining_time.minutes)) * 60;

                remaining_time.days = parseInt(remaining_time.days);
                remaining_time.hours = parseInt(remaining_time.hours);
                remaining_time.minutes = parseInt(remaining_time.minutes);
                remaining_time.seconds = parseInt(remaining_time.seconds);
                
                return remaining_time;
            }
        },
        methods: {
            updateCurrentTime: function () {
                var self = this;

                // Atualiza o tempo atual cada segundo
                g.actions['interval-'+this.id] = setInterval( function () {
                    self.current_time.unix = new Date().getTime();
                }, 1000);
            }
        },
        mounted: function () {
            this.updateCurrentTime();
            $('.showcase').adjustHeights({
                selector: '.product__info-inner'
            });
        },
        template: '#vue-timer-template'
    })
})(jQuery);