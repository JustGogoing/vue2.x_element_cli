import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('timeAgo', function(dateTimeStamp) {
	if (dateTimeStamp == undefined) {
		return "";
	} else {
		return dayjs(dateTimeStamp).format("YYYY-MM-DD HH:mm")
	}
});

Vue.filter('role', function(role) {
	role = parseInt(role)
	switch (role) {
		case 1:
			return "管理员";
		default:
			return "管理员";
	}
});


Vue.filter('upLoadSrc', function(src) {
	return process.env.VUE_APP_IMAGE + src
});

