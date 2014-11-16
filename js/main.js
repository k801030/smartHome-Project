$(document).ready(function(){
	var pieLoader = new PieChartLoader("#pieChart");
	pieLoader.loadDefaultSet(pieChartDefault);
	pieLoader.loadValue([1,2,3]);
	pieLoader.draw();
	

	var barLoader = new BarChartLoader("#barChart");
	barLoader.loadDefaultSet(barChartDefault);
	//barLoader.loadValue([1,2,3]);
	barLoader.draw();

});


var ChartLoader = function(id){
	this.id = id;
	this.data = null;
	this.options = null;
	this.path = "json/";

	// load the default style of chart
	this.loadDefaultSet = function(pieChartDefault){
		/*
		filename = type+"-DefaultSet.json";
		$.getJSON(this.path+filename,function( data ){
			this.data = data;
		});
		*/
		//this.data = jQuery.parseJSON(json);
		this.data = pieChartDefault.data;
		this.options = pieChartDefault.options;
	};

	// load the chart options
	this.loadOptions = function(){

	}
	// load the useful value from sensor for chart
	this.loadValue = function(valueArray){
		for(var i=0; i<valueArray.length; i++){
			this.data[i].value = valueArray[i];
		}
	};
	
}

// extend from ChartLoader
var PieChartLoader = function(id){
	var pieChartLoader = new ChartLoader(id);

	pieChartLoader.draw = function(){
		var ctx = $(this.id).find("canvas").get(0).getContext("2d");
		var chart = new Chart(ctx).Pie(this.data, this.options);
		var labels = $(this.id).find("label");
		labels.append(this.loadLabel());
	}
	pieChartLoader.loadLabel = function(colors,labels){
		html = "<ul>";
		for(var i=0; i<this.data.length; i++)
			html += "<li><span style=\"background-color:" + this.data[i].color+ "\"></span> " + this.data[i].label + "</li>";
		html += "</ul>";
		return html;
	}

	return pieChartLoader;
}

// extend from ChartLoader
var BarChartLoader = function(id){
	var barChartLoader = new ChartLoader(id);

	barChartLoader.draw = function(){
		var ctx = $(this.id).find("canvas").get(0).getContext("2d");
		var chart = new Chart(ctx).Bar(this.data, this.options);
		var labels = $(this.id).find("label");
		labels.append(this.loadLabel());
	}
	barChartLoader.loadLabel = function(colors,labels){
		html = "<ul>";
		for(var i=0; i<this.data.datasets.length; i++)
			html += "<li><span style=\"background-color:" + this.data.datasets[i].fillColor+ "\"></span> " + this.data.datasets[i].label + "</li>";
		html += "</ul>";
		return html;
	}

	return barChartLoader;
}


var pieChartDefault = {
	data:
		[
			{
				value    : 10,
				color    : "#F7464A",
				highlight: "#FF5A5E",
				label    : "Red"
			},
			{
				value    : 0,
				color    : "#46BFBD",
				highlight: "#5AD3D1",
				label    : "Green"
		    },
		    {
				value    : 0,
				color    : "#FDB45C",
				highlight: "#FFC870",
				label    : "Yellow"
		    }
		],
	options:{
		animation: false
	}
}

var barChartDefault = {
    data:{
	    labels: ["January", "February", "March", "April", "May", "June", "July"],
	    datasets: [
	        {
	            label: "My First dataset",
	            fillColor: "rgba(220,220,220,0.5)",
	            strokeColor: "rgba(220,220,220,0.8)",
	            highlightFill: "rgba(220,220,220,0.75)",
	            highlightStroke: "rgba(220,220,220,1)",
	            data: [65, 59, 80, 81, 56, 55, 40]
	        },
	        {
	            label: "My Second dataset",
	            fillColor: "rgba(151,187,205,0.5)",
	            strokeColor: "rgba(151,187,205,0.8)",
	            highlightFill: "rgba(151,187,205,0.75)",
	            highlightStroke: "rgba(151,187,205,1)",
	            data: [28, 48, 40, 19, 86, 27, 90]
	        }
	    ]},

	options:{

	}

};

