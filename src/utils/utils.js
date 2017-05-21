const fn = {
    formatDate: function (date) {
        return date.split("T")[0].replace(/-/gm, ".")
    }
}

export default fn;