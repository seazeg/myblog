const fn = {
    formatDate: function (date) {
        return date.split("T")[0].replace(/-/gm, ".")
    },
    backTop: function () {
        this.jquery("html,body").animate({
            scrollTop: 0
        }, 300);
    },
    formatDateTime: function (date) {
        if (!!date && typeof date == "object") {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            var minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':00';
        } else {
            return date;
        }
    }
}

export default fn;