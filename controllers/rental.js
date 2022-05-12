var Zillow  = require('node-zillow'),
    zillow = new Zillow('X1-ZWz1iqtylr7bij_34dhf');

var request = require('request');
var parser = require('xml2json');

var axios = require('axios');

exports.rentalsSearchListing = function (req, res) {
  console.log('rentalsSearchListing: ', req.body);
  
  // zillow.get('GetZestimate', {
  //   zpid: 1111111
  // })
  // .then(function(results) {
  //   console.log('ahahaha');
  //   res.json({
  //     results
  //   });
  // });
  // request('http://www.zillow.com/webservice/ProReviews.htm?zws-id=' + 'X1-ZWz1iqtylr7bij_34dhf&screenname=', function(error, response, body) {
    //  request('http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=' + 'X1-ZWz1iqvpqqt2q3_4dboj' + '&state=' + 'ON' + '&city=' + 'Waterloo', function(error, response, body) {
    //   res.send(body);
    //         if (!error && response.statusCode == 200) {
    //             // let jsonarray = parser.toJson(body);
    //             // let object = JSON.parse(jsonarray);
    //             // console.log(object["RegionChildren:regionchildren"].response.list.region)
                
    //             res.send(body);
    //         }
    //     })

    // const payload = {
    //   api_key: 'f4b5d8662774418f61db9780880ad80f903c770d',
    //   url: 'https://www.zillow.com/homes/Redwood-City,-CA_rb/',
    //   real_browser: true,
    //   merge_loops: true,
    //   premium_proxy: 'de',
    //   scenario: [
    //     {
    //       loop: [
    //         { wait_for: '.search-pagination a[rel=next]' },
    //         { execute_js: 'var articles = document.querySelectorAll("article")'},
    //         { execute_js: 'articles[Math.round(articles.length/4)].scrollIntoView({behavior: "smooth"})'},
    //         { wait: 1 },
    //         { execute_js: 'articles[Math.round(articles.length/2)].scrollIntoView({behavior: "smooth"})'},
    //         { wait: 1 },
    //         { execute_js: 'articles[Math.round(articles.length/1.5)].scrollIntoView({behavior: "smooth"})'},
    //         { wait: 1 },
    //         { execute: 'parse'},
    //         { execute_js: 'var next = document.querySelector(".search-pagination a[rel=next]"); if(next){ next.click() }' }
    //       ],
    //     stop_condition: 'var next = document.querySelector(".search-pagination a[rel=next]"); next === null || next.getAttributeNames().includes("disabled")'
    //     }
    //   ],
    //   parse: {
    //     properties: [
    //       {
    //         _parent: 'article.list-card',
    //         price: '.list-card-price >> text',
    //         url: 'a >> href',
    //         bedrooms: 'ul.list-card-details li:nth-child(1) >> text',
    //         bathrooms: 'ul.list-card-details li:nth-child(2) >> text',
    //         living_area: 'ul.list-card-details li:nth-child(3) >> text',
    //         status: 'ul.list-card-details li:nth-child(4) >> text',
    //         address: 'a address.list-card-addr >> text'
    //       }
    //     ]
    //   }
    // };

    // axios.post(apiUrl, payload)
    //   .then((results) => {
    //     console.log('total: ', results.data.result.properties.length)
    //     res.json(results.data.result.properties)
    //   }).catch((err) => {
    //      res.send(err);
    //   });
    

  // res.json({
  //   msg: 'no data'
  // });
};