const socket = io();

socket.on('connect', function() {
    console.log('Connected to server!');
}).on('infoUpdate', function(resp) {
    console.log(resp)
    // got access { error: 'Access denied' } apparently couldn't get any data but this should update the property
    app.stats = resp.data
})


let app = new Vue({
    el: '#app',
    data: {
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
            if (this.stats != null) {
                return Object.keys(this.stats.deviceStats).map(key => this.stats.deviceStats[key])
            }
            return []
        },
        countriesStats () {
            if (this.stats != null) {
                return Object.keys(this.stats.countryStats).map(key => {return {title: key, count: this.stats.countryStats[key]}})
            }
            return []
        }
    },
    methods: {
        getChartData (data, title) {
            return {
                chart: {
                    type: 'column'
                },
                title: {
                    text: title
                },
                xAxis: {
                    type: 'Device',
                    categories: data.map(d => d.title),
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
                        "name": '',
                        "colorByPoint": true,
                        "data": data.map(d => [ d.title, d.count]) 
                    }
                ]
            }
        }
    },
    watch: {
        stats: {
            handler: function(val, oldVal) {
                if (val != null) {
                    Highcharts.chart('devices-container', this.getChartData(this.devicesStats))
                    Highcharts.chart('countries-container', this.getChartData(this.countriesStats))
                }
            },
            deep: true
        }
    }, 
    mounted: function () {
        if (this.stats != null) {
            Highcharts.chart('devices-container', this.getChartData(this.devicesStats))
            Highcharts.chart('countries-container', this.getChartData(this.countriesStats))
        }
    }
})

