const socket = io();
// const Highcharts = Highcharts();
// socket.on('connect', function() {
//     console.log('Connected to server!');
// })

// socket.on('infoUpdate', function(data) {
//     console.log(data);
// })


new Vue({
    el: '#app',
    data: {
        message: 'Hello',
        stats: {
            deviceStats: { 
                jplPrinters: { title: 'Open JetDirect printers', count: 0 },
                lpdPrinters: { title: 'Open LPD printers', count: 0 },
                cupsPrinters: { title: 'Open CUPS printers', count: 0 },
                openPrinters: { title: 'Open printers (total)', count: 0 },
                openWebcams: { title: 'Open webcams (total)', count: 0 },
                expiredSSLCerts: { title: 'HTTPS Servers with expired certs', count: 5 },
                openSMBServers: { title: 'SMB servers with no authentication', count: 0 },
                openVNCServers: { title: 'VNC servers with no authentication', count: 0 },
                openRDPServers: { title: 'RDP servers with no authentication', count: 0 },
                vulnerableDevices: { title: 'Servers/Devices with general vulnerabilites', count: 24 } 
            },
            countryStats: { 
                'United States': 14,
                'Hong Kong': 2,
                Germany: 3,
                Australia: 1,
                'Russian Federation': 1,
                'Korea, Republic of': 1,
                Kazakhstan: 1,
                Netherlands: 2,
                Denmark: 1,
                Poland: 1,
                China: 1,
                Colombia: 1 
            }
        }
    },
    computed: {
        devicesStats () {
            return Object.keys(this.stats.deviceStats).map(key => this.stats.deviceStats[key])
        },
        countriesStats () {
            return Object.keys(this.stats.countryStats).map(key => {return {title: key, count: this.stats.countryStats[key]}})
        },
        devicesChartData () {
            return {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Vulnerable Devices'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    type: 'Device',
                    labels: {
                        rotation: -45
                    }
                },
                yAxis: {
                    title: {
                        text: 'Count'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                        }
                    }
                },
            
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
                },
            
                "series": [
                    {
                        "name": "Devices",
                        "colorByPoint": true,
                        "data": this.devicesStats.map(d => [ d.title, d.count]) 
                    }
                ]
            }
        },
        countriesChartData () {
            return {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Countries'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    type: 'Country',
                    labels: {
                        rotation: -45
                    }
                },
                yAxis: {
                    title: {
                        text: 'Count'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                        }
                    }
                },
            
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                },
            
                "series": [
                    {
                        "name": "Devices",
                        "colorByPoint": true,
                        "data": this.countriesStats.map(d => [ d.title, d.count])
                    }
                ]
            }
        }
    },
    asyncComputed: {
        // handly async calls here
    },
    created () {
        // 
        // This is where you want to trigger sockets ON 
        // you may move `stats` from data object and move 
        // it into asyncComputed propery of Vue object
        // where you can handle async calls 
        //
        // socket.on('connect', function() {
        //     console.log('Connected to server!');
        // })
        
        // socket.on('infoUpdate', function(data) {
        //     console.log(data);
        // })
    },
    mounted: function () {
        Highcharts.chart('devices-container', this.devicesChartData)
        Highcharts.chart('countries-container', this.countriesChartData)
    }
})

