const fs = require('fs');
const d3 = require("d3");
const faker = require('faker');
const path = require('path');
//const jwt = require('jsonwebtoken');
const { JWT, JWK } = require('jose');
const lodash = require("lodash");
//const queryString = require('query-string');
//const dayjs = require('dayjs');

//const Tree = require('tui-tree');
//const Chart = require('chart.js');
//const recharts = require('recharts');
//const { JSDOM } = require('jsdom');


main();

function main() {
  //url_test();
  //apply_test();
  //dayjs_test();  
  //jwt_req();
  //jose_test();
  //jwt_test();
  //faker_test();
  //dft_test();  
  //jsdom_test();
  //chartsjs_test();
  //d3_test();
}

function url_test() {
  const originalUrl = new URL(
    '/candidacies?sort=id&count=20&include=appointment&offset=5',
    `http://$localhost:3000`
  );

  //console.log(originalUrl);
  console.log(originalUrl.searchParams);
  originalUrl.searchParams.set('offset', 10);
  console.log(originalUrl.searchParams);
  console.log(originalUrl.toString());
  //console.log('hello');
}

function apply_test() {

  const positions = [
    { end: '2019-10-01' },
    { end: '2018-01-01' },
    { end: '2020-02-02' },
    { end: '' }
  ];

  const res2 = positions.reduce((lastPos, currentPos) => {
    const dayjsPos = {
      ...currentPos,
      endDate: currentPos.end ? dayjs(currentPos.end) : dayjs()
    }
    if (!lastPos) {
      return dayjsPos;
    }
    return dayjsPos.endDate.isAfter(lastPos.endDate) ? dayjsPos : lastPos;
  }, null);

  console.log(res2);
}

function dayjs_test() {
  const persons = [
    {
      positions: [
        {
          id: 1,
          role: 'Executive',
          start: '2000-09-03',
          end: '2000-09-04'
        }
      ]
    },
    {
      positions: [
        {
          id: 2,
          role: 'Assistant',
          start: '2020-06-01',
          end: ''
        }
      ]
    },
    {
      positions: [
        {
          id: 3,
          role: 'Manager',
          start: '2019-11-03',
          end: '2019-12-03'
        }
      ]
    },
    {
      positions: [
        {
          id: 4,
          role: 'Representative',
          start: '2010-01-04',
          end: '2010-01-08'
        }
      ]
    },
    {
      positions: [
        {
          id: 5,
          role: 'Manager',
          start: '1990-05-03',
          end: '2020-09-01'
        }
      ]
    },
    {
      positions: [
        {
          id: 6,
          role: 'Agent',
          start: '1980-09-04',
          end: '2020-09-01'
        }
      ]
    }
  ];

  //console.log(dayjs('2020-09-01').diff('1980-09-04', 'months', true));
  //return;

  const td = persons.map(person => {
    const position = person.positions[0];
    return (position.end ? dayjs(position.end) : dayjs()).diff(
      position.start,
      'months',
      true
    ) / 12;
  });

  console.log(td);
}

function jwt_req() {
  const token = '';

  const url = queryString.stringifyUrl({url: 'https://foo.bar', query: { token }});
  console.log(url);
}

function jose_test() {
  const secret = 'my-secret-string';
  //const secret = '';
  //const secret = undefined;
  const key = JWK.asKey(secret);
  const payload = {
    role: 'admin'
  };

  console.log(key.algorithms('sign'));

  // signing a new jwt
  const token = JWT.sign(payload, key);
  //const tokenHS256 = JWT.sign(payload, key, { algorithm: 'HS256' });
  //const tokenHS256 = JWT.sign(payload, key, { algorithm: 'lkjdsa' });
  //console.log(token.localeCompare(tokenHS256));
  //console.log(token);
  //console.log(tokenHS256);
  return;

  // verifying the token
  const badToken = '';
  let res;

  try {
    res = JWT.verify(token, key);
    console.log('good key!!');
    console.log(res);
  } catch(err) {
    console.log('bad key!!');
  }

  try {
    res = JWT.verify(badToken, key);
    console.log('good key!!');
    console.log(res);
  } catch(err) {
    console.log('bad key!!');
  }
}

function jwt_test() {


  const tt = jwt.decode('', 'test');
  console.log(tt);
  return;

  const secret = 'sh';

  const token = jwt.sign({
    name: 'jim'
  }, secret);

  // header.payload.signature
  const tmp = jwt.verify(token, secret);
  const decoded = jwt.decode(token);
  console.log(decoded);
}

function faker_test() {
  console.log(faker.random.number());
  //console.log(faker.random.number(10));
}

function jsdom_test() {
  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

  // now you can do DOM operations
  const document = dom.window.document;
  const pElement = document.querySelector('p');

  const googleChartsDom = new JSDOM(`
  <body>
    <div id="chart_div"></div>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
     google.charts.load('current', {'packages':['corechart']});
     google.charts.setOnLoadCallback(drawChart);
     function drawChart() {
         var data = new google.visualization.DataTable();
         data.addColumn('string', 'Topping');
         data.addColumn('number', 'Slices');
         data.addRows([
             ['Mushrooms', 3],
             ['Onions', 1],
             ['Olives', 1],
             ['Zucchini', 1],
             ['Pepperoni', 2]
         ]);
         var options = {
             'title':'How Much Pizza I Ate Last Night',
             'width':400,
             'height':300
         };
         var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
         chart.draw(data, options);
     }
    </script>
  </body>`, {
    runScripts: "dangerously",
    resources: "usable"
  });
  const chartDiv = googleChartsDom.window.document.querySelector('#chart_div');
  // TODO figure out how to wait for "ready"
  setTimeout(() => {
    const svgElement = chartDiv.querySelector('svg');
    fs.writeFileSync('out.svg', svgElement.outerHTML);
  }, 1000);

  // get the svg somehow
  // return svg/image
}

function chartsjs_test() {
  //console.log(Chart);
}

function tui_test() {
  //console.log(Tree);
}

function d3_test() {
  console.log(d3.version);
}

function dft_test() {

  const y = 10;
  
  function mfun(x = y) {
    console.log(x);
  }

  mfun();
}
