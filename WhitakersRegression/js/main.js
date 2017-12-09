$(document).ready(function () {

    function linearRegression(y, x) {
        var lr = {};
        //var m = x.length;
        //alert("x length: " + m);
        var n = y.length;
        //alert("y length:" + n);
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var sum_yy = 0;

        for (var i = 0; i < y.length; i++) {

            alert("element x: " + i + " = " + x[i]);
            alert("element y: " + i + " = " + y[i]);
            sum_x += x[i];
            sum_y += y[i];
            sum_xy += (x[i] * y[i]);
            sum_xx += (x[i] * x[i]);
            sum_yy += (y[i] * y[i]);
        }

        //a
        lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
        var test = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
        alert("a: " + test);
        alert("slope: " + lr['slope']);
        //b
        lr['intercept'] = (sum_y - lr.slope * sum_x) / n;
        lr['r2'] = Math.pow((n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);



        return lr;
    }

    $('#AddBtn').click(function () {

        $("<input type='text' value='' class='form-control dataX'/>")
            //.attr("id", "myfieldid")
            //.attr("name", "myfieldid")
            .appendTo(".datacoloumX");

        $("<input type='text' value='' class='form-control dataYt'/>")
            //.attr("id", "myfieldid")
            //.attr("name", "myfieldid")
            .appendTo(".datacoloumYt");

        //$("<input type='text' value='' class='form-control dataYm'/>")
        //    //.attr("id", "myfieldid")
        //    //.attr("name", "myfieldid")
        //    .appendTo(".datacoloumYm");



    });


    $('#ExecResolve').click(function () {

        var valuesX = [];
        $('.dataX').each(function () {
            valuesX.push($(this).val());
        });
        
        var valuesYt = [];
        $('.dataYt').each(function () {
            valuesYt.push($(this).val());
        });
        

        var calculatedItems = linearRegression(valuesYt, valuesX);
        
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

        //Insert resolved values:
        //$("<strong>Obtained value's:<br> a: " + calculatedItems['slope'] + " b: " + calculatedItems['intercept'] + "</strong>").appendTo(".resolve-output");



        alert(calculatedItems['slope']);


    });

    //$('#ExecCalcX').click(function () {

    //    var valuesX = [];
    //    $('.dataX').each(function () {
    //        valuesX.push($(this).val());
    //    });

    //    var valuesYt = [];
    //    $('.dataYt').each(function () {
    //        valuesYt.push($(this).val());
    //    });

    //    var calculatedItems = linearRegression(valuesYt, valuesX);


    //    alert(calculatedItems['slope']);


    //});

});

