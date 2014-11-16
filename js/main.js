$(document).ready(function(){
	var pieCtx = $("#pieChart").get(0).getContext("2d");
	var pieLoader = new chartLoader(pieCtx);
	pieLoader.loadDefaultSet(pieChartDefault);
	pieLoader.loadValue([1,2,3]);
	pieLoader.draw();


});

function chartStyle(){

	this.setSize = function(width,height){

	};
}

function chartLoader(ctx){
	this.ctx = ctx;
	this.data = null;
	this.option = null;
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
		this.data = pieChartDefault.ds;
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

	this.draw = function(){
		var pieChart = new Chart(this.ctx).Pie(this.data, this.options);
	}
}


var pieChartDefault = {
	ds:
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
	option:{
		animateScale: false
	}
}


