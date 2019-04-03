export default {
    install(Vue, options) {
        Vue.prototype.timeDate = function (format) {
            let time = parseInt(format.length == 13 ? format : format * 1000)
            var date = new Date(time),
                Y = date.getFullYear() + '-',
                M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
                D = date.getDate() + ' ',
                h = date.getHours() + ':',
                m = date.getMinutes() + ':',
                s = date.getSeconds()
            return Y + M + D + h + m + s
        }
    }
}