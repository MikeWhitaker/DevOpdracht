$(document).ready(function () {

    var chart = new Chart(document.getElementById("myChart"), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                //data: [1, 2, 3, 4],
                data: [],
                label: "Theoretical Values",
                borderColor: "#3e95cd",
                fill: false
            },
            {
                //data: [1, 2, 3, 4],
                data: [],
                label: "Measured Values",
                borderColor: "#F50057",
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Not yet resolved ...'
            }
        }
    });
   

    function linearRegression(y, x) {
        var lr = {};
        var n = y.length;
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var sum_yy = 0;

        for (var i = 0; i < y.length; i++) {

            sum_x += x[i];
            sum_y += y[i];
            sum_xy += (x[i] * y[i]);
            sum_xx += (x[i] * x[i]);
            sum_yy += (y[i] * y[i]);
        }

        //a
        lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
        var test = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
        //b
        lr['intercept'] = (sum_y - lr.slope * sum_x) / n;
        lr['r2'] = Math.pow((n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);



        return lr;
    }

    $('#AddBtn').click(function () {

        $("<input type='text' value='' class='form-control dataX'/>")
            .appendTo(".datacoloumX");

        $("<input type='text' value='' class='form-control dataYt'/>")
            .appendTo(".datacoloumYt");

    });


    $('#ExecResolve').click(function () {

        var valuesX = [];
        $('.dataX').each(function () {
            valuesX.push($(this).val());
        });
        for (var i = 0; i < valuesX.length; i++) valuesX[i] = +valuesX[i];



        var valuesYt = [];
        $('.dataYt').each(function () {
            valuesYt.push($(this).val());
        });
        for (i = 0; i < valuesYt.length; i++) valuesYt[i] = +valuesYt[i];


        var calculatedItems = linearRegression(valuesYt, valuesX);
        //Write Values to hidden input fields.
        $('#valueA').val(calculatedItems['slope']);
        $('#valueB').val(calculatedItems['intercept']);



        //Disable ExcuteResolve Button
        $('#ExecResolve').removeClass('btn-primary');
        $('#ExecResolve').addClass('btn-default');
        $('#ExecResolve').addClass('disabled');

        //show hidden inputfield
        $('#ShowResolvedItems').show();

        //Enable CalcX Button
        $('#CalcX').addClass('btn-primary');
        $('#CalcX').removeClass('btn-default');
        $('#CalcX').removeClass('disabled');


        //Disable all Theoretical input
        $('.dataX').prop('readonly', true);
        $('.dataYt').prop('readonly', true);

        $('#AddBtn').removeClass('btn-primary');
        $('#AddBtn').addClass('btn-default');
        $('#AddBtn').addClass('disabled');


        //Enable Mesurement Input dataYm
        $('.dataYm').prop('readonly', false);
        $('.dataXCalced').prop('readonly', false);

        //display chart
        //new Chart(document.getElementById("myChart"), {
        //    type: 'line',
        //    data: {
        //        labels: valuesYt,
        //        datasets: [{
        //            data: valuesX,
        //            label: "Theoretical Values",
        //            borderColor: "#3e95cd",
        //            fill: false
        //        }]
        //    },
        //    options: {
        //        title: {
        //            display: true,
        //            text: 'Resolved curve'
        //        }
        //    }
        //});

        //update Chart
        //function addData(chart, label, data) {
        //    chart.data.labels.push(label);
        //    chart.data.datasets.forEach((dataset) => {
        //        dataset.data.push(data);
        //    });
        //    chart.update();
        //}

        chart.data.labels = valuesYt;
        chart.data.datasets[0].data = valuesX;
        chart.options.text = "resolved curve";
        chart.options.title.text = "Calibration curve"

        chart.update();


        });

        $('#CalcX').click(function () {
            //Aquire calculated value's
            var a = $('#valueA').val();
            var b = $('#valueB').val();
            var yM = null;

            yM = $('.dataYm').last().val();


            a = +a;
            b = +b;
            yM = + yM;
            //alert(yM + " " + a + " " + b);


            //The formula:
            //	y = ax + b gives:
            // x = (b -y / a) * -1

            var x = ((b - yM) / a) * -1;
            $('.dataXCalced').last().val(x);

            //Add extra row 
            $("<input type='text' value='' class='form-control dataYm'/>").appendTo(".datacoloumYm");

            $("<input type='text' value='' class='form-control dataXCalced'/>").appendTo(".datacoloumXcalced");


            var valuesCalcedX = [];
            $('.dataXCalced').each(function () {
                valuesCalcedX.push($(this).val());
            });
            for (var i = 0; i < valuesCalcedX.length; i++) valuesCalcedX[i] = +valuesCalcedX[i];

            valuesCalcedX.splice(-1, 1);

            chart.data.datasets[1].data = valuesCalcedX;
            chart.update();

        });

});

