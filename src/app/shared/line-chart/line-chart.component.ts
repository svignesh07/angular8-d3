import { Component, ViewEncapsulation, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Interpolate from 'd3-interpolate';
import * as d3Transition from 'd3-transition';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-line-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() elementId: String;
  @Input() chartTitle: any;
  @Input() chartData: any;
  @ViewChild('container', { static: true }) container: ElementRef;
  is_loading = true;

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private area;

  DURATION = 1500;
  DELAY = 500;

  startData: any; // Initial Data for the Transition

  constructor() { }

  ngOnInit() {
    if (!!this.chartData) {
      this.is_loading = false;
      this.startData = this.chartData.map(( datum ) => {
        return {
          date  : datum.date,
          value : Math.min(...this.chartData.map((d) => d.value))
        };
      });

      setTimeout(() => {
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine();
        this.drawArea();
      }, 100);
    }
  }

  private initSvg() {
    this.svg = d3.select(`svg#${this.elementId}`)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    this.width = this.container.nativeElement.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.container.nativeElement.offsetHeight - this.margin.top - this.margin.bottom;
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.chartData, (d) => d.date));
    this.y.domain(d3Array.extent(this.chartData, (d) => d.value));
  }

  private drawAxis() {

    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.75em')
      .style('text-anchor', 'end')
      .text('Price ($)');
  }


  private drawArea() {
    this.area = d3Shape.area()
      .x((d) => { return this.x(d.date) })
      .y0(this.height)
      .y1((d) => { return this.y(d.value); });

    this.svg.append('path')
      .datum(this.startData)
      .attr('class', 'lineChart--area')
      .attr('d', this.area);

      d3Transition.transition().select(`svg#${this.elementId} .lineChart--area`)
      .transition()
      .duration(this.DURATION)
      .delay(this.DURATION / 2)
      .attrTween('d', this.tween(this.chartData, this.area));
  }

  private drawLine() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

    this.svg.append('path')
      .datum(this.startData)
      .attr('class', 'lineChart--areaLine')
      .attr('d', this.line);

      d3Transition.transition().select(`svg#${this.elementId} .lineChart--areaLine`)
      .transition()
      .duration(this.DURATION)
      .delay(this.DURATION)
      .attrTween('d', this.tween(this.chartData, this.line))
      .on("end", () => {
        this.drawCircles();
      });


  }

  private drawCircles() {
    this.svg.append('g');
    this.chartData.forEach(( datum, index) => {
      this.drawCircle( datum, index );
    } );

  }

  private drawCircle( datum, index ) {
    this.svg.selectAll(".dot")
      .data(this.chartData)
      .enter().append("circle") // Uses the enter().append() method
      .attr("class", "dot lineChart--circle") // Assign a class for styling
      .attr("cx", (d, i) => {
        return this.x(d.date);
      })
      .attr("cy", (d) => {
        return this.y(d.value);
      })
      .attr("r", 5)
      .on("mouseenter touchstart", (d, i, nodes) => {
        d3.select(nodes[i])
          .attr('class', 'lineChart--circle lineChart--circle--highlighted')
          .attr('r', 7);
        this.showCircleDetail(d);
      })
      .on("mouseout touchstop", (d, i, nodes) => {
        d3.select(nodes[i])
          .attr(
            'class',
            'lineChart--circle'
          )
          .attr('r', 6);
        this.hideCircleDetails();
      })
      .transition()
      .delay( this.DURATION / 10 * index )
      .attr( 'r', 6 );
  }

  private tween(b, callback) {
    return (a) => {
      var i = d3Interpolate.interpolateArray(a, b);
      return (t) => callback(i(t));
    };
  }

  private hideCircleDetails() {
    d3.selectAll('.lineChart--bubble').remove();
  }

  private showCircleDetail(data) {
    var details = d3.select(`svg#${this.elementId}`).append('g')
      .attr('class', 'lineChart--bubble')
      .attr(
        'transform', () => {
          var result = 'translate(';
          result += this.x(data.date);
          result += ', ';
          result += this.y(data.value);
          result += ')';
          return result;
        });

    details.append('rect')
      .attr("fill", "#222")
      .attr('width', 75)
      .attr('height', 60)
      .attr('rx', 10)
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    var text = details.append('text')
      .attr('class', 'lineChart--bubble--text');

    text.append('tspan')
      .attr('class', 'lineChart--bubble--label')
      .attr('x', this.margin.left + 10)
      .attr('y', this.margin.top + 20)
      .text(data.label);

    text.append('tspan')
      .attr('class', 'lineChart--bubble--value')
      .attr('x', this.margin.left + 10)
      .attr('y', this.margin.top + 50)
      .text(data.value);
  }

}
