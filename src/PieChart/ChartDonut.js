//Below code thought inspiration was from intex site author: Adrien Miquel.
import React, { useEffect, useState } from 'react';
import {arc, pie} from 'd3-shape';
import * as d3 from 'd3';
import axios from 'axios';

function ChartDonut() {
    var colorList=['#3FCD56',
    '#DF3384',
    '#C632EB',
    '#FD6319',
    '#ED3A39',
    '#DF3D56',
    '#CDC319'];
    var title = [];
    var dataPie = {};
    var valueData = [];
    
    function budget(){
    axios.get('http://localhost:3000/data.json')
    .then(function(res){
        for(var i=0; i<res.data.myBudget.length; i++){
            dataPie[res.data.myBudget[i].title]=res.data.myBudget[i].budget;
            valueData[i]=res.data.myBudget[i].budget;
            title[i]= res.data.myBudget[i].title; 
        }
      createD3JS(dataPie);
    });
    }
  
    function createD3JS(dataPie){
  
      const width = 400;
      const height = 400;
      const margin = 80;
      const radius = Math.min(width, height) / 2 - margin;
  
      const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
      const color = d3.scale.ordinal()
        .domain([title])
        .range(colorList);
  
      const Pie = pie()
        .sort(null)
        .value((d) => d.value);
  
      const data = Pie(d3.entries(dataPie));
  
      const arcPie = arc()
        .innerRadius(radius * 0)
        .outerRadius(radius * 0.8)
  
      const outerArc = arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.8)
  
      svg
        .selectAll('allSlices')
        .data(data)
        .enter()
        .append('path')
        .attr('d', arcPie)
        .attr('fill',(d) => (color(d.data.key)))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)
  
      svg
        .selectAll('allPolyLines')
        .data(data)
        .enter()
        .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', (d)=> {
        var posA = arcPie.centroid(d)
        var posB = outerArc.centroid(d)
        var posC = outerArc.centroid(d);
        var midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        posC[0] = radius * 0.97 * (midAngle < Math.PI ? 1 : -1);
        return [posA, posB, posC]
        });
  
      svg
        .selectAll('allLabels')
        .data(data)
        .enter()
        .append('text')
        .text( (d) => { return (d.data.key + " " + d.data.value  ) } )
        .attr('transform', (d) => {
            var pos = outerArc.centroid(d);
            var midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 1.1 * (midAngle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', (d) => {
            var midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midAngle < Math.PI ? 'start' : 'end')
        })
    }
    
    useEffect(budget, []);
  return (
      <div>
          <span id="chart"></span>
      </div>
  );
}

export default ChartDonut;