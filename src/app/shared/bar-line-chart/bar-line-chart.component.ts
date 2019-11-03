import { Component, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Transition from 'd3-transition';
import * as d3Ease from 'd3-ease';
import * as d3ScaleChromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-bar-line-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-line-chart.component.html',
  styleUrls: ['./bar-line-chart.component.scss']
})
export class BarLineChartComponent {

  @Input() elementId: String;
  @Input() chartTitle: any;
  @ViewChild('container', { static: true }) container: ElementRef;
  is_loading = true;
  private _chartData: any;
  get chartData(): any {
    return this._chartData;
  }

  @Input('chartData')
  set chartData(val: any) {
    this._chartData = val;

    if (!!this.chartData) {
      this.is_loading = false;
      setTimeout(() => {
        if(this.svg){
          this.resetSvg();
        }
        this.initSvg();
        this.drawAxis();
        this.drawBars();
        this.drawLine();
      }, 100);
    }
  }

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private svg: any;
  private g: any;
  private bar: any;
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  greyColor = "#898989";
  barColor = d3ScaleChromatic.interpolateInferno(0.8);
  highlightColor = d3ScaleChromatic.interpolateInferno(0.9);

  constructor() { }

  resetSvg() {
    this.svg.remove();
  }

  initSvg() {
    this.svg = d3.select(`svg#${this.elementId}`)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }


  private drawAxis() {
    this.width = this.container.nativeElement.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.container.nativeElement.offsetHeight - this.margin.top - this.margin.bottom;

    this.x = d3Scale.scaleBand()
              .range([0, this.width])
              .padding(0.4)
              .domain(this.chartData.map(d => { return `${d.year}` }));

    this.y = d3Scale.scaleLinear()
              .range([this.height, 0])
              .domain([0, Math.max(...this.chartData.map((d) => d.value))]);;

    this.g = this.svg.append("g");

    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.g.append('g')
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

  drawBars() {
    this.bar =  this.g.selectAll("rect")
                  .data(this.chartData)
                  .enter().append("g");

    this.bar.append("rect")
      .attr("class", "bar")
      .style("display", d => { return d.value === null ? "none" : null; })
      .style("fill", d => {
        return d.value === d3Array.extent(this.chartData, d => { return d.value; })
          ? this.highlightColor : this.barColor
      })
      .attr("x", d => this.x(d.year))
      .attr("width", this.x.bandwidth())
      .attr("y", d => { return this.height; })
      .attr("height", 0)
      .transition()
      .duration(750)
      .delay((d, i) => i * 150)
      .attr("y", d =>  this.y(d.value))
      .attr("height", d => this.height - this.y(d.value));

    this.svg.selectAll(".label")
      .data(this.chartData)
      .enter()
      .append("text")
      .attr("class", "bar-line-label")
      .style("display", d => { return d.value === null ? "none" : null; })
      .attr("x", (d => { return this.x(d.year) + (this.x.bandwidth() / 2) - 8; }))
      .style("fill", d => {
        return d.value === d3Array.extent(this.chartData, d => { return d.value; })
          ? this.highlightColor : this.greyColor
      })
      .attr("y", () =>  this.height)
      .attr("height", 0)
      .transition()
      .duration(750)
      .delay((d, i) =>  i * 150)
      .text(d => d.value)
      .attr("y", (d) => this.y(d.value) + .1)
      .attr("dx", "-.5em")
      .attr("dy", "-.7em")
  }

  drawLine() {
    let line = d3Shape.line()
      .x((d: any) => this.x(d.year) + this.x.bandwidth() / 2)
      .y((d: any) => this.y(d.value / 2))
      .curve(d3Shape.curveMonotoneX);

    this.bar.append("path")
      .attr("class", "line") // Assign a class for styling
      .attr("d", line(this.chartData))

      d3Transition.transition().select(`.line`)
      .transition()
      .duration(2000)
      .ease(d3Ease.easeLinear)
      .attr("stroke-dashoffset", 0);

    this.bar.append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", (d, i) =>  this.x(d.year) + this.x.bandwidth() / 2)
      .attr("cy", (d) =>  this.y(d.value / 2))
      .attr("r", 5);

  }

}
