let data = Highcharts.geojson(Highcharts.maps['cn/china']);

let provinces = {};
Highcharts.each(data, function (d) {
    provinces[d.name] = d;
    d.drilldown = d.name;
    d.value = 0;
    d.cities = {};
    d.people = [];
});

//data数据处理
for (let s of students) {
    provinces[s.province].value++;
    provinces[s.province].people.push(s)
}

for (let p of Object.values(provinces)) {
    let filename = p.properties.filename;
    if (!Highcharts.maps[`cn/${filename}`]) {
        continue;
    }
    let subData = p.subData = Highcharts.geojson(Highcharts.maps[`cn/${filename}`]);
    Highcharts.each(subData, function (city) {
        p.cities[city.name] = city;
        city.value = 0;
        city.people = [];
    });
    for (let s of students) {
        if (p.cities[s.city] !== undefined) {
            p.cities[s.city].value++;
            p.cities[s.city].people.push(s);
        }
    }
}
// 初始化图表
let map = new Highcharts.Map('map', {
chart: {
    events: {
        //下钻
        drilldown: function (e) {
            let name = e.point.name;
            this.setTitle(null, {text: name});
            for( var its of document.getElementsByClassName("icon")){
                its.style.opacity="0";
                setTimeout('its.style.display="none"',500);
            }
        },
        drillup: function () {
            data = Highcharts.maps['cn/china'];
            this.setTitle(null, {
                text: '中国',
                // fontSize:"150px"
            });
            for( var its of document.getElementsByClassName("icon")){
                its.style.display="";
                its.style.opacity="1";
                
            }
        }
    }
},

title: {
    text: '2023届35班蹭饭地图',
    style: {"color": "#333333", "fontSize": "36px",}
},

subtitle: {
    text: '中国',
    floating: true,
    y: 75,
    style: {
        fontSize: '26px'
    }
},

//悬浮信息窗口(提示工具)
tooltip: {
    useHTML: true,
    backgroundColor: '#357fee',
    // opacity:0.8,
    borderRadius: 40,
    padding: 10,
    style: {
        'color': '#dddddd',
        'cursor': 'default',
        'fontSize': '14px',
        'pointerEvents': 'none',
        'whiteSpace': 'nowrap'
    },
    formatter: formatter
},

//高亮颜色及下方数据带
colorAxis: {
    min: 0,
    max: 9,
    type: 'linear',
    minColor: '#ffffff',
    // maxColor: '#002ab5',
    stops: [
        [0, '#ffffff'],
        [0.2, '#a4d9ee'],
        [0.4, '#7ebaee'],
        [0.6, '#357fee'],
        [0.8, '#0c70ee'],
        [1, '#006cee']
    ]
},

series: [{
    data: data,
    name: '各省人数',
    joinBy: 'name',
    tooltip: {
        pointFormat: `{point.name}: {point.value}`
    }
}],

drilldown:
    {
        activeDataLabelStyle: {
            color: '#f60067',
            textDecoration:
                'none',
            textShadow:
                '0 0 3px #f60067'
        }
        ,
        drillUpButton: {
            relativeTo: 'spacingBox',
            position:
                {
                    x: 0,
                    y: 60
                },
            style:{
                font:"bolder 50px"
            }
        },
        series: makeSeries()
    },
//地图缩放
mapNavigation: {
    enabled: false,
    buttonOptions:
        {
            verticalAlign: 'bottom'
        }
}
});

function makeSeries() {
    let series = [];
    for (let p of Object.values(provinces)) {
        if (p.subData) {
            series.push({
                id: p.name,
                name: p.name,
                data: p.subData,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            })
        }
    }
    return series;
}

function formatter() {
    let template = `
    <div class="tooltip">
        <div class="series">{{series}}</div>
        <div class="profile">
            <div class="name">{{name}}:</div>
            <div class="value">{{value}}人</div>
        </div>
        <div class="list">
            {% for p in people %}
            <div class="pinfo">
                <div class="pname">{{p.name}}</div>
                <div class="city">{{p.city}}</div>
                <div class="school">{{p.school}}</div>
            </div>
            {% endfor %}
        </div>
    </div>
    `;

    return nunjucks.renderString(template, {
        name: this.point.name,
        series: this.series.name,
        value: this.point.value,
        people: this.point.people
    })
}