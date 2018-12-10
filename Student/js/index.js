function home(){
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#addCarForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $("#index").show();


}

function cars() {
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $.getJSON('cars', function (data) {
        var table = $('<table id="cars"></table>');
        var title = $("<tr style=font-size: 40px><th colspan='10'>Cars</th></tr>");
        thead.append(title);
        var head = $("<tr style=font-size: 20px><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>");
        thead.append(head);


        $.each(data, function (key, value) {
            var row = $('<tr></tr>');
            var nameCell = $('<td>' + value.name + '</td>');
            var consumptionCell = $('<td>' + value.consumption + '</td>');
            var colorCell = $('<td>' + value.color + '</td>');
            var manufacturerCell = $('<td>' + value.manufacturer + '</td>');
            var availableCell = $('<td>' + value.available + '</td>');
            var yearCell = $('<td>' + value.year + '</td>');
            var horsepowerCell = $('<td>' + value.horsepower + '</td>');
            row.append(nameCell);
            row.append(consumptionCell);
            row.append(colorCell);
            row.append(manufacturerCell);
            row.append(availableCell);
            row.append(yearCell);
            row.append(horsepowerCell);
            tbody.append(row);
        });
        table.append(thead);
        table.append(tbody);
        $("#cars").show().html(table);
    })
}

function manufacturers() {
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $.getJSON('manufacturers', function (data) {
        var table = $('<table id="manufacturersTable" class="animate-left"></table>');
        var thead = $("<thead></thead>");
        var tbody = $("<tbody></tbody>");
        var title = $("<tr class='table_title'><th colspan='3'>Manufacturers</th></tr>");
        var head = $("<tr class='column_names'><th>Name</th><th>Country</th><th>Founded</th></tr>");
        thead.append(title);
        thead.append(head);


        $.each(data, function (key, value) {
            var row = $('<tr></tr>');
            var nameCell = $('<td>' + value.name + '</td>');
            var countryCell = $('<td>' + value.country + '</td>');
            var foundedCell = $('<td>' + value.founded + '</td>');
            row.append(nameCell);
            row.append(countryCell);
            row.append(foundedCell);
            tbody.append(row);
        });
        table.append(thead);
        table.append(tbody);
        $("#manufacturers").show().html(table);
    })
}

function addCar() {
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();

    $('#addCarForm').show();
    $.getJSON('/manufacturerNames', function (data) {

        var selector = $('<select name="manufacturer" required></select>')
        var placeholder = $('<option value="Please select one!">Please select one!</option>');
        selector.append(placeholder);

        $.each(data, function (key, value) {
            var option = $('<option value=' + '"' + value + '">' + value + '</option>');
            selector.append(option);
        });
        $('#manufacturerSelector').html(selector);
        $('#addCar').show();
        document.getElementById("addCarForm").reset();

    })

}

function addManufacturer() {
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarForm").hide();
    $("#manufacturer").hide();
    document.getElementById("addManufacturerForm").reset();
    $('#addManufacturerForm').show();
}

function manufacturer(){
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $.getJSON('manufacturers', function (data) {
        var table = $('<table id="manufacturerTable" class="animate-left"></table>');
        var thead = $("<thead></thead>");
        var tbody = $("<tbody></tbody>");
        var title = $("<tr class='table_title'><th>List Cars By Manufacturers</th></tr>");
        var selectorRow = $("<tr></tr>");
        var submitRow = $("<tr></tr>");
        var selector = $('<select id="selector">List Cars</select>');
        thead.append(title);
        selectorRow.append(selector);
        tbody.append(selectorRow);

        $.each(data, function (key, value) {
            var manufactura = $('<option>'+ value.name +'</option>');
            selector.append(manufactura);
        });
        var submit = $('<input type="button" onclick="loadCarsByManufacturer()" value="Submit"></button>');
        submitRow.append(submit);
        tbody.append(submitRow);
        table.append(thead);
        table.append(tbody);
        $("#manufacturer").show().html(table);
    })

}

function loadCarsByManufacturer() {

    document.cookie='name=' + document.getElementById("selector").value;

    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $.getJSON('/manufacturer', function (data) {
        var table = $('<table id="carsByManufacturerTable" class="animate-left"></table>');
        var thead = $("<thead></thead>");
        var tbody = $("<tbody></tbody>");
        var title = $("<tr class='table_title'><th colspan='7'>Cars By Manufacturer</th></tr>");
        var head = $("<tr class='column_names'><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>");
        thead.append(title);
        thead.append(head);

        $.each(data, function (key, value) {
            var row = $('<tr></tr>');
            var nameCell = $('<td>' + value.name + '</td>');
            var consumptionCell = $('<td>' + value.consumption + '</td>');
            var colorCell =  $('<td>' + value.color + '</td>');
            var manufacturerCell =  $('<td>' + value.manufacturer + '</td>');
            var availableCell =  $('<td>' + value.available + '</td>');
            var yearCell =  $('<td>' + value.year + '</td>');
            var horsePowerCell =  $('<td>' + value.horsepower + '</td>');

            row.append(nameCell);
            row.append(consumptionCell);
            row.append(colorCell);
            row.append(manufacturerCell);
            row.append(availableCell);
            row.append(yearCell);
            row.append(horsePowerCell);
            tbody.append(row)
        });
        table.append(thead);
        table.append(tbody);
        $('#manufacturer').show().html(table);

    })
}

$(function (){
    const form = $('#addCarForm');
    $(form).submit(function (event) {
        event.preventDefault();

        $.ajax({
            type:'post',
            url: 'addCar',
            data: $(form).serialize(),
            success: function () {
                cars();
            },
            error: function () {
                alert("Hiba!");
            }
        })
    })
});

$(function (){
    const form = $('#addManufacturerForm');
    $(form).submit(function (event) {
        event.preventDefault();

        $.ajax({
            type:'post',
            url: 'addManufacturers',
            data: $(form).serialize(),
            success: function () {
                manufacturers();
            },
            error: function () {
                alert("Hiba!");
            }
        })
    })
});