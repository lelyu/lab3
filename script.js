// credit: my group partner Peiyu Zhong for the bar chart 


d3.csv('cities.csv', d3.autoType).then(data => {
	let filtered = data.filter(e => e.eu === true);
	console.log('cities', filtered);
	scatterplot(filtered);
})





function scatterplot(data) {
	d3.select('.city-count').text("Number of Cities: 28");
	const width = 700;
	const height = 550;
	const svg = d3.select('.population-plot')
		.append('svg')
		.attr('width', width)
		.attr('height', height)
	svg
		.selectAll()
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', (data, index) => data.x)
		.attr('cy', (data, index) => data.y)
		.attr('r', function (data, index) {
			if (data.population > 1000000) {
				return 8;
			}
			else {
				return 4;
			}
		})
		.style('fill', 'lightblue');
	svg
		.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.attr("x", (data, index) => data.x)
		.attr("y", (data, index) => data.y - 20)
		.attr("opacity", function (data) {
			if (data.population > 1000000) {
				return 1;
			}
			else {
				return 0;
			}
		})
		.text(d => d.city)
		.style("font-size", 11)
		.style("text-anchor", "middle");


}



d3.csv('buildings.csv', d3.autoType).then(data => {
	data.sort((a, b) => b.height_ft - a.height_ft);
	console.log('buildings', data);
	barchart(data);
})


function barchart(data) {
	const width = 500;
	const height = 500;
	const margin = { top: 20, right: 30, bottom: 20, left: 180 };
	const plotHeight = height - margin.top - margin.bottom;

	const svg = d3
		.select(".building-height")
		.append('svg')
		.attr("width", width)
		.attr('height', height);

	const yScale = d3
		.scaleBand()
		.domain(data.map(data => data.building))
		.range([0, plotHeight])
		.padding(0.1);

	const g = svg
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	const yAxis = d3.axisLeft(yScale);

	g
		.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('y', data => yScale(data.building))
		.attr('width', data => data.height_px)
		.style('fill', 'lightblue')
		.attr('height', yScale.bandwidth());


	g.selectAll("text")
		.data(data)
		.enter()
		.append('text')
		.attr("text-anchor", "end")
		.text(data => data.height_ft + 'ft')
		.attr('x', data => data.height_px - 12)
		.attr('y', data => yScale(data.building) + 25);



	yAxis(g.append('g'));


	g.selectAll('.bar')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.on("click", function (event, d) {// event is passed first from D3
			// Do something after clicking a bar
			d3.select(".image")
		});

}

