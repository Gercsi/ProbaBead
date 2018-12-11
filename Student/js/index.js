function home(){
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#addCarsForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $('#index').show();
}

function cars() {
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarsForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $.getJSON('cars', function (data) {
        var table = $('<table id="cars"></table>');
        var title = $("<tr><th colspan='10'>Cars</th></tr>");
        var head = $("<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>");
        var thead = $("<thead></thead>");
        var tbody = $("<tbody></tbody>");
        thead.append(title);
        thead.append(head);
        $.each(data, function (key, value) {
            var line = $('<tr></tr>');
            var nameData = $('<td>' + value.name + '</td>');
            var consumptionData = $('<td>' + value.consumption + '</td>');
            var colorData = $('<td>' + value.color + '</td>');
            var manufacturerData = $('<td>' + value.manufacturer + '</td>');
            var availableData = $('<td>' + value.available + '</td>');
            var yearData = $('<td>' + value.year + '</td>');
            var horsepowerData = $('<td>' + value.horsepower + '</td>');
            line.append(nameData);
            line.append(consumptionData);
            line.append(colorData);
            line.append(manufacturerData);
            line.append(availableData);
            line.append(yearData);
            line.append(horsepowerData);
            tbody.append(line);
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
    $("#addCarsForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $.getJSON('manufacturers', function (data) {
        var table = $('<table id="manufacturersData"></table>');
        var thead = $("<thead></thead>");
        var tbody = $("<tbody></tbody>");
        var title = $("<tr><th colspan='10'>Manufacturers</th></tr>");
        var head = $("<th>Name</th><th>Country</th><th>Founded</th>");
        thead.append(title);
        thead.append(head);
        $.each(data, function (key, value) {
            var line = $('<tr></tr>');
            var nameData = $('<td>' + value.name + '</td>');
            var countryData = $('<td>' + value.country + '</td>');
            var foundedData = $('<td>' + value.founded + '</td>');
            line.append(nameData);
            line.append(countryData);
            line.append(foundedData);
            tbody.append(line);
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
    $("#addCarsForm").on("submit", function (event) { event.preventDefault();

        $.post("/addCar", {"name": $("#carName").val(), "consumption": $("#carConsumption").val(), "color": $("#carColor").val(), "manufacturer": $("#carManufacturer").val(), "year": $("#carYear").val(), "available": $("#carAvailable").val(), "horsepower": $("#carHorsepower").val()
        }, function () {alert("Sikeres a hozzáadás!");
        }).fail(function () {alert("Sikertelen!");
        });
    });

    $.get("/manufacturerNames", function (names) { names.forEach(function (name) {
            $("#carManufacturer").append('<option value="' +  name + '">' + name + '</option>');
        });
    });
    $('#addCarsForm').show();

}

function addManufacturer() {
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarsForm").hide();
    $("#manufacturer").hide();
    $('#addManufacturerForm').on('submit', function (event) {
        event.preventDefault();

        var name = $("#manufacturerName").val();
        var country = $("#manufacturerCountry").val();
        var founded = $("#manufacturerFounded").val();

        $.post("/addManufacturers", {name: name, country: country, founded: founded}
        , function(){alert("Hozzáadás sikeres!");
        }).fail(function() {alert("Hiba!");});
    });
    $("#addManufacturerForm").show();
}

function manufacturer(){
    $("#cars").hide();
    $("#manufacturers").hide();
    $("#index").hide();
    $("#addCarsForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $.getJSON('manufacturers', function (data) {
        var table = $('<table id="manufacturerTable"></table>');
        var thead = $("<thead></thead>");
        var tbody = $("<tbody></tbody>");
        var title = $("<tr><th>Gyártók alapján lista</th></tr>");
        var selectorRow = $("<tr></tr>");
        var submitRow = $("<tr></tr>");
        var selector = $('<select id="selector">Autók listája</select>');
        thead.append(title);
        selectorRow.append(selector);
        tbody.append(selectorRow);

        $.each(data, function (key, value) {
            var manufacture = $('<option>'+ value.name +'</option>');
            selector.append(manufacture);
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
    $("#addCarsForm").hide();
    $("#addManufacturerForm").hide();
    $("#manufacturer").hide();
    $.getJSON('/manufacturer', function (data) {
        var table = $('<table id="byManufacturerTable"></table>');
        var thead = $("<thead></thead>");
        var tbody = $("<tbody></tbody>");
        var title = $("<tr><th colspan='7'>Cars By Manufacturer</th></tr>");
        var head = $("<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>");
        thead.append(title);
        thead.append(head);

        $.each(data, function (key, value) {
            var line = $('<tr></tr>');
            var nameCell = $('<td>' + value.name + '</td>');
            var consumptionCell = $('<td>' + value.consumption + '</td>');
            var colorCell =  $('<td>' + value.color + '</td>');
            var manufacturerCell =  $('<td>' + value.manufacturer + '</td>');
            var availableCell =  $('<td>' + value.available + '</td>');
            var yearCell =  $('<td>' + value.year + '</td>');
            var horsePowerCell =  $('<td>' + value.horsepower + '</td>');

            line.append(nameCell);
            line.append(consumptionCell);
            line.append(colorCell);
            line.append(manufacturerCell);
            line.append(availableCell);
            line.append(yearCell);
            line.append(horsePowerCell);
            tbody.append(line)
        });
        table.append(thead);
        table.append(tbody);
        $('#manufacturer').show().html(table);

    })
}

