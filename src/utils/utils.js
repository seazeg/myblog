const fn = {
    formatDate: function (date) {
        return date.split("T")[0].replace(/-/gm, ".")
    },
    backTop: function () {
        this.jquery("html,body").animate({
            scrollTop: 0
        }, 300);
    }
}

export default fn;