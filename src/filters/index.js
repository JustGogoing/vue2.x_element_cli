import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('timeAgo', function(dateTimeStamp) {
	if (dateTimeStamp == undefined) {
		return "";
	} else {
		return dayjs(dateTimeStamp).format("YYYY-MM-DD HH:mm")
	}
});

