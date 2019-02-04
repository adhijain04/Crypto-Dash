export default function (chartData) {
	return {
			title: {
	    text: ''
	  },

	  yAxis: {
	    title: {
	      text: 'Price'
	    }
	  },
	  xAxis: {type: 'time'},
	  legend: {
	    layout: 'vertical',
	    align: 'right',
	    verticalAlign: 'middle'
	  },

	  plotOptions: {
	    series: {
	      label: {
	        connectorAllowed: false
	      },
	      pointStart: 2010
	    }
	  },

	  series: chartData,

	  responsive: {
	    rules: [{
	      condition: {
	        maxWidth: 500
	      },
	      chartOptions: {
	        legend: {
	          layout: 'horizontal',
	          align: 'center',
	          verticalAlign: 'bottom'
	        }
	      }
	    }]
	  }
	}
}